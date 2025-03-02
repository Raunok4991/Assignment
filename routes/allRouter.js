const userRouter = require('./user');
const categorieRouter = require('./category');
const questionRouter = require('./question');
const answerRouter = require('./answer');
const VERIFY_TOKEN = require('../middleware/verifyToken');

module.exports = {
    routes: function (app) {
        app.use('/api/user', userRouter)
        app.use('/api/category', VERIFY_TOKEN.verifyToken, categorieRouter);
        app.use('/api/question', VERIFY_TOKEN.verifyToken, questionRouter);
        app.use('/api/answer', VERIFY_TOKEN.verifyToken, answerRouter);
    }
}