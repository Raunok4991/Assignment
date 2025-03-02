//"use strict";
const nodemailer = require("nodemailer");
module.exports = {
sendMail: (body) =>{
    let transporter = nodemailer.createTransport({
    host: "	smtp.ethereal.email",                     // Testing Ethereal host name
    secureConnection: true,                       
    port: 587,                        
      auth: {
        user: "zachariah.dickinson62@ethereal.email", // Tesing Ethereal email account 
        pass: "sNqZAzRpQA"                            // //Tesing Ethereal email password
      }
    });
    let mailOptions = {
        from: '',
        to: body.toEmail,
        subject: body.subject,
        text: body.text, 
        html: body.html,
        attachments:body.attachments
      };
      return new Promise((resolve,reject)=>{
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              reject(error)
            } else {
              resolve(info)
            }
          });
      })
    
  }
}