const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passwordValidator = require("password-validator");

const User = require("../models/user");

const schema = new passwordValidator();

schema
.digits(1, "Le mot de passe doit contenir au moins un chiffre")
.lowercase(1, "Le mot de passe doit contenir au moins une lettre minuscule")
.uppercase(1, "Le mot de passe doit contenir au moins une lettre majuscule")
.symbols(1, "Le mot de passe doit contenir au moins un caractère spécial")
.min(8, "Le mot de passe doit contenir au moins 8 caractères");

exports.signup = function(req, res, next) 
{
	if(schema.validate(req.body.password))
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
							process.env.JWT_KEY,
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
	} else {
		const detail = schema.validate(req.body.password, { details : true });
		const error = detail.reduce((acc, curr) => acc + "\n" + curr.message, "Mot de passe invalide : ");
		res.status(401).json({error});
	};
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
									process.env.JWT_KEY,
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
									process.env.JWT_KEY,
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