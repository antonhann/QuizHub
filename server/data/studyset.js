const mongoose = require("mongoose")
const {Schema} = mongoose

const studySet = new Schema({
    title: String,
    description: String,
    studyCards: Array
})
module.exports = mongoose.model("studySet", studySet)
// email: {
//     type: String,
//     required: true,
//     unique: true,
// },