const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();

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
