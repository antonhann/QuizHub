const mongoose = require("mongoose")
const {Schema} = mongoose

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
})
module.exports = mongoose.model("user", user)
//hashing
// const salt = await bcrypt.genSalt(10);
// const hash = await bcrypt.hash(user.password, salt);