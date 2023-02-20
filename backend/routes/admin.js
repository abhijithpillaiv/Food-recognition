var express = require('express');
const fs = require("fs")
const multer = require("multer");
var router = express.Router();
var recipeHelper = require('../helpers/recipeHelper')
var adminHelper = require('../helpers/adminHelper')
var collection = require("../config/collection");
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
var handlebars = require('handlebars');

// Send Mail
var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};

async function sendmail(port,mailId,token,msg){
  console.log("Sending mail.");
  var transporter = nodemailer.createTransport({
   // service:'gmail',
   host: 'smtp.gmail.com',
   port:465,
    auth: {
      user: 'f4foodapp@gmail.com',
      pass: 'wfjajkupaegftxhv'
    }
  });

  readHTMLFile(__dirname + '/mailTemplate/index.hbs', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
         message:msg,
         port:port+token
    };
    var htmlToSend = template(replacements);
    var mailOptions = {
      from: 'noreply',
      to: mailId,
      subject: "Verification by ABC Choice",
        html : htmlToSend
     };
     transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
});
};


      // forget password
router.post('/forgetPass',(async(req,res)=>{
  
  if(req.body.email==collection.adminEmail){
    var user =await adminHelper.getAdmin(req.body.email)
    var token = jwt.sign({
      data: user
    }, 'key', { expiresIn: 60 * 10 });
    var port = collection.portAdmin+"/forgotPassword/"
    var msg = 'Reset your password'
    sendmail(port,req.body.email,token,msg)
    res.json(true)
 }
  else{
    res.json(false)
  }
}))
// Update password
router.post('/updatePass',((req,res)=>{
  console.log('inside updatePass');
  var decoded = null
   decoded = jwt.decode(req.body.id, {complete: true});
   console.log(decoded);
   if (decoded) {
    adminHelper.updatePass(decoded.payload.data,req.body.password).then((resp)=>{
      res.json(decoded.payload.data)
    })
  }else{
    res.json(false)
  }
}))

// Login
router.post('/', function (req, res) {
  adminHelper.login(req.body).then((status) => {
    if (status == true) {
      res.json(true)
    }
    else {
      res.json(false)
    }
  })
});


// Multer
const storage = multer.diskStorage({
  destination: ((req, file, cb) => {
    cb(null, './public/image/');
  }),
  filename: ((req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  })

})
const upload = multer({ storage: storage })

// Add Recipies
router.post('/addRecipes', upload.single('image'), function (req, res) {
  if (req.file != undefined) {
    const arrayOfStrings = req.file.path.split('/')
    req.body.image = arrayOfStrings[2]
  }
  recipeHelper.addRecipes(req.body).then((response) => {
    res.json(response._id)
  })
});

// edit Recipies
router.post('/editRecipe', upload.single('image'), function (req, res) {
  if (req.body.imgChange && req.file != undefined) {
    const arrayOfStrings = req.file.path.split('/')
    req.body.image = arrayOfStrings[2]
  }
  recipeHelper.editRecipe(req.body).then((response) => {
    res.json(response._id)
  })
});
// Delete Recipe
router.get('/deleteRecipe/:id', function (req, res) {
  try {
    recipeHelper.deleteRecipe(req.params.id).then((response) => {
      res.json(response)
    })
  } catch (error) {
    res.json(error)
  }
});


// Add About
router.post('/addAbout', function (req, res) {
  adminHelper.addAbout(req.body).then((response) => {
    res.json(response)
  })
});


// Add Items
router.post('/addItem', upload.single('image'), function (req, res) {
  try {
    if (req.file != undefined) {
      const arrayOfStrings = req.file.path.split('/')
      req.body.image = arrayOfStrings[2]
    }
    adminHelper.addItem(req.body).then((response) => {
      res.json(response)
    })
  } catch (error) {
    res.json(error)
  }
});
// Edit Items
router.post('/editItem', upload.single('image'), function (req, res) {
  try {
    if (req.body.imgChange && req.file != undefined) {
      const arrayOfStrings = req.file.path.split('/')
      req.body.image = arrayOfStrings[2]
    }
    adminHelper.EditItem(req.body).then((response) => {
      res.json(response)
    })
  } catch (error) {
    res.json(error)
  }
});
// Delete Items
router.get('/deleteItem/:id', function (req, res) {
  try {
    adminHelper.deleteItem(req.params.id).then((response) => {
      res.json(response)
    })
  } catch (error) {
    res.json(error)
  }
});

// set purchase history
router.post('/itemHistory', function (req, res) {
  adminHelper.itemHistory(req.body).then((response) => {
    res.json(response);
  })
});

// Get message
router.get('/getMessage', function (req, res) {
  adminHelper.getMessage().then((response) => {
    res.json(response);
  })
});
// Delete Message
router.get('/dltMsg/:id', function (req, res) {
  adminHelper.dltMsg(req.params.id).then((response) => {
    res.json(response);
  })
});

// Get User
router.get('/getUser', function (req, res) {
  adminHelper.getUser().then((response) => {
    res.json(response);
  })
});

// Get one User
router.get('/getOneUser/:id', function (req, res) {
  adminHelper.getOneUser(req.params.id).then((response) => {
    res.json(response);
  })
});
// Delete user
router.get('/deleteUser/:id', function (req, res) {
  adminHelper.deleteUser(req.params.id).then((response) => {
    res.json(response);
  })
});

// Get orders
router.get('/getOrdrs', function (req, res) {
  adminHelper.getOrders().then((response) => {
    res.json(response);
  })
});


// Dashboard
router.get('/dashboard', function (req, res) {
  adminHelper.dashboard().then((resp)=>{
    res.json(resp);
  })
});

// Purchase details

router.get('/getpurchase', function (req, res) {
  adminHelper.getpurchase().then((response) => {
    res.json(response);
  })
});


module.exports = router;
