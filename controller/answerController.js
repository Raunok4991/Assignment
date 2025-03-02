const mongoose = require("mongoose");

const ANSWER_SCHEEMA = require('../models/answer');
const QUESTION_SCHEEMA = require('../models/question');
const answerService = require('../services/answerService')







class AnswerController {
    constructor() {
        this.answerService = new answerService();
    }

    async createAnswer(req, res) {
        const bodyData = req.body;
        const result = await QUESTION_SCHEEMA.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(bodyData.questionId) }
            },
            {
                $project: {
                    correctAnswer: 1,
                    is_correct: { $eq: ["$correctAnswer", bodyData.selectedAnswer] }
                }
            }
        ]);
        if (!result.length) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        const isCorrect = result[0].is_correct;
        bodyData.isCorrect=isCorrect

        this.answerService.createAnswer(bodyData).then(result => {
            if (result) {
                res.send({ message: "Answer is successfully Submitted", data: result, success: true })
            }
        }).catch(error => {
            res.send({ message: "Something went wrong please try again later", data: error.message, success: false })
        })
    }

}

module.exports = new AnswerController();