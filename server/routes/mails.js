const express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const email='threedvfr@gmail.com'
const pass='22448866m'
//{"email":"","subject":"","text":""}
router.post("/",function(req,res){
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: pass
  }
});
var mailOptions = {
  from: email,
  to: req.body.email,
  subject: req.body.subject,
  text: req.body.text
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
  res.status(500).json({message:error})
  } else {
      res.json({message:info.response})
   
  }
});
})
module.exports= router;