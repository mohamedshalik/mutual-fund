var express = require('express');
var router = express.Router();
var email = require("emailjs/email");
var mongoose = require('mongoose');
var multer = require('multer');
var userjs = require('./users')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Shalik:MOH967@sha@ds111622.mlab.com:11622/heroku_jc2322hd');




//send emailjs
router.post('/send', (req, res) => {
    console.log(req.body.email);
    var server = email.server.connect({
        user: "prgsms@gmail.com",
        password: "ShalikShalik",
        host: "smtp.gmail.com",
        ssl: true
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
        text: "Welcome to mutual fund your account created sucessfully ... ",
        from: "prgsms@gmail.com",
        to: "mohamedshalik@gmail.com",
        subject: "Welcome to Mutual Fund"
    }, function (err, message) {
        if (err) {
            console.log(err || message);
        }
        else {
            console.log("sent sucessfully");
        }

    });
});
//send email ends






// Upload Img
// var storage = multer.diskStorage({ //multers disk storage settings
//     destination: function (req, file, cb) {
//         cb(null, './images/');
//     },
//     filename: function (req, file, cb) {
//         var datetimestamp = Date.now();
//         cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        
//     }
// });

// var upload = multer({ //multer settings
//                 storage: storage
//             }).single('file');

// /** API path that will upload the files */
// router.post('/upload', function(req, res) {
//     upload(req,res,function(err){
//         console.log("this is "+ req.files);
//         if(err){
//              res.json({error_code:1,err_desc:err});
//              return;
//         }
//          res.json({error_code:0,err_desc:null});
//     });
// });

// Upload Img ends

module.exports = router;