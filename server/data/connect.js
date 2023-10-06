const mongoose = require("mongoose")
const user = require("./user")
//insert pasword after 016:
const url = "mongodb+srv://antonha016:@quizhub.hnifsba.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery",false)

async function connect(){
    await mongoose.connect(url)
    await user.create({
        username: "hello",
        password: "hello",
        email: "email",
        userId: "hello",
    })
    console.log("connected")
    let newuser = await user.find({})
    console.log(newuser)
}

connect()
