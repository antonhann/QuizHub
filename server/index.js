const express = require("express");
const session = require('express-session');
// const connect = require("./data/connect")
const cors = require("cors")
const user = require("./data/user")
const bcrypt = require('bcrypt');
const hashRounds = 10;
const PORT = process.env.PORT || 3004;

const app = express();
app.use(cors());
app.use(session({
  secret: 'thisismysecretkey', // a random string used to sign the session ID cookie
  resave: false,
  saveUninitialized: true,
}));


const mongoose = require("mongoose")
// const user = require("./user")
//insert pasword after 016:
const url = "mongodb+srv://antonha016:ilovemongodb@quizhub.hnifsba.mongodb.net/?retryWrites=true&w=majority";
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
    // console.log("connected")
    // let newuser = await user.find({})
    // console.log(newuser)
}

app.post("/register", (req,res) =>{
  const {username, password, email} = req;
  let hashPassword;
  bcrypt.hash(password, hashRounds, (err, hash) =>{
    if(err){
      //handle error here
    }else{
      hashPassword = hash;
    }
  })
  user.create({
    username: username,
    email: email,
    password: hashPassword
  })
})

app.post("/login", async (req,res) =>{
  const {username, password} = req;
  await connect();
  let selected = user.find({username: username})
  bcrypt.compare(password, selected.password, (err, result) => {
    if (err) {
      console.error('Error comparing passwords:', err);
    } 
    else {
      if (result) {
        req.session.selected = {
          username: selected.username
        }
      return res.json({message: "User successfully logged in"})
      }
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

app.get("/home", async(req,res) => {
  await connect()
  let selected = await user.find({username: "s"})
  res.json({user: selected})
  
})

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});