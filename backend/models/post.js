const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        text : { type : String },
        email : { type : String, required : true },
        userId : { type : String, required : true },
        dateTime : { type : Number, required : true },
        imageUrl : { type : String }, 
        likes : { type : Number },
        usersLiked : {type : ["String"]}
    }
);

module.exports = mongoose.model("Post", postSchema);