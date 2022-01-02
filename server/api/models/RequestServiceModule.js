const mongoose = require('mongoose');
const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: 8 });
var id = uid;

const requestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uId: { type: String, default: id },
 
    
    FName: { type: String },
    LName: { type: String },
    email :{type:String},
    serviceName : {type :String},
    District : {type:String},
    Latitude : {type : String},
    Longitude : {type : String},
 

});

module.exports = mongoose.model('request',requestSchema);