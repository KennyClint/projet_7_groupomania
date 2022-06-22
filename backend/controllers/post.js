const Post = require("../models/post");
const fs = require("fs");

exports.createPost = function(req, res, next)
{
    const postObject = JSON.parse(req.body.post);
	delete postObject._id;
    const post = new Post({
        text : req.body.text,
        userId : req.body.userId,
        email : req.body.email,
        date : req.body.date,
        likes : 0,
        imageUrl : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    })
    post.save()
    .then(function()
    {
        res.status(201).json({message : "Post saved"});
    })
    .catch(function(error)
    {
        res.status(400).json({error : error});
    })
};

exports.getAllPost = function(req, res, next)
{
    Post.find()
    .then(function(posts){
        res.status(200).json(posts);
    })
    .catch(function(error){
        res.status(400).json({error : error});
    })
};

exports.modifyPost = function(req, res, next)
{
	const postObject = req.file ?
	{
		...JSON.parse(req.body.post),	
		imageUrl : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`	
	} : {...req.body};
	if(req.file)
	{
		Post.findOne({_id : req.params.id})
		.then(function(post){
			const filename = post.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, function(error){
				if(error){console.log(error)}
					else {console.log("Old file delete")};
			});
		})
		.catch(function(error){
			res.status(500).json({error});
		});
	};
	Post.updateOne({_id : req.params.id}, {...postObject, _id : req.params.id})
	.then(function(){
		res.status(200).json({message : "Post updated successfully"});
	})
	.catch(function(error){
		res.status(400).json({error});
	});
};

exports.deletePost = function(req, res, next)
{
	Post.findOne({_id : req.params.id})
	.then(function(post){
		if(!post)
		{
			res.status(404).json({error : new Error("No such post")});
		} else 
		{
			if(post.userId !== req.auth.userId)
			{
				res.status(400).json({error : new Error("Unauthorized request")});
			} else
			{
				Post.findOne({_id : req.params.id})
				.then(function(post){
					const filename = post.imageUrl.split("/images/")[1];
					fs.unlink(`images/${filename}`,function(){
						Post.deleteOne({_id : req.params.id})
						.then(function(){
							res.status(200).json({message : "Deleted"});
						})
						.catch(function(error){
							res.status(400).json({error : error});
						});
					});
				})
				.catch(function(error){
					res.status(500).json({error});
				});
			}
		}
	})
};

exports.likePost = function(req, res, next)
{
	Post.findOne({_id : req.params.id})
	.then(function(post){
		const like = req.body.like;
		const userId = req.body.userId;
		const usersLikedArray = post.usersLiked;
			switch(like)
			{
				case 1 :
				let counterLike = 0;
				for (let i of usersLikedArray)
				{
					if(i !== userId)
					{
						counterLike++;
					} else 
					{
						break;
					};
				};
				if(counterLike === usersLikedArray.length)
				{
					usersLikedArray.push(userId);
					Post.updateOne({_id : req.params.id}, {$set : {usersLiked : usersLikedArray, likes : usersLikedArray.length}})
					.then(function(){
						res.status(200).json({message : "Post liked"});
					})
					.catch(function(error){
						res.status(400).json({error});
					});
				};

				break;
				case 0 :
				for (let i in usersLikedArray)
				{
					if(usersLikedArray[i] === userId)
					{
						usersLikedArray.splice(i, 1);
						Post.updateOne({_id : req.params.id}, {$set : {usersLiked : usersLikedArray, likes : usersLikedArray.length}})
						.then(function(){
							res.status(200).json({message : "Like user delete"});
						})
						.catch(function(error){
							res.status(400).json({error});
						});
					};
				};

				break;
				default :
				res.status(500).json({error : "Valeur variable like requête inconnue"});
			};
	})
	.catch(function(error){
		res.status(500).json({error});
	});
};