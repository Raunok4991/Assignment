const USER_SCHEEMA = require('../models/user');
const userService = require('../services/userService')
const ENCRYPT_DECRYPT_PASSWORD = require('../common/passEncryptDecrypt');
const VERIFY_TOKEN = require('../middleware/verifyToken')






class UserController {
    constructor() {
        this.userService = new userService();
    }


    details(req, res) {

        const id = req?.params?.id;
        this.userService.details(id).then(result => {
            if (result.length > 0) {
                res.send({ message: "Get user data successfully", data: result[0], success: true })
            } else {
                res.send({ message: "Failed to get User Data", data: null, success: false })
            }
        }).catch(error => {
            res.send({ message: "Something went wrong please try again later", data: error.message, success: false })
        })
    }

    register(req, res) {
        const bodyData = req.body;

        /*USER_SCHEEMA.findOne({ email: bodyData.email })*/
        USER_SCHEEMA.aggregate([
            { $match: { email: bodyData.email } },
            { $limit: 1 }
        ]).then((user) => {
            ENCRYPT_DECRYPT_PASSWORD.encryptPassword(bodyData.password, 10).then((password) => {
                bodyData.password = password;
                this.userService.register(bodyData).then(result => {
                    if (result) {
                        res.send({ message: "User is register successfully", data: result, success: true })
                    }
                }).catch(err => {
                    if (err.code == "11000") {
                        res.send({ errors: "Email id is already exist", success: false })
                    }
                })
            })
        }).catch(err => {
            res.send({ errors: "Something went wrong please try again later", success: false })
        })
    }

    uploadImage(req, res) {
        const reqFile = req?.file?.originalname;
        const id = req?.params?.id;

        this.userService.uploadImage(reqFile, id).then(result => {
            if (result.modifiedCount === 1) {
                res.send({ message: "Image successfully uploaded", success: true })
            } else {
                res.send({ message: "Failed to Upload Image", success: false })
            }
        }).catch(err => {
            res.send({ error: "Error!!", data: err.message, success: false })
        })

    }

    login(req, res) {
        const { email, password } = req.body;

        USER_SCHEEMA.findOne({ email: email }).then((user_details) => {
            ENCRYPT_DECRYPT_PASSWORD.decryptPassword(password, user_details.password).then((password) => {
                if (!password) {
                    res.send({ message: "Password Not Matched with this Email !!", success: false })
                } else {
                    VERIFY_TOKEN.signToken(user_details).then(token => {
                        const USER_OBJ = {
                            _id: user_details._id,
                            fname: user_details.fname,
                            lname: user_details.lname,
                            email: user_details.email,
                            token: 'Bearer ' + token
                        }
                        res.send({ message: "Login Successful", data: USER_OBJ, success: true })
                    }).catch(err => {
                        res.send({ error: "Error!!", data: err.message, success: false })
                    })
                }
            }).catch(err => {
                res.send({ error: "Error!!", data: err.message, success: false })
            })
        }).catch(error => {
            res.send({ message: 'Failed', data: error, success: false })
        })

    }

    updateUserDetails(req, res) {
        const id = req?.params?.id;
        const bodyData = req?.body;
        const reqFile = req?.file;

        const updatePromises = []

        if (bodyData) {
            updatePromises.push(this.userService.updateUserDetails(id, bodyData))
        }
        if (reqFile) {
            updatePromises.push(this.userService.uploadImage(reqFile.originalname, id))
        }
        Promise.all(updatePromises)
            .then(results => {
                const userUpdateResult = bodyData ? results[0] : null;
                const imageUpdateResult = reqFile ? results[1] : null;
                let message = "User details updated successfully";
                if (userUpdateResult && imageUpdateResult !== null &&
                    imageUpdateResult.modifiedCount === 1) {
                    message += " & Profile image updated successfully";
                }
                res.send({ message, success: true });
            })
            .catch(error => {
                res.send({ message: "Failed", error: error.message, success: false });
            });
    }

}

module.exports = new UserController();