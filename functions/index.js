const functions = require("firebase-functions");
const { Firestore } = require("@google-cloud/firestore");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
const sharp = require("sharp");

// env variables
var serviceAccount = require("./firebase-admin-config.json");

const path = require("path");
const os = require("os");
const fs = require("fs");

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = firebase.firestore();

//config for gmail auth
const CONFIG = require("./config.json");

//config for nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: CONFIG["user"],
    pass: CONFIG["pass"],
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  var body = req.body;
  var email_from = req.body.email;
  var subject = req.body.subject;
  var message = req.body.message;

  cors(req, res, () => {
    // getting dest email by query string
    console.log(body);

    const mailOptions = {
      from: email_from, // Something like: Jane Doe <janedoe@gmail.com>
      to: "shubha@itsshubhaofficial.com",
      replyTo: email_from,
      subject: subject, // email subject,
      html: `<p>${req.body.firstname} ${req.body.lastname} sent a message!</p><br/><p>${message}</p>`,
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      res.set("Access-Control-Allow-Origin", "*");
      if (erro) {
        return res.send(erro);
      }
      console.log("Email sent");
      return res.send("Email sent");
    });
  });
});

exports.imageUploadTrigger = functions.storage
  .bucket("itsshubhaofficial.appspot.com")
  .object()
  .onFinalize(async (object) => {
    console.log(
      "NEW FILE UPLOADED!=================================================\nTRIGGER IMAGE UPLOAD FUNCTION!!!================================================="
    );

    const uploadedFileBucket = object.bucket;
    const uploadedFilePath = object.name;
    const uploadedFileContentType = object.contentType;

    console.log("UPLOADED FILE BUCKET: " + uploadedFileBucket);
    console.log("UPLOADED FILE PATH: " + uploadedFilePath);
    console.log("UPLOADED FILE CONTENT TYPE: " + uploadedFileContentType);

    const splitFilePath = uploadedFilePath.split("/");

    if (splitFilePath.length == 0) {
      functions.logger.log("File is not in a folder.");
      return;
    }

    const folderName = splitFilePath[0];

    // Exit if this is triggered on a file that is not an image.
    if (!uploadedFileContentType.startsWith("image/")) {
      functions.logger.log("This is not an image.");
      return;
    }

    const fileName = path.basename(uploadedFilePath);
    console.log("FILENAME: " + fileName);
    // Exit if the image is already a thumbnail.
    if (fileName.startsWith("thumb_")) {
      return functions.logger.log("Already a Thumbnail.");
    }

    const outputFileName = "out_" + fileName;
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const tempOutputFilePath = path.join(os.tmpdir(), outputFileName);

    console.log("outputFileName: ", outputFileName);
    console.log("tempFilePath: ", tempFilePath);
    console.log("tempOutputFilePath: ", tempOutputFilePath);

    // Download 2 files | One as "input" and another as "output"
    const bucket = admin.storage().bucket(uploadedFileBucket);
    await bucket.file(uploadedFilePath).download({ destination: tempFilePath });
    await bucket
      .file(uploadedFilePath)
      .download({ destination: tempOutputFilePath });
    functions.logger.log("Image downloaded locally to", tempFilePath);
    functions.logger.log("Image downloaded locally to", tempOutputFilePath);

    // "input" file gets compressed and saved as "output"
    await sharp(tempFilePath)
      .resize({ width: 1080 })
      .toFile(tempOutputFilePath)
      .then((newFileInfo) => {
        console.log("Success");
        console.log(newFileInfo);
        fs.unlink(tempFilePath, (err) => {
          if (err) throw err;
          console.log("FILE DELETED -1- " + tempFilePath);
        });
      })
      .catch((err) => {
        console.log("Error occured");
        console.log(err);
      });

    const thumbFileName = `thumb_${fileName}`;
    const thumbFilePath = `${folderName}/${thumbFileName}`;

    // Uploading the thumbnail.
    const uploadBucket = admin.storage().bucket("itsshubhaofficial-compressed");
    await uploadBucket.upload(tempOutputFilePath, {
      metadata: {
        contentType: uploadedFileContentType,
      },
      destination: thumbFilePath,
      resumable: false,
      validation: false,
    });

    console.log("THUMBNAIL UPLOADEDD!!!!");

    // Get the thumbnail's public path

    let compressedFileUrl = "";
    let uncompressedFileUrl = "";

    await uploadBucket
      .file(thumbFilePath)
      .getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      })
      .then((signedUrls) => {
        // signedUrls[0] contains the file's public URL
        compressedFileUrl = signedUrls[0];
      });

    await bucket
      .file(uploadedFilePath)
      .getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      })
      .then((signedUrls) => {
        // signedUrls[0] contains the file's public URL
        uncompressedFileUrl = signedUrls[0];
      });

    console.log(`Compressed path: ${compressedFileUrl}`);
    console.log(`Unnompressed path: ${uncompressedFileUrl}`);

    // saving to Firestore DB
    const db = getFirestore();
    const data = {
      compressedLink: compressedFileUrl,
      unCompressedLink: uncompressedFileUrl,
    };

    await db
      .collection(folderName)
      .doc(fileName)
      .set(data)
      .then(() => console.log("Successfully added"))
      .catch((err) => console.log(err));

    return fs.unlink(tempOutputFilePath, (err) => {
      if (err) throw err;
      console.log("FILE DELETED -2- " + tempOutputFilePath);
    });
  });

