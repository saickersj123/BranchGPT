const bcrypt = require('bcrypt')
const User = require('../models/User')
const { createToken } = require('../utils/Token')
const { COOKIE_NAME } = require('../utils/Constants');

module.exports = {
 async getAllUsers(res) {
	try {
		const users = await User.find();
		return res.status(200).json({ message: "OK", users });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ERROR", cause: error.message });
	}
},

async userSignUp(req, res) {
	try {
		const { name, email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser)
			return res.status(409).json({
				message: "ERROR",
				cause: "User with same email already exists",
			});

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({ name, email, password: hashedPassword });
		await user.save();

		// create token and store cookie

		res.clearCookie(COOKIE_NAME),
			{
				path: "/", //cookie directory in browser
				domain: process.env.DOMAIN, // our website domain
				httpOnly: true,
				signed: true,
			};

		// create token
		const token = createToken(user._id.toString(), user.email, "7d");

		const expires = new Date();
		expires.setDate(expires.getDate() + 7);

		res.cookie(COOKIE_NAME, token, {
			path: "/", //cookie directory in browser
			domain: process.env.DOMAIN, // our website domain
			expires, // same as token expiration time
			httpOnly: true,
			signed: true,
			sameSite: 'none',
			secure: true,
		});

		return res
			.status(201)
			.json({ message: "OK", name: user.name, email: user.email });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ERROR", cause: error.message });
	}
},

async userLogin(req, res) {
	try {
		const { email, password } = req.body;
		console.log(email, password);

		const user = await User.findOne({ email });
		if (!user)
			return res.status(409).json({
				message: "ERROR",
				cause: "No account with given emailID found",
			});

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect)
			return res
				.status(403)
				.json({ message: "ERROR", cause: "Incorrect Password" });

		// if user will login again we have to -> set new cookies -> erase previous cookies
		res.clearCookie(COOKIE_NAME),
			{
				path: "/", //cookie directory in browser
				domain: process.env.DOMAIN, // our website domain
				httpOnly: true,
				signed: true,
			};

		// create token
		const token = createToken(user._id.toString(), user.email, "7d");

		const expires = new Date();
		expires.setDate(expires.getDate() + 7);

		res.cookie(COOKIE_NAME, token, {
			path: "/", //cookie directory in browser
			domain: process.env.DOMAIN, // our website domain
			expires, // same as token expiration time
			httpOnly: true,
			signed: true,
			sameSite: 'none',
			secure: true,
		});
		console.log("token created on login:",token);
		return res
			.status(200)
			.json({ message: "OK", name: user.name, email: user.email });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ERROR", cause: error.message });
	}
},

async verifyUserStatus(res) {
	try {
		const user = await User.findById(res.locals.jwtData.id); // get variable stored in previous middleware

		if (!user)
			return res.status(401).json({
				message: "ERROR",
				cause: "User doesn't exist or token malfunctioned",
			});

		if (user._id.toString() !== res.locals.jwtData.id) {
			return res
				.status(401)
				.json({ message: "ERROR", cause: "Permissions didn't match" });
		}

		return res
			.status(200)
			.json({ message: "OK", name: user.name, email: user.email });
	} catch (err) {
		console.log(err);
		return res
			.status(200)
			.json({ message: "ERROR", cause: err.message});
	}
},

async logoutUser(res) {
	try {
		const user = await User.findById(res.locals.jwtData.id); // get variable stored in previous middleware

		if (!user)
			return res.status(401).json({
				message: "ERROR",
				cause: "User doesn't exist or token malfunctioned",
			});

		if (user._id.toString() !== res.locals.jwtData.id) {
			return res
				.status(401)
				.json({ message: "ERROR", cause: "Permissions didn't match" });
		}
		
		res.clearCookie(COOKIE_NAME),
		{
			path: "/", //cookie directory in browser
			domain: process.env.DOMAIN, // our website domain
			httpOnly: true,
			signed: true,
		};

		return res
			.status(200)
			.json({ message: "OK", name: user.name, email: user.email });
	} catch (err) {
		console.log(err);
		return res
			.status(200)
			.json({ message: "ERROR", cause: err.message});
	}
}
}