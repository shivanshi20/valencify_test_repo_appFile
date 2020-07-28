const express = require("express");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer")
const gridFsStorage = require("multer-gridfs-storage");
const grid = require("gridfs-stream");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
//adding parentheses on date() so that the function of getDate is logged into the console.log
// console.log(date());

const app = express();
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));



var conn = mongoose.connect("mongodb://localhost:27017/ValencifyDB",{useNewUrlParser: true, useUnifiedTopology: true} );
// mongoose.set("useCreateIndex",true);
const userSchema ={
  email:String,
  password:String,

};

//Init gfs

// let gfs;
//
// conn.on('open',function(){
//   gfs = Grid(conn.db,mongoose.mongo);
//   gfs.collection('userFormSchema');
// })

//Create storage engine

// const storage = new GridFsStorage({
//   url: 'mongodb://localhost:27017/ValencifyDB',
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });
//
// const userFormSchema ={
//   title: String ,
//   body: String  ,
//   link: String  ,
//   contact: Integer ,
//   year: String   ,
//   branch:String  ,
//   date: Date ,
//   time: Date ,
//   duration: String
//
//
// }

const Valencify = new mongoose.model("Valencify",userSchema);

const valencifyuser = new Valencify({
  email:"Hello",
  password:"qwerty"
});

// valencifyuser.save();


app.get("/", function(req, res) {


  res.render("index");

});

app.get("/index", function(req, res) {


  res.render("index");

});

app.get("/contact", function(req, res) {


  res.render("contact");

});

app.get("/business", function(req, res) {


  res.render("business");

});
app.get("/Register", function(req, res) {


  res.render("Register");

});
app.get("/Marketing", function(req, res) {


  res.render("Marketing");

});

app.get("/marketing_next", function(req, res) {


  res.render("marketing_next");

});

app.get("/marketing_form", function(req, res) {


  res.render("marketing_form");

});

app.post("/Register",function(req,res){
  const client = new Valencify({
    email: req.body.username ,
    password: req.body.password
  });
  client.save(function(err){
    if(err){
      console.log("error is there");
    }else{
      res.render("secret");
    }
  });
});

app.post("/business",function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  Valencify.findOne({email: username},function(err,foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        if(foundUser.password === password){
          res.render("secret");
        }
      }
    }
  });
});

// app.post("/marketing_form",upload.single('image'),(req,res) =>{
//   console.log({image: req.image});
// });

app.listen(process.env.PORT||3000, function() {

  console.log("Server is running on 3000");
});
