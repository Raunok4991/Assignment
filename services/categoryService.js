const { ObjectId } = require('mongodb');

const CATEGORY_SCHEEMA = require('../models/category');







class CategoryService {
    constructor() {
    }

    list(limit,skip) {
        return new Promise((resolve, reject) => {
            CATEGORY_SCHEEMA.aggregate([
                {
                    $facet: {
                        totalcount: [{ $count: "totalCount" }], // Count total documents
                        data: [                                 // Fetch paginated data
                            { $skip: parseInt(skip) },
                            { $limit: parseInt(limit) }
                        ]
                    }
                }
            ]).then(result => {
                return resolve(result)
            }).catch(error => {
                return reject(error)
            })
        })
    }

    questionList(limit,skip) {
        return new Promise((resolve, reject) => {
            CATEGORY_SCHEEMA.aggregate([
                {
                    $lookup: {
                        from: "questions",                             // Name of the questions collection
                        localField: "_id",                             // Category ID in Categories collection
                        foreignField: "category_ids",                  // Category IDs stored in Questions collection
                        as: "questionsList"                            // Output field containing matched questions
                    }
                },
                {
                    $facet: {
                        metadata: [{ $count: "totalCount" }],         // Count total documents
                        data: [
                            { $skip: parseInt(skip) },                // Skip records
                            { $limit: parseInt(limit) }               // Limit number of records
                        ]
                    }
                }
            ]).then(result => {
                return resolve(result)
            }).catch(error => {
                return reject(error)
            })
        })
    }

    questionListCount(limit,skip) {
        return new Promise((resolve, reject) => {
            CATEGORY_SCHEEMA.aggregate([
                {
                    $lookup: {
                        from: "questions",                          // Collection to join (Questions)
                        localField: "_id",                          // Field from Categories
                        foreignField: "category_ids",               // Field from Questions (array)
                        as: "questionsList"                         // Store result in this field
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: 1,
                        totalQuestions: { $size: "$questionsList" } // Count the number of questions
                    }
                }
            ]).then(result => {
                return resolve(result)
            }).catch(error => {
                return reject(error)
            })
        })
    }

    createCategory(bodyData) {
        return new Promise((resolve, reject) => {
            CATEGORY_SCHEEMA.create(bodyData)
                .then(result => {
                    return resolve(result)
                }).catch(err => {
                    return reject(err)
                });
        })
    }

}

module.exports = CategoryService;
