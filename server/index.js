const express = require("express");
const session = require('express-session');
// const connect = require("./data/connect")
const cors = require("cors")
const user = require("./data/user")
const studySet = require("./data/studyset")
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const hashRounds = 10;
const PORT = process.env.PORT || 3003;

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your actual client origin
    credentials: true,
    exposedHeaders: ['set-cookie'], // Allow the 'set-cookie' header to be exposed
  })
);
app.use(bodyParser.json());//to be able to read the request body properly of the api post call
app.use(bodyParser.urlencoded({ extended: true }));
// to keep track of the current user logged in
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      name:"antoncookies",
    },
  })
);


const mongoose = require("mongoose");
const url = "mongodb+srv://antonha016:ilovemongodb@quizhub.hnifsba.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery",false)

async function connect(){
  console.log("connecting")
  await mongoose.connect(url)
  console.log("connected")
}

app.post("/register", async (req,res) =>{
  const {username, password, email} = req.body;
  if (!username || !password || !email) {
    res.status(400).json({ error: 'Invalid form values' });
    return;
  }
  try{
    let hashPassword = await bcrypt.hash(password, hashRounds)
    const newUser = await user.create({
      username: username,
      email: email,
      password: hashPassword
    });
    updateSessionUser(newUser,req)
    // console.log('Cookies in response:', res.get('Set-Cookie'));
    // res.cookie('authToken', selected._id, { httpOnly: true });
    res.json({ added: true, user: newUser });
  }
  catch(error){
    console.error(error)
    res.status(400).json({message: error})
  }
  return;
})
app.post("/login", async (req,res) =>{
  const {username, password} = req.body;
  let selected = await user.findOne({username: username})
  if(!selected){
    res.status(400).json({login:false, error: "user does not exists"})
    return
  }
  const passwordMatch = await bcrypt.compare(password, selected.password)
  if(passwordMatch){
    await updateSessionUser(selected,req)
    // res.cookie('authToken', 'your-token-value', { httpOnly: true, path: '/', domain: 'localhost' });
    // console.log('Cookies in response:', res.get('Set-Cookie'));
    res.json({login: true})
  }else{
    res.status(400).json({login:false, error: "password does not match"})
  }
});
app.post("/logout", async (req,res) => {
  const id = req.session.id
  if(id){
    req.session.destroy((err) => {
      if(err){
        console.error("error destroying current session", err)
        res.status(500).json({deleted: false}) //internal server error
      }
      else{
        // res.clearCookie("antoncookies")
        // delete res.session.username
        // delete res.session.id
        res.json({deleted: true})
      }
    })
  }
  else{
    res.status(400).json({deleted: false}) //bad request
  }
})
app.post("/create-study-set", async(req,res)=>{
  const{
    title,
    description,
    studySetArray,
  } = req.body;
  if(!title || !studySetArray || !req.session.username){
    res.status(400).json({added: false, error: "user error"})
    return
  }
  try{
    const ss = await studySet.create({
      username: req.session.username,
      title: title,
      description: description,
      terms: studySetArray
    })
    res.json({added:true})
  }
  catch(error){
    res.status(400).json({added: false, error: error})
  }
})

app.get("/currentUser", async(req,res) => {
  if(req.session.username){
    res.json({
      user: true,
      username: req.session.username,
      id: req.session.id,
    });
  }else{
    res.json({
      user: false,
    })
  }
})

app.get("/study-set-collection", async(req,res) => {
  let response = await studySet.find({username: req.session.username});
  res.json(response)
})

app.post("/view-study-set", async(req,res) => {
  const {
    studySetID,
  } = req.body
  let response = await studySet.find({_id: studySetID});
  res.json(response)
})
app.post("/delete-study-set", async(req,res) => {
  const {
    studySetID,
  } = req.body
  try{
    // console.log(studySet.find({username: req.session.username}))
    const ss = await studySet.deleteOne({ _id: studySetID});
    // console.log(studySet.find({username: req.session.username}))
    res.json(ss)
  }catch(error){
    console.error(error)
    res.json({deleted:false})
  }
})



const updateSessionUser = (user, req) => {
  req.session.username = user.username
  req.session.save(); 
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
connect()