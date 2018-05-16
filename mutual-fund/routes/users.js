var express = require('express');
var router = express.Router();
var email = require("emailjs/email");
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Mutual');
var multer = require('multer');

var categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  logoPath: String
});

var UserdetailSchema = new mongoose.Schema({
  name: String,
  DOB: String,
  emailID: String,
  password: String,
  gender: String,
  mobileNumber: String,
  Bank_name: String,
  ACC_Number: String,
  IFSC: String,
  ACC_type: String

});

var BasketSchema = new mongoose.Schema({
  Scheme_unit: String,
  Scheme_number: String,
  User_email: String,
  Scheme_name: String,
  amc: String

});
var Purchase = new mongoose.Schema({
  Scheme_unit: String,
  Scheme_number: String,
  User_email: String,
  Scheme_name: String,
  CDate: Date
});

var Category = mongoose.model('Category', categorySchema);
var Userdetail = mongoose.model('userdata', UserdetailSchema);
var Basket = mongoose.model('basket', BasketSchema);
var Purchase = mongoose.model('purchase', Purchase);


router.get('/auth/:email', function (req, res) {
  console.log('getting all Category... ');
  Userdetail.findOne({ emailID: req.params.email }, function (err, userdetails) {
    if (err)
      res.send(err);
    else {
      console.log("No data" + userdetails);
      res.json(userdetails);
    }
  });
});

router.get('/viewProfile/:id', function (req, res) {
  console.log('getting all Category... ');
  Userdetail.findOne({ _id: req.params.id }, function (err, userdetails) {
    if (err)
      res.send(err);
    else {
      console.log("No data" + userdetails);
      res.json(userdetails);
    }
  });
});

router.get('/viewbasket/:_useremail', function (req, res) {
  console.log(' gettting viewbaskedbyscheme by _userid... test :');
  Basket.find({ User_email: req.params._useremail }, function (err, basket) {
    if (err)
      res.send(err);
    else {
      console.log(basket);
      res.json(basket);
    }
  });

});

router.get('/viewCategory', function (req, res) {
  //  console.log('getting all Category... ');
  Category.find({}, function (err, Categorys) {
    if (err)
      res.send(err);
    else {
      //  console.log("No data"+users);
      res.json(Categorys);
    }
  });
});

router.get('/updateCategory/:_id', function (req, res) {
  console.log(' gettting Category by _id... test :');
  Category.findOne({ _id: req.params._id }, function (err, category) {
    if (err)
      res.send(err);
    else {
      //console.log(user);
      res.json(category);
    }
  });

});


router.post('/createuser', function (req, res) {
  var userdetail = new Userdetail();

  userdetail.name = req.body.name;
  userdetail.DOB = req.body.DOB;
  userdetail.emailID = req.body.email;
  userdetail.password = req.body.pwd;
  userdetail.gender = req.body.gender;


  console.log(userdetail);
  userdetail.save(function (err, userdetail) {
    if (err)
      res.send(err);
    else {
      //   console.log(category);
      res.json(userdetail);
    }
  });

});

router.post('/createBasket', function (req, res) {
  var basket = new Basket();


  basket.Scheme_unit = req.body.Scheme_unit;
  basket.Scheme_number = req.body.Scheme_number;
  basket.User_email = req.body.User_email;
  basket.Scheme_name = req.body.Scheme_name;
  basket.amc = req.body.AMC;

  // console.log(category);
  basket.save(function (err, basket) {
    if (err)
      res.send(err);
    else {
      //   console.log(category);
      res.json(basket);
    }
  });

});

router.post('/updatebaseinfo/:_id', function (req, res) {

  var updatedaprofile = {};

  updatedaprofile.name = req.body.name;
  updatedaprofile.DOB = req.body.DOB;
  updatedaprofile.emailID = req.body.emailID;
  updatedaprofile.password = req.body.password;
  updatedaprofile.gender = req.body.gender;
  updatedaprofile.mobileNumber = req.body.mobileNumber;

  console.log('updating Profile by _id... ');
  Userdetail.findOneAndUpdate({ _id: req.params._id },
    { $set: updatedaprofile },
    { new: true },
    function (err, profile) {
      if (err)
        res.send(err);
      else {
        console.log("Updated sucessfully");
      }
    });
});

router.post('/updateaccinfo/:_id', function (req, res) {

  var updatedaprofile = {};

  updatedaprofile.Bank_name = req.body.Bank_name;
  updatedaprofile.ACC_Number = req.body.ACC_Number;
  updatedaprofile.IFSC = req.body.IFSC;
  updatedaprofile.ACC_type = req.body.ACC_type;


  console.log('updating Profile by _id... ');
  Userdetail.findOneAndUpdate({ _id: req.params._id },
    { $set: updatedaprofile },
    { new: true },
    function (err, profile) {
      if (err)
        res.send(err);
      else {
        console.log("Updated sucessfully");
      }
    });
});

router.post('/updatebasket/:Scheme_number/:User_email', function (req, res) {
  console.log(' updateing basket');
  var updatebasket = {};

  updatebasket.Scheme_unit = req.body.Scheme_unit;

  Basket.findOneAndUpdate({ Scheme_number: req.params.Scheme_number, User_email: req.params.User_email },
    { $set: updatebasket },
    { new: true }, function (err, basket) {
      if (err)
        res.send(err);
      else {
        console.log("Updated sucessfully");
      }
    });

});


router.get('/deletebasket/:Scheme_number/:User_email', function (req, res) {

  console.log('deleting from basket by _id... ');
  Basket.findOneAndRemove({ Scheme_number: req.params.Scheme_number, User_email: req.params.User_email }, function (err, basket) {
    if (err)
      res.send(err);
    else {
      console.log("Deleted Sucessfully");

    }
  });
});


router.post('/createCategory', function (req, res) {
  var category = new Category();

  category.name = req.body.Category_name;
  category.description = req.body.Category_description;

  // console.log(category);
  category.save(function (err, category) {
    if (err)
      res.send(err);
    else {
      //   console.log(category);
      res.json(category);
    }
  });

});

router.post('/updateCategory/:_id', function (req, res) {

  var updatedcategory = {};
  updatedcategory.name = req.body.Category_name;
  updatedcategory.description = req.body.Category_description;
  console.log('updating user by _id... ');
  Category.findOneAndUpdate({ _id: req.params._id },
    { $set: updatedcategory },
    { new: true },
    function (err, category) {
      if (err)
        res.send(err);
      else {
        console.log("Updated sucessfully");

      }
    });
});

router.get('/deleteCategory/:id', function (req, res) {

  console.log('deleting Category by _id... ');
  Category.findOneAndRemove({ _id: req.params.id }, function (err, category) {
    if (err)
      res.send(err);
    else {
      // console.log(user);
      res.json(category);
    }
  });
});

router.post('/profile', function (req, res) {
  upload(req, res, function (err) {
    console.log(req.file);
    if (err) {
      // An error occurred when uploading
    }
    res.json({
      success: true,
      message: 'Image uploaded!'
    });

    // Everything went fine
  })
});

router.post('/createCategory', function (req, res) {
  var category = new Category();

  category.name = req.body.Category_name;
  category.description = req.body.Category_description;
  category.logoPath = this.storage.filename;
  console.log(this.storage.filename);
  category.save(function (err, category) {
    if (err)
      res.send(err);
    else {
      //   console.log(category);
      res.json(category);

    }
  });

});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '.jpg')
  }
});

var upload = multer({ storage: storage }).single('file');






module.exports = router;