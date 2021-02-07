const jwt = require("jsonwebtoken");
const config = require('config');
module.exports = (req, res, next) => {
    if(req.method === "OPTIONS"){
        return next();
    }

    try {
        const token = req.headers.autherization.split(' ')[1];

        if(!token){
            res.status(401).json({ message: "Ошибка авторизации" });
        }

        const decoded = jwt.verify(token, config.get('jwt_secret'));

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({ message: "Ошибка авторизации" });
        next();
    }
}