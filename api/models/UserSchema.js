const mongoose = require('mongoose');
const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: 8 });
var id = uid;

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uId: { type: String, default: id },
 
    
    FName: { type: String },
    LName: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },

});

module.exports = mongoose.model('User', userSchema);
