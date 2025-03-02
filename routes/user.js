const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { check } = require('express-validator');

const fileupload = require('../middleware/fileUpload');
const VERIFY_TOKEN = require('../middleware/verifyToken');
const UserController = require('../controller/userController');








/* GET USER DETAILS */
router.get('/details/:id', VERIFY_TOKEN.verifyToken, UserController.details.bind(UserController));

/* REGISTER USER */
router.post('/register', jsonParser, UserController.register.bind(UserController));

/* LOGIN USER */
router.post('/login', jsonParser, UserController.login.bind(UserController));

/* IMAGE UPLOAD */
router.post('/upload-image/:id', VERIFY_TOKEN.verifyToken, fileupload.single('uploadfile'), UserController.uploadImage.bind(UserController));

/* UPDATE USER DETAILS */
router.put('/update-user/:id', VERIFY_TOKEN.verifyToken, fileupload.single('uploadfile'),
    jsonParser, UserController.updateUserDetails.bind(UserController));


module.exports = router;