const jwt = require("jsonwebtoken");

exports.createAccessToken = (user) => {

    const accessToken = jwt.sign({
        userId: user.id,
        username: user.username,
    },
        process.env.AUTH_KEY);
    return {
        accessToken
    };
};