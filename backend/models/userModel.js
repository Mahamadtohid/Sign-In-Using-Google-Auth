const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name : {
        type : String,
    },
    email : {
        type : String,
    },
    image : {
        type : String,
    }
})

const UserModel = mongoose.model('UserModel' , userSchema)
module.exports = UserModel 