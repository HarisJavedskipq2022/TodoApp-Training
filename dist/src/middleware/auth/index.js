"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
require("dotenv/config");
const jwt_1 = require("../../services/jwt");
class authMiddleware {
}
exports.authMiddleware = authMiddleware;
authMiddleware.authorize = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const decode = jwt_1.Jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.user = decode;
        next();
    }
    catch (e) {
        res.status(401).send({ msg: "invalid token" });
    }
};
