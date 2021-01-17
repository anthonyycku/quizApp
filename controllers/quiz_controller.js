const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz.js");

router.get("/", (req, res) => {
    Quiz.find({}, (err, found) => {
        res.json(found);
    })
})

router.post("/", (req, res) => {
    Quiz.create(req.body, (err, created) => {
        Quiz.find({}, (err, found) => {
            res.json(found);
        })
    })
})

router.put("/:id", (req, res) => {
    Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updated) => {
        Quiz.find({}, (err, found) => {
            res.json(found);
        })
    })
})

router.delete("/:id", (req, res) => {
    Quiz.findByIdAndRemove(req.params.id, (err, deleted) => {
        Quiz.find({}, (err, found) => {
            res.json(found);
        })
    })
})

module.exports = router;