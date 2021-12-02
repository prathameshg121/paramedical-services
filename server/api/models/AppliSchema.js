const mongoose = require('mongoose');
const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: 8 });
var id = uid;

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uId: { type: String, default: id },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    gender :{type:String},
    profession :{type:String},
    FName: { type: String },
    LName: { type: String },
    UserName: { type: String, default:"appli" },
    City: { type: String },
    zip: { type: Number, default: 123 },

});

module.exports = mongoose.model('User', userSchema);
