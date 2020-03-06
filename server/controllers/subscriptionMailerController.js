require("dotenv").config();
const nodemailer = require("nodemailer");

const { EMAIL, PASSWORD } = process.env;

const sendEmail = (req, res) => {
  //   const { id } = req.params;
  const { emailInput } = req.body;
  const email = emailInput;
  //   const signUpURL = `localhost:3000/#/sign_up/${id}`;

  // Step 1
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  });

  let emailText = `Welcome to the newsletter!`;
  // Step 2
  let mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Update Certification",
    text: emailText
  };
  console.log(mailOptions);
  // Step 3
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
