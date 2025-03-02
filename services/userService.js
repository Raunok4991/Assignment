const { ObjectId } = require('mongodb');

const USER_SCHEEMA = require('../models/user');







class UserService {
    constructor() {
    }

    details(id) {
        return new Promise((resolve, reject) => {
            USER_SCHEEMA.aggregate([
                {
                    $match: {
                        $expr: { $eq: ["$_id", new ObjectId(id)] }
                    }
                }
            ]).then(result => {
                return resolve(result)
            }).catch(error => {
                return reject(error)
            })
        })
    }

    register(bodyData) {
        return new Promise((resolve, reject) => {
            USER_SCHEEMA.create(bodyData)
                .then(result => {
                    return resolve(result)
                }).catch(err => {
                    return reject(err)
                });
        })
    }

    uploadImage(reqFile, id) {
        return new Promise((resolve, reject) => {
            USER_SCHEEMA.updateOne(
                { _id: id },
                {
                    "profilePicture": reqFile
                }
            ).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            });
        })
    }


    updateUserDetails(id, bodyData) {
        return new Promise((resolve, reject) => {
            USER_SCHEEMA.findOneAndUpdate(
                { _id: id }, bodyData, { new: true }
            ).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            });
        })
    }
}

module.exports = UserService;
