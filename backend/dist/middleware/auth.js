"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authByToken = void 0;
const jwt_1 = require("../utils/jwt");
async function authByToken(req, res, next) {
    var _a;
    //check if authorization header exist
    const authHeader = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ');
    if (!authHeader)
        return res.status(401).json({
            errors: {
                body: ["Authorization failed!", "No authorization header!"]
            }
        });
    //check if authorization type is token
    if (authHeader[0] != "Token")
        return res.status(401).json({
            errors: {
                body: ["Authorization failed!", "Token missing!"]
            }
        });
    //check if token is valid
    const token = authHeader[1];
    try {
        const user = await jwt_1.decode(token);
        if (!user)
            throw new Error("No user found in token!");
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({
            errors: {
                body: ["Authorization failed!", err.message]
            }
        });
    }
}
exports.authByToken = authByToken;
