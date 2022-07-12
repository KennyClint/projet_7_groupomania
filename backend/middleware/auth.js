const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req, res, next)
{
	try 
	{
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		const userIdInToken = decodedToken.userId;
		req.auth = {userIdInToken};
		
		const localUserId = req.headers.authorization.split(" ")[2];

		if(userIdInToken !== "iAmAdmin")
		{
			if(localUserId !== userIdInToken)
			{
				throw "Invalid user ID";
			} else {
				next();
			}
			
		} else
		{
			next();
		} 
	} catch 
	{
		res.status(403).json({
			error : new Error("403: unauthorized request.")
		});
	}
};