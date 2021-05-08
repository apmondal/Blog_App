"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoute = void 0;
const express_1 = require("express");
const follow_1 = require("../controllers/follow");
const profile_1 = require("../controllers/profile");
const auth_1 = require("../middleware/auth");
const route = express_1.Router();
// GET /api/profile/:username   Get user by username
route.get("/:username", auth_1.authByToken, async (req, res) => {
    try {
        const user = await profile_1.getProfile(req.params.username);
        res.status(200).json({ user });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        });
    }
});
// POST /api/profiles/:username/follow  Follow a user
route.post("/:username/follow", auth_1.authByToken, async (req, res) => {
    try {
        const follow = await follow_1.addFollow(req.user.email, req.params.username);
        res.status(201).json({ follow });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        });
    }
});
// DELETE /api/profiles/:username/follow    Unfollow a user
route.delete("/:username/follow", auth_1.authByToken, async (req, res) => {
    try {
        const follow = await follow_1.deleteFollow(req.user.email, req.params.username);
        res.status(200).json({ follow });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        });
    }
});
// get /api/profiles/user/followers    Get all follower
route.get("/user/followers", auth_1.authByToken, async (req, res) => {
    try {
        const follow = await follow_1.getFollowers(req.user.email);
        res.status(200).json({ follow });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        });
    }
});
// get /api/profiles/user/followings    Get all followings
route.get("/user/followings", auth_1.authByToken, async (req, res) => {
    try {
        const follow = await follow_1.getFollowings(req.user.email);
        res.status(200).json({ follow });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        });
    }
});
// get /api/profiles/:username/checkfollow    Check follower
route.get("/:username/checkfollow", auth_1.authByToken, async (req, res) => {
    try {
        const check = await follow_1.checkFollower(req.user.email, req.params.username);
        res.status(200).json({ check });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        });
    }
});
exports.profileRoute = route;
