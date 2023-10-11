const express = require("express");
const session = require('express-session');
// const connect = require("./data/connect")
const cors = require("cors")
const user = require("./data/user")
const studySet = require("./data/studyset")
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const hashRounds = 10;
const PORT = process.env.PORT || 3005;

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your actual client origin
    credentials: true,
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
    },
  })
);


const mongoose = require("mongoose")
const url = "mongodb+srv://antonha016:@quizhub.hnifsba.mongodb.net/?retryWrites=true&w=majority";
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
    res.json({ added: true, user: newUser });
  }
  catch(error){
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
    res.json({login: true})
    console.log(req.session.username)
  }else{
    res.status(400).json({login:false, error: "password does not match"})
  }
});
app.post("/study-set", async(req,res)=>{
  const{
    title,
    description,
    studySetArray,
  } = req.body;

  if(!title || !studySetArray){
    res.status(400).json({added: false, error: "user input error"})
    return
  }
  try{
    const newStudySet = await studySet.create({
      userId: req.session._id,
      title: title,
      description: description,
      studySetArray: studySetArray
    })
    res.json({added:true})
  }
  catch(error){
    res.status(400).json({added: false, error: error})
  }
})

app.get("/home", async(req,res) => {
  res.json({username: req.session.username});
})
const updateSessionUser = (user, req) => {
  req.session.username = user.username
  req.session.id = user._id
  req.session.save(); 
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
connect()