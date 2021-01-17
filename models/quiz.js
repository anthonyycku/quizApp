const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: String,
    answer: String,
    selection: [String]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
