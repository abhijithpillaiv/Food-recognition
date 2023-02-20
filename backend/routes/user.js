var express = require('express');
const recipeHelper = require('../helpers/recipeHelper');
var router = express.Router();
var userHelper = require("../helpers/userHelper")
const nodemailer = require("nodemailer");
const { response } = require('express');
var jwt = require('jsonwebtoken');
var collection = require('../config/collection');
var handlebars = require('handlebars');
const fs = require("fs")

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
      subject: "Verification by Map my Food",
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



    // Login
router.post('/',((req,res)=>{
    userHelper.login(req.body).then((response)=>{
    res.send(response)
      })
  }))

      // forget password
router.post('/forgetPass',(async(req,res)=>{
  var user =await userHelper.checkUser(req.body.email,false)
  console.log(user);
  if(user){
    var token = jwt.sign({
      data: user
    }, 'key', { expiresIn: 60 * 10 });
    var port = collection.port+"forgotPassword/"
    var msg = 'Reset your password'
    sendmail(port,req.body.email,token,msg)
    res.send(true)
 }
  else{
    res.send(false)
  }
}))
router.post('/updatePass',((req,res)=>{
  var decoded = null
   decoded = jwt.decode(req.body.id, {complete: true});
   if (decoded) {
    userHelper.updatePass(decoded.payload.data,req.body.password).then((resp)=>{
      res.send(decoded.payload.data)
    })
  }else{
    res.send(false)
  }
}))



// Signup

router.post('/signup', async (req, res) => {

  if(await userHelper.checkUser(req.body.email,false)){
    res.send(false)
 }
  else{
    var token = jwt.sign({
      data: req.body
    }, 'key', { expiresIn: 60 * 10 });

    var port = collection.port+"signupSucess/"
    var msg = 'Verify Your E-mail Address'
    sendmail(port,req.body.email,token,msg)
    res.send(true)
  }

})
router.get('/addUser/:token',((req,res)=>{
  var decoded = null
   decoded = jwt.decode(req.params.token, {complete: true});
   if (decoded.payload.data) {
    userHelper.signup(decoded.payload.data).then((response)=>{
      console.log('res is '+response);
      res.send(response)
    })
  }else{
    res.send(false)
  }
 
}))

router.get('/signup/:ipId',(async(req,res)=>{
  let check = await userHelper.checkUser(req.params.ipId,true)
  if(check==false){
     console.log('new user');
      userHelper.signup(req.params.ipId).then((response)=>{
      res.send(response)
    })
 }else{
   res.send(check)
 }
}))

// Get all Recipes

router.get('/recipes',((req,res)=>{
  recipeHelper.getRecipes().then((response)=>{
    res.send(response)
  })
}))
// Get single Recipee

router.get('/singleRecipe/:id',((req,res)=>{
  recipeHelper.getSingleRecipes(req.params.id).then((response)=>{
    res.send(response)
  })
}))

// Get About
router.get('/about',((req,res)=>{
  userHelper.getAbout().then((response)=>{
    res.send(response)
  })
}))

// Get  Items
router.get('/items',((req,res)=>{
  userHelper.getItems().then((response)=>{
    res.send(response)
  })
}))

// Set message
router.post('/message',((req,res)=>{
  userHelper.setMessage(req.body).then((response)=>{
    res.send(response)
  })
}))

// Cart
router.get('/cart/:id',((req,res)=>{
  userHelper.getCartProduct(req.params.id).then((resolve)=>{
    res.send(resolve)
  })
}))

router.get('/add-to-cart/:id/:userId',((req,res)=>{
  userHelper.addToCart(req.params.id,req.params.userId).then((resolve)=>{
   res.send(resolve)
  })
}))
router.post('/changePrdtQuantity',(req,res)=>{
  userHelper.PrdtQuantity(req.body).then((response)=>{
    res.send(response)
})
})


router.get('/deletePrdt/:cartid/:prdtid',(req,res)=>{
  userHelper.deletePrdt(req.params.cartid,req.params.prdtid).then((resp)=>{
    res.send(resp)
})
})
module.exports = router;
