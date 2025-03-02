const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const categoryController = require('../controller/categoryController')



/* GET CATEGORY LISTS */
router.get('/category-list', categoryController.list.bind(categoryController));

/* LIST OF QUESTIONS EACH CATEGORY LISTS */
router.get('/category-question-list', categoryController.questionList.bind(categoryController));

/* LIST OF CATEGORY ALONG WITH LISTS COUNT */
router.get('/category-question-list-count', categoryController.questionListCount.bind(categoryController));

/* CATEGORY CREATE */
router.post('/create-category', jsonParser, categoryController.createCategory.bind(categoryController));






module.exports = router;