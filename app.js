//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// let posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/BlogDB")
.then(()=>{
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
  console.log("successfully connected to userDB");
 });
// .catch((err)=>{
//   console.log(err);
// })
const postSchema={
  title:String,
  content:String
};

// const userSchema= new mongoose.Schema({
//   title:String,
//   content:String
// });


const Post= mongoose.model("Post",postSchema);

const post1=new Post({
  title:"Introduction",
  content:homeStartingContent
});


app.get("/",function(req,res){
  // res.render("home");
  Post.find({}).then(function (foundItems) {
    // console.log(foundItems);
    if (foundItems.length===0){
      Post.insertMany(post1).then(()=>{
        console.log("success");
        res.redirect('/');
      }).catch(function (err) {
        if(err){console.log(err);}
      });
    }else{
      res.render("home", {Posts: foundItems});
    }
  }).catch((err)=>{
    console.log(err);
});
  // const string=posts.body;
  // const trunktedStr=string.substring(0,100);
  
  // {
  //   content1:homeStartingContent,
  //   posts:posts,
  //   trunketed:trunktedStr
  // }


});

app.get("/contact",function(req,res){
  res.render("contact",{
    content3:contactContent
  });

});

app.get("/about",function(req,res){
  res.render("about",{
    content2:aboutContent
  });

});


app.get("/compose",function(req,res){


  res.render("compose");

});



app.post("/compose",function(req,res){
  const contentTitle = req.body.cTitle;
  const contentBody = req.body.cBody;
  const post =new Post({
    title:contentTitle,
    content:contentBody
  });
 post.save().then((saved)=>{
  if (saved) {
    res.redirect("/");}

 }).catch((err)=>{
  if (err){
    console.log(err);
  }
 });


  // const display={
  //   title:contentTitle,
  //   body:contentBody
  // };
  // posts.push(post);
 
});

app.get("/posts/:day",function(req,res){
  const requestedPostId=req.params.day;
//  const lowerReqTitle= _.lowerCase(requestedTitle);
Post.findOne({_id: requestedPostId})
.then((post)=>{
  res.render("post", {

    title: post.title,

    content: post.content


});
});});

// posts.forEach(function (post){
//   const lowerTitle=_.lowerCase(post.title);
//   if (lowerReqTitle===lowerTitle){
//  res.render("post",{
//   contentArticle:post.title,
//   contentBody:post.body
//  });}});
  // });













 





