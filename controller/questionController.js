const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require('mongoose');
const moment = require("moment-timezone");


const QUESTION_SCHEEMA = require('../models/question');
const questionService = require('../services/questionService')







class QuestionController {
    constructor() {
        this.questionService = new questionService();
    }


    // list(req, res) {
    //     const limitValue = parseInt(req.query.limit);
    //     const pageValue = parseInt(req.query.page);
    //     const Skip = pageValue > 0 ? ((pageValue - 1) * limitValue) : 0;
    //     this.categoryService.list(limitValue, Skip).then(result => {
    //         if (result.length > 0) {
    //             res.send({
    //                 message: "Get user data successfully", data: result[0].data,
    //                 countDocument: result[0].totalcount, success: true
    //             })
    //         } else {
    //             res.send({
    //                 message: "Failed to get User Data", data: result[0].data,
    //                 countDocument: result[0].totalcount, success: false
    //             })
    //         }
    //     }).catch(error => {
    //         res.send({ message: "Something went wrong please try again later", data: error.message, success: false })
    //     })
    // }

    createQuestion(req, res) {
        const bodyData = req.body;

        this.questionService.createCategory(bodyData).then(result => {
            if (result) {
                res.send({ message: "Category is successfully created", data: result, success: true })
            }
        }).catch(error => {
            res.send({ message: "Something went wrong please try again later", data: error.message, success: false })
        })
    }

    async addQuestion(req, res) {
        try {
            const fileData = req.file;
            if (!fileData) {
                return res.send({ message: "No file uploaded!", success: false });
            }

            const questionsArray = [];

            fs.createReadStream(fileData.path)
                .pipe(csv())
                .on("data", (row) => {
                    const categoryIds = row.category_ids;
                    questionsArray.push({
                        question: row.question,
                        // options: row.options,
                        // correct_answer: row.correct_answer,
                        category_ids: categoryIds
                    });
                })
                .on("end", async () => {
                    await QUESTION_SCHEEMA.insertMany(questionsArray);
                    fs.unlinkSync(req.file.path);
                    res.send({ message: "Questions uploaded successfully!", success: true });
                });
        } catch (error) {
            res.send({ message: "Error processing file", error: error.message, success: false });
        }
    }

    searchQuestion(req, res) {
        const queryData = req.query

        this.questionService.searchQuestion(queryData).then(result => {
            if (result.length === 0) {
                res.send({ message: "No matching question found", success: false });
            } else {
                res.send({ message: "Successfully get result", data: result[0], success: true })
            }
        }).catch(error => {
            res.send({ message: "Something went wrong please try again later", data: error.message, success: false })
        })
    }

}

module.exports = new QuestionController();