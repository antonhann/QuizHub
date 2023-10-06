const mongoose = require("mongoose")
const {Schema} = mongoose

const user = new Schema({
    username: {
        type: String,
        required: True,
        unique: True,
    },
    password: {
        type: String,
        required: True,
        unique: True,
    },
    email: {
        type: String,
        required: True,
        unique: True,
    },
})
module.exports = mongoose.model("user", user)
//hashing
// const salt = await bcrypt.genSalt(10);
// const hash = await bcrypt.hash(user.password, salt);