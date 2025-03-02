const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const fileupload = require('../middleware/fileUpload');
const questionController = require('../controller/questionController')



/* ADD CATEGORY QUESTION */
router.post('/create-question',jsonParser, questionController.createQuestion.bind(questionController));

/* ADD BULK QUESTION IN CSV FORMAT*/
router.post('/upload-questions',fileupload.single('uploadfile'),
    questionController.addQuestion.bind(questionController));

/* SEARCH QUESTION WITH ANSWER ,USER*/
router.get("/search-question", questionController.searchQuestion.bind(questionController))




module.exports = router;