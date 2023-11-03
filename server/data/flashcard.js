const mongoose = require("mongoose")
const {Schema} = mongoose

const flashcard = new Schema({
    username: String,
    studySetID: String,
    studySet: Array,
    currentIndex: Number,
    showingTerm: Boolean,
    shuffled: Boolean,
    smartSort: Boolean,
    knowTerms: Number,
    endOfStudySet: Boolean,
    startsWithTerm: Boolean,
})
module.exports = mongoose.model("flashcard", flashcard)
// email: {
//     type: String,
//     required: true,
//     unique: true,
// },