const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    username : {
        type : String,
    },
    profilepic : {
        type:String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ2wAWm_axMvDffaY9jnCQk0WEpVYaJCleUT63zTzzcj2VCWGL8&usqp=CAU"
    },

    date : {
        type : Date,
        default : Date.now
    }
});
module.exports = Person = mongoose.model("myperson",personSchema)