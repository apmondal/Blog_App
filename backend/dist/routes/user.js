"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const articles_1 = require("../controllers/articles");
const users_1 = require("../controllers/users");
const auth_1 = require("../middleware/auth");
const route = express_1.Router();
// GET /user
route.get('/', auth_1.authByToken, async (req, res) => {
    try {
        const user = await users_1.getUserByEmail(req.user.email);
        if (!user)
            throw new Error("No such user found!");
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(404).json({
            errors: {
                body: [err.message]
            }
        });
    }
});
//PATCH /user       to update a user
route.patch('/', auth_1.authByToken, async (req, res) => {
    try {
        const user = await users_1.updateUserDetails(req.body.user, req.user.email);
        return res.status(201).json({ user });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ["There is some error!", e.message]
            }
        });
    }
});
//GET /:username    get all articles of a user
route.get("/:username", auth_1.authByToken, async (req, res) => {
    try {
        const articles = await articles_1.getAllArticleOfAUser(req.params.username);
        return res.status(200).json({ articles });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: [e.message]
            }
        });
    }
});
exports.userRoute = route;
