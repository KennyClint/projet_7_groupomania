const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = function(req, res, next) 
{
	bcrypt.hash(req.body.password, 10)
	.then(function (hash) {
		const user = new User( {
			email : req.body.email,
			password : hash,
			admin : false
		});
		user.save()
		.then(function() {
			res.status(200).json({
				userIdToken : { 
					userId : user._id,
					token : jwt.sign(
						{userId : user._id},
						"RANDOM_TOKEN_SECRET",
						{expiresIn : "24h"}
					)
				},
				email : user.email
			});
		})
		.catch(function(error) {
			res.status(400).json({error});
		});
	})
	.catch(function(error) {
		res.status(500).json({error});
	});
};

exports.login = function(req, res, next)
{
	User.findOne({email : req.body.email})
	.then(function(user) {
		if(!user) {
			return res.status(401).json({error : "Utilisateur non trouvé"})
		} else 
		{
			bcrypt.compare(req.body.password, user.password)
			.then(function(valid) {
				if(!valid) 
				{
					return res.status(401).json({error : "Mot de passe incorrect"});
				} else
				{
					if(user.admin)
					{
						res.status(200).json({
							userIdToken : { 
								userId : user._id,
								token : jwt.sign(
									{userId : "iAmAdmin"},
									"RANDOM_TOKEN_SECRET",
									{expiresIn : "24h"}
								),
								admin : user.admin
							},
							email : user.email
						});
					} else {
						res.status(200).json({
							userIdToken : { 
								userId : user._id,
								token : jwt.sign(
									{userId : user._id},
									"RANDOM_TOKEN_SECRET",
									{expiresIn : "24h"}
								)
							},
							email : user.email
						});
					};
				};
			})
			.catch(function(error) {
				res.status(500).json({error})
			});
		}
	})
	.catch(function(error) {
		res.status(500).json({error})
	});
};