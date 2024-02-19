// const jwt = require('jsonwebtoken');

// exports.middleware = async (req, res, next) => {
//     try {
//         const token = req.headers["authorization"].split(" ")[1];
//         if (!token) {
//             return res.status(401).send('No token')
//         }
//         const decoded = jwt.verify(token, 'jwtsecret')
//         console.log(decoded)
//         next();
//     } catch (error) {
//         console.log(error)
//         res.send('Token Invalid').status(500)
//     }
// }

const jwt = require('jsonwebtoken');

exports.middleware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const {name}=req.body;
        console.log('fname',name);
        console.log("token:", authHeader);

        if (!authHeader) {
            return res.status(400).send('No token provided');
        }

        // Check if the header is in the correct format
        const parts = authHeader.split(' ');
        console.log('length:',parts.length);
        console.log('token[0]:',parts[0])
        console.log('token[1]:',parts[1])

        // if (parts.length !== 2 || parts[0] !== 'Bearer') {
        //     console.log('invalid token format')
        //     return res.status(401).send('Invalid token format');
        // }

        const token = parts[0];
        const decoded = jwt.verify(token, 'jwtsecret');
        req.user = decoded; // Attach user information to the request object
        console.log('user:',req.user.user)
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Token Invalid');
    }
};

