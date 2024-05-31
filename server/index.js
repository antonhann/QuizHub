//npm start in client
//enter mongodb password
//node index.js in server


const express = require("express");
const session = require('express-session');
// const connect = require("./data/connect")
const cors = require("cors")
const user = require("./data/user")
const studySet = require("./data/studyset")
const flashcard = require("./data/flashcard")
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const hashRounds = 10;
const PORT = process.env.PORT || 3003;

//set up server side host
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

//setting up mongoose connection
const mongoose = require("mongoose");
//password here
const url = "mongodb+srv://antonha016:ilovemongodb@quizhub.hnifsba.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery",false)

//connect to mongodb database
async function connect(){
  console.log("connecting")
  try{
    await mongoose.connect(url)
    console.log("connected")
  }
  catch(error){
    console.error("error connecting to the DB: " + error)
  }

}

//registering user call 
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

//handle logout call
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
    newBool,
    id
  } = req.body;
  if(!title || !studySetArray || !req.session.username){
    res.status(400).json({added: false, error: "user error"})
    return
  }
  if(newBool){
    try{
      const ss = await studySet.create({
        username: req.session.username,
        title: title,
        description: description,
        terms: studySetArray
      })
      res.json({ok:true})
    }
    catch(error){
      res.status(400).json({added: false, error: error})
    }
  }else{
    try{
      const ss = await studySet.updateOne({_id: id},{
        title: title,
        description: description,
        terms: studySetArray
      })
      if(!ss.acknowledged){
        //handle error
      }
      res.json({ok:true})
    }catch(error){
      console.error(error)
      res.status(400).json({added: false, error: error})
    }
  }
})

//retrieve current user
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

//get the study set collection of the current user
app.get("/study-set-collection", async(req,res) => {
  let response = await studySet.find({username: req.session.username});
  res.json(response)
})

//handle viewing the study set
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
    const ss = await studySet.deleteOne({ _id: studySetID});
    res.json(ss)
  }catch(error){
    console.error(error)
    res.json({deleted:false})
  }
})

//set the current user's data on the viewed flashcard
app.post("/set-flashcard-data", async(req,res) => {
  const{
    studySetID,
    studySet,
    currentIndex,
    showingTerm,
    shuffled,
    smartSort,
    knowTerms,
    endOfStudySet,
    startsWithTerm,
  } = req.body
  if (!req.session.username){
    //handle when its not logged in
  }
  let response = await flashcard.find({username: req.session.username, studySetID: studySetID});
  try{
    if(response.length == 0){
      //handle when user has not used this flashcard
      let newFlashcardData = await flashcard.create({
        username: req.session.username,
        studySetID:studySetID,
        studySet: studySet,
        currentIndex: currentIndex,
        showingTerm: showingTerm,
        shuffled: shuffled,
        smartSort: smartSort,
        knowTerms: knowTerms,
        endOfStudySet: endOfStudySet,
        startsWithTerm: startsWithTerm,
      })
      //handle error 
      res.json({ok: true})
    }else{
      let updatedFlashcardData = await flashcard.updateOne({username: req.session.username},
        {
          studySetID:studySetID,
          studySet: studySet,
          currentIndex: currentIndex,
          showingTerm: showingTerm,
          shuffled: shuffled,
          smartSort: smartSort,
          knowTerms: knowTerms,
          endOfStudySet: endOfStudySet,
          startsWithTerm: startsWithTerm,
        })
        //handle error
        if(!updatedFlashcardData.acknowledged){
          
        }
        res.json({ok: true})
    }
  }catch(error){
    console.error(error)
    res.json({ok: false})
  }
})
//view flashcard data of the user
app.post("/view-flashcard-data", async(req,res) => {
  const{
    studySetID,
  } = req.body
  const response = await flashcard.find({studySetID: studySetID, username: req.session.username})
  if(response.length === 0){
    res.json({found: false});
    return;
  }
  res.json({data: response, found: true})
})



const updateSessionUser = (user, req) => {
  req.session.username = user.username
  req.session.save(); 
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
connect()