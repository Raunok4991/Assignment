const { ObjectId } = require('mongodb');

const ANSWER_SCHEEMA = require('../models/answer');







class AnswerService {
    constructor() {
    }

    createAnswer(bodyData) {
        return new Promise((resolve, reject) => {
            ANSWER_SCHEEMA.create(bodyData)
                .then(result => {
                    return resolve(result)
                }).catch(err => {
                    return reject(err)
                });
        })
    }

}

module.exports = AnswerService;
