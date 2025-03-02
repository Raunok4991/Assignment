const { ObjectId } = require('mongodb');

const QUESTION_SCHEEMA = require('../models/question');







class QuestionService {
    constructor() {
    }

    // list(limit,skip) {
    //     return new Promise((resolve, reject) => {
    //         CATEGORY_SCHEEMA.aggregate([
    //             {
    //                 $facet: {
    //                     totalcount: [{ $count: "totalCount" }], // Count total documents
    //                     data: [                                 // Fetch paginated data
    //                         { $skip: parseInt(skip) },
    //                         { $limit: parseInt(limit) }
    //                     ]
    //                 }
    //             }
    //         ]).then(result => {
    //             return resolve(result)
    //         }).catch(error => {
    //             return reject(error)
    //         })
    //     })
    // }

    createCategory(bodyData) {
        return new Promise((resolve, reject) => {
            QUESTION_SCHEEMA.create(bodyData)
                .then(result => {
                    return resolve(result)
                }).catch(err => {
                    return reject(err)
                });
        })
    }

    searchQuestion(queryData) {
        return new Promise((resolve, reject) => {
            QUESTION_SCHEEMA.aggregate([
                {
                    $match: {
                        question: { $regex: queryData.search, $options: "i" }
                    }
                },
                {
                    $lookup: {
                        from: "answers",
                        let: { question_id: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$questionId", "$$question_id"]
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    userId: 1,
                                    selectedAnswer: 1,
                                    isCorrect: 1,
                                    submitted_at: 1
                                }
                            }
                        ],
                        as: "user_answers"
                    }
                },
                { $unwind: { path: "$user_answers", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_answers.userId",
                        foreignField: "_id",
                        as: "user_details"
                    }
                },
                { $unwind: { path: "$user_details", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        _id: 0,
                        question: 1,
                        user_answer: {
                            selectedAnswer: "$user_answers.selectedAnswer",
                            submitted_at: "$user_answers.submitted_at",
                            isCorrect: "$user_answers.isCorrect",
                            fname: "$user_details.fname",
                            lname: "$user_details.lname"
                        }
                    }
                }
            ]).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            });
        })
    }


}

module.exports = QuestionService;
