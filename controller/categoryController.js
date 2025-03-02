const CATEGORY_SCHEEMA = require('../models/category');
const categoryService = require('../services/categoryService')







class CategoryController {
    constructor() {
        this.categoryService = new categoryService();
    }


    list(req, res) {
        const limitValue = parseInt(req.query.limit);
        const pageValue = parseInt(req.query.page);
        const Skip = pageValue > 0 ? ((pageValue - 1) * limitValue) : 0;
        this.categoryService.list(limitValue, Skip).then(result => {
            if (result.length > 0) {
                res.send({
                    message: "Get Category data successfully", data: result[0].data,
                    countDocument: result[0].totalcount, success: true
                })
            } else {
                res.send({
                    message: "Failed to get Category Data", data: result[0].data,
                    countDocument: result[0].totalcount, success: false
                })
            }
        }).catch(error => {
            res.send({ message: "Something went wrong please try again later", data: error.message, success: false })
        })
    }

    questionList(req, res) {
        const limitValue = parseInt(req.query.limit);
        const pageValue = parseInt(req.query.page);
        const Skip = pageValue > 0 ? ((pageValue - 1) * limitValue) : 0;
        this.categoryService.questionList(limitValue, Skip).then(result => {
            if (result.length > 0) {
                res.send({
                    message: "Question lists each Category data successfully fetched", data: result[0].data,
                    countDocument: result[0].totalcount, success: true
                })
            } else {
                res.send({
                    message: "Failed to get Data", data: result[0].data,
                    countDocument: result[0].totalcount, success: false
                })
            }
        }).catch(error => {
            res.send({ message: "Something went wrong please try again later", data: error.message, success: false })
        })
    }

    questionListCount(req, res) {
        const limitValue = parseInt(req.query.limit);
        const pageValue = parseInt(req.query.page);
        const Skip = pageValue > 0 ? ((pageValue - 1) * limitValue) : 0;
        this.categoryService.questionListCount(limitValue, Skip).then(result => {
            if (result.length > 0) {
                res.send({
                    message: "Category lists each Question Count successfully fetched", data: result,
                    countDocument: result.length, success: true
                })
            } else {
                res.send({
                    message: "Failed to get Data", data: result,
                    countDocument: result.length, success: false
                })
            }
        }).catch(error => {
            res.send({ message: "Something went wrong please try again later", data: error.message, success: false })
        })
    }

    createCategory(req, res) {
        const bodyData = req.body;

        CATEGORY_SCHEEMA.aggregate([
            { $match: { email: bodyData.name } },
            { $limit: 1 }
        ]).then(result => {
            this.categoryService.createCategory(bodyData).then(result => {
                if (result) {
                    res.send({ message: "Category is successfully created", data: result, success: true })
                }
            }).catch(err => {
                if (err.code == "11000") {
                    res.send({ errors: "Category name is already exist", success: false })
                }
            })
        }).catch(error => {
            res.send({ message: "Something went wrong please try again later", data: error.message, success: false })
        })
    }

}

module.exports = new CategoryController();