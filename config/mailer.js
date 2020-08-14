const nodemailer = require("nodemailer");

let transporter=nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.userName,
        pass:process.env.password
    }

});

exports.transporter=transporter;