//TODO: check if the deleted file is in a subfolder
// deletes thumbnail image from storage when image is deleted
exports.imageDeleteTrigger = functions.storage
  .bucket("itsshubhaofficial.appspot.com")
  .object()
  .onDelete(async (object) => {
    console.log(
      "FILE DELETEDD!=================================================\nTRIGGER IMAGE DELETE FUNCTION!!!================================================="
    );

    const deletedFileBucket = object.bucket;
    const deletedFilePath = object.name;
    const deletedFileContentType = object.contentType;

    console.log("FILE BUCKET: " + deletedFileBucket);
    console.log("FILE PATH: " + deletedFilePath);
    console.log("CONTENT TYPE: " + deletedFileContentType);

    const splitFilePath = deletedFilePath.split("/");

    const folderName = splitFilePath[0];
    const deletedFileName = splitFilePath[1];

    const deleteFromBucket = admin
      .storage()
      .bucket("itsshubhaofficial-compressed");

    // Exit if the image is already a thumbnail.
    if (deletedFileName.startsWith("thumb_")) {
      return functions.logger.log("Already deleted.");
    }

    const toDeleteFilePath = `${folderName}/thumb_${deletedFileName}`;
    const toDeleteFileName = path.basename(toDeleteFilePath);

    console.log("DELETE: " + toDeleteFileName);

    const toDeleteFile = deleteFromBucket.file(toDeleteFilePath);

    await toDeleteFile
      .delete()
      .then(() => {
        console.log("Successfully deleted: " + toDeleteFile);
      })
      .catch((err) => {
        console.log("Error");
        throw err;
      });

    // TODO: delete from firestore
    const db = getFirestore();
    await db
      .collection(folderName)
      .doc(deletedFileName)
      .delete()
      .then(() => console.log("Successfully deleted"))
      .catch((err) => console.log(err));

    return;
  });

exports.returnDocs = functions.https.onRequest(async (req, res) => {
  console.log(req.query);
  let allImages = [];
  cors(req, res, async () => {
    const collectionRef = firestore.collection(req.query.folderName);
    const snapshot = await collectionRef.get().catch((err) => console.log(err));
    snapshot.docs.map((doc) => allImages.push(doc.data()));
    console.log("allImages :>> ", allImages);

    res.send(allImages);
  });
});
