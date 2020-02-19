const express=require("express");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/mywebsite",{useNewUrlParser:true});

const homeSchema = {
  mainrole:String,
  mainrolecontent:String,
  todaycontent:String,
  currenttech:String,
};
const Home = mongoose.model("Home",homeSchema);

const homecontent=({
  mainrole:"",
  mainrolecontent:"",
  todaycontent:"",
  currenttech:"",
});
Home.insertMany(homecontent,function(err)
{
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log("success");
  }
})
const projectSchema = {
  title:String,
  about:String,
  sourcecode:String,
};


const Project = mongoose.model("Project",projectSchema);

const certificateSchema = {
  title:String,
  status:String,
  about:String,
  credential:String,
};

const Certificate = mongoose.model("Certificate",certificateSchema);

const SkillSchema = {
  title:String,
  progress:Number,
};

const Skill = mongoose.model("Skill",SkillSchema);

app.get("/",function(req,res){

  Home.find({},function(err,foundItems){
    res.render("home",{
      mainrole:foundItems,
      mainrolecontent:foundItems,
      todaycontent:foundItems,
      currenttech:foundItems,
    });
  });
});
app.get("/projects",function(req,res)
{
  Project.find({},function(err,foundItems){
    res.render("projects",{
      projectcontent:foundItems,
    });
  });
});
app.get("/certificates",function(req,res)
{
  Certificate.find({},function(err,foundItems){
    res.render("certificates",{
      certificatecontent:foundItems,
    });
  });
});
app.get("/about",function(req,res)
{
  res.render("about");
});
app.get("/contactme",function(req,res)
{
  res.render("contactme");
});
app.get("/skills",function(req,res)
{
  Skill.find({},function(err,foundItems){
    res.render("skills",{
      skillcontent:foundItems,
    });
  });
});
app.get("/admin-signin",function(req,res)
{
  res.render("admin-signin");
});
app.post("/admin",function(req,res)
{
  var name=""
  var pass=""
  if(req.body.id===name && req.body.pass===pass)
  {
    res.render("admin");
  }
  else
  {
    res.redirect("/")
  }

});
app.post("/home",function(req,res)
{
  Home.update({_id:"5e4c2fe52c006a59782e1ea8"}, {
    mainrole:req.body.mainrole,
    mainrolecontent:req.body.mainrolecontent,
    todaycontent:req.body.todaycontent,
    currenttech:req.body.currenttech,
  } ,function(err){
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log("success");
    }
  });
  res.redirect("/");
});
app.post("/addproject",function(req,res)
{
  const project=new Project({
    title:req.body.title,
    about:req.body.about,
    sourcecode:req.body.sourcecode,

  })
  project.save();
  res.redirect("/projects");
});
app.post("/deleteproject",function(req,res)
{
  var a = String(req.body.title);
  console.log(a);
  Project.deleteOne({title:a},function(err)
{
  if(err)
  {
    console.log(err);
  }
  else{
    console.log("success");
  }
});
  res.redirect("/projects");
});



app.post("/addcertificate",function(req,res)
{
  const certificate=new Certificate({
    title:req.body.title,
    about:req.body.about,
    credential:req.body.credential,
    status:req.body.status,
  })
  certificate.save();
  res.redirect("/certificates");
});
app.post("/deletecertificate",function(req,res)
{
  var a = String(req.body.title);
  console.log(a);
  Certificate.deleteOne({title:a},function(err)
{
  if(err)
  {
    console.log(err);
  }
  else{
    console.log("success");
  }
});
  res.redirect("/projects");
});

app.post("/addskill",function(req,res)
{
  const skill=new Skill({
    title:req.body.title,
    progress:req.body.progress,
  })
  skill.save();
  res.redirect("/skills");
});
app.post("/deleteskill",function(req,res)
{
  var a = String(req.body.title);
  console.log(a);
  Skill.deleteOne({title:a},function(err)
{
  if(err)
  {
    console.log(err);
  }
  else{
    console.log("success");
  }
});
  res.redirect("/skills");
});

app.listen(3000,function(){
  console.log("Server started at port 3000");
});
