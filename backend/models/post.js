const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        text : { type : String, required : true },
        email : { type : String, required : true },
        userId : { type : String, required : true },
        date : { type : Date, required : true},
        imageUrl : {type : String, required : true}, 
        likes : {type : Number},
        usersLiked : {type : ["String"]}
    }
);

module.exports = mongoose.model("Post", postSchema);