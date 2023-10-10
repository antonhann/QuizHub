const express = require("express");
const session = require('express-session');
// const connect = require("./data/connect")
const cors = require("cors")
const user = require("./data/user")
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const hashRounds = 10;
const PORT = process.env.PORT || 3005;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'thisismysecretkey', // a random string used to sign the session ID cookie
  resave: false,
  saveUninitialized: true,
}));


const mongoose = require("mongoose")
const url = "mongodb+srv://antonha016:@quizhub.hnifsba.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery",false)

async function connect(){
  console.log("connecting")
    await mongoose.connect(url)
    // await user.create({
    //     username: "hello",
    //     password: "hello",
    //     email: "email",
    //     userId: "hello",
    // })
    console.log("connected")
    // let newuser = await user.find({})
    // console.log(newuser)
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
    console.log("error adding user to database")
  }
  return;
})

app.post("/login", async (req,res) =>{
  console.log("started")
  const {username, password} = req.body;
  let selected = await user.findOne({username: username})
  const passwordMatch = await bcrypt.compare(password, selected.password)
  if(passwordMatch){
    updateSessionUser(selected,req)
    res.json({login: true})
  }else[
    res.json({login:false})
  ]
});

app.get("/home", async(req,res) => {
  console.log(req.session.username)
  res.json({username: req.session.username});
})

app.get("/api", (req, res) => {
  res.json({ message: req.session.username});
});

const updateSessionUser = (user, req) => {
  req.session.username = user.username
  req.session.id = user._id
}
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
connect()