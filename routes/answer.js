const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();



const answerController = require('../controller/answerController')





/* ADD ANSWER */
router.post('/create-answer', jsonParser, answerController.createAnswer.bind(answerController));


module.exports = router;