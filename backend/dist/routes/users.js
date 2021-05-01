"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoute = void 0;
const express_1 = require("express");
const users_1 = require("../controllers/users");
const route = express_1.Router();
//POST /users/login     for login
route.post('/login', async (req, res) => {
    try {
        const user = await users_1.loginUser({
            password: req.body.user.password,
            username: req.body.user.username
        });
        const token = user.token;
        const checkbox = req.body.user.checkbox;
        if (checkbox === "on") {
            res.cookie("token", token, {
                expires: new Date(Date.now() + 100000000000),
                httpOnly: true
                //secure: false
            });
            console.log("created!");
        }
        else {
            const yo = res.cookie("token", token, {
                expires: new Date(Date.now() + 10000000),
                httpOnly: true
                //secure: false
            });
            console.log("created!+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        }
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Login failed!", err.message]
            }
        });
    }
});
//POST /users       to register a new user
route.post('/', async (req, res) => {
    try {
        const user = await users_1.createUser({
            name: req.body.user.name,
            username: req.body.user.username,
            password: req.body.user.password,
            email: req.body.user.email
        });
        const token = user.token;
        const checkbox = req.body.user.checkbox;
        if (checkbox === "on") {
            const cookie = res.cookie("token", token, {
                expires: new Date(Date.now() + 100000000000),
                httpOnly: true
                //secure: false
            });
            console.log(cookie);
        }
        else {
            const cookie = res.cookie("token", token, {
                expires: new Date(Date.now() + 10000000),
                httpOnly: true
                //secure: false
            });
            console.log(cookie);
        }
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
// Check cookies
route.get("/cookies", async (req, res) => {
    console.log("+++++++++++++++++++++++++++");
    if (req.cookies.token)
        return res.json(req.cookies.token);
    else
        return res.json("jjkk");
});
exports.usersRoute = route;
