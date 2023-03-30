const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Firestore } = require("@google-cloud/firestore");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
const sharp = require("sharp");

const path = require("path");
const os = require("os");
const fs = require("fs");

var serviceAccount = require("./itsshubhaofficial-firebase-adminsdk-80i2r-a7f2a1c2dd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
        // console.log("ERROR");
        // console.log(erro.toString());
        // return res.send(erro.toString());
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

    // Exit if this is triggered on a file that is not an image.
    if (!uploadedFileContentType.startsWith("image/")) {
      functions.logger.log("This is not an image.");
      return;
    }

    const fileName = path.basename(uploadedFilePath);
    // Exit if the image is already a thumbnail.
    if (fileName.startsWith("thumb_")) {
      return functions.logger.log("Already a Thumbnail.");
    }

    // create a db collection and document
    const db = getFirestore();
    let docRef = db.collection("people").doc("graduation"); // -- used later in the function

    if (fileName.startsWith("grad_")) {
      docRef = db.collection("people").doc("graduation");
    } else if (fileName.startsWith("coup_)")) {
      docRef = db.collection("people").doc("couples");
    } else if (fileName.startsWith("cel_)")) {
      docRef = db.collection("products").doc("celcius");
    } else if (fileName.startsWith("dod_)")) {
      docRef = db.collection("products").doc("dodgeChallenger");
    }

    const outputFileName = path.basename("out_" + uploadedFilePath);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const tempOutputFilePath = path.join(os.tmpdir(), outputFileName);

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
    const thumbFilePath = path.join(
      path.dirname(uploadedFilePath),
      thumbFileName
    );

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

    // Get the thumbnail's public path and add it to db
    const compressedFileUrl = uploadBucket.file(thumbFilePath).publicUrl();
    const uncompressedFileUrl = bucket.file(uploadedFilePath).publicUrl();
    console.log(`Compressed path: ${compressedFileUrl}`);
    console.log(`Ujnompressed path: ${uncompressedFileUrl}`);

    // add path of compressed images to firestore
    await docRef.update({
      compressed: FieldValue.arrayUnion(compressedFileUrl),
    });

    // also add path of full images to firestore
    await docRef.update({
      uncompressed: FieldValue.arrayUnion(uncompressedFileUrl),
    });

    return fs.unlink(tempOutputFilePath, (err) => {
      if (err) throw err;
      console.log("FILE DELETED -2- " + tempOutputFilePath);
    });
  });

//TODO: when file gets deleted, delete element from firestore as well

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

    const deleteFromBucket = admin
      .storage()
      .bucket("itsshubhaofficial-compressed");

    const deletedFileName = path.basename(deletedFilePath);
    // Exit if the image is already a thumbnail.
    if (deletedFileName.startsWith("thumb_")) {
      return functions.logger.log("Already deleted.");
    }

    const toDeleteFilePath = "thumb_" + deletedFilePath;
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

    // TODO: also delete from firestore

    return;
  });

exports.returnDocs = functions.https.onRequest(async (req, res) => {
  console.log(req.query);
  let allImages = {
    compressed: [],
    uncompressed: [],
  };

  const firestore = new Firestore();

  cors(req, res, async () => {
    const document = firestore.doc(
      `${req.query.collection}/${req.query.document}`
    );
    const doc = await document.get();
    if (!doc.exists) {
      res.send("No such document!");
    } else {
      allImages.compressed = doc.data()["compressed"];
      allImages.uncompressed = doc.data()["uncompressed"];
      console.log("All Data:", allImages);
      res.send(allImages);
    }
  });
});
