const mongoose = require("mongoose")
const {Schema} = mongoose

const studySet = new Schema({
    username: String,
    id: String,
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now, // You can set a default value (e.g., current timestamp)
    },
    terms: Array
})
module.exports = mongoose.model("studySet", studySet)
// email: {
//     type: String,
//     required: true,
//     unique: true,
// },