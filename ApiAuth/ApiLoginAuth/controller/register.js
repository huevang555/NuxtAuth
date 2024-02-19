const { User } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, fname, password } = req.body;
        const user = await User.findOne({ where: { fname:fname } });
        if (user) {
            return res.send("Username already exists!!!").status(400);
        }
        const salt = await bcrypt.genSalt(10);
        const adduser = new User({
            email,
            fname,
            password
        });
        adduser.password = await bcrypt.hash(password, salt);

        await adduser.save();
        res.send("Register Success");
        console.log(adduser);
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
};
exports.checkmailotp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check if there's a user with the provided email and matching OTP
        const userWithOTP = await User.findOne({ where: { email, otp } });

        if (userWithOTP) {
            // Clear the 'otp' value in the user record
            await User.update({ otp: null }, { where: { email, otp } });

            return res.send("Register success !!!").status(200);
        }

        res.send("Register fail").status(400);
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
};

exports.login = async (req, res) => {
    try {
        const { email, fname, password } = req.body;
        const user = await User.findOne({ where: { fname: fname} });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send('Password Invalid!!!');
            }
            const payload = {
                user: {
                    fname: user.fname
                }
            };
            jwt.sign(payload, "jwtsecret", { expiresIn: '1d' }, (err, token) => {
                if (err) throw err;
                res.status(200).json({success:true,user:{ token, payload }});
            });
        } else {
            return res.status(400).send('User not found!!!');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
};



// Modify the getUserData function
exports.getUserData = async (req, res) => {
    try {
        // Extract user information from the request object
        const { user } = req; // Use `user` instead of `req.user`
        console.log(user)
        console.log(user.user.fname)
        const name=user.user.fname
        if (!name) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find user in the database based on fname
        const fetchedUser = await User.findOne({
            attributes: ['fname', 'email'],
            where: { fname: name }
        });

        if (!fetchedUser) {
            return res.status(404).json({ message: 'User not found in the database' });
        }

        // Send the user data as a response
        res.json({user:{fetchedUser}});
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send("Server error");
    }
};


const blacklist = new Set();
exports.logout = async (req, res) => {
    try {
        // Retrieve the token from the request headers
        const token = req.headers["authorization"];
        console.log('blacklist_token:', token);

        // Add the token to the blacklist (you may want to store it in a database or cache)
        // In this example, I'm using an array to simulate a blacklist
        // You can replace this with your preferred storage mechanism
        const blacklist = []; // Initialize this array somewhere in your application

        blacklist.push(token);

        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

