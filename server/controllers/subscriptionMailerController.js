require("dotenv").config();
const nodemailer = require("nodemailer");

const { EMAIL, PASSWORD } = process.env;

const sendEmail = (req, res) => {
  //   const { id } = req.params;
  const { emailInput } = req.body;
  const email = emailInput;
  //   const signUpURL = `localhost:3000/#/sign_up/${id}`;

  //
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  });

  let emailText = `Welcome to the newsletter!`;
  //
  let mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Welcome to the newsletter",
    text: emailText
  };
  console.log(mailOptions);
  //
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(409).send("Error Occured");
    } else {
      res.status(200).send("Message Sent!");
    }
  });
};

module.exports = {
  sendEmail
};
