const bcrypt = require('bcryptjs')



let data = {};
/* PASSWORD ENCRYPTION */
data.encryptPassword = function (password, length) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, length, (error, hash) => {
            if (error) {
                return reject(error)
            }
            return resolve(hash)
        })
    })
}

/* PASSWORD DECRYPTION */
data.decryptPassword = function (decryptedPassword, encryptedpassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(decryptedPassword, encryptedpassword, function (err, pass) {
            if (err) {
                return reject(err)
            }
            return resolve(pass)
        })
    })

}



module.exports = data;