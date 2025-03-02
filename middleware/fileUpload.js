const path = require('path');
const multer = require('multer');

// set the disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// set the file type &
// set the file size
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: function (req, file, callback) {
        if (file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'text/csv') {
            callback(null, true)
        } else {
            console.log('only jpeg, jpg, png & csv file supported!');
            callback(null, false)
        }
    }
});





module.exports = upload;



