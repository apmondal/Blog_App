import { Router } from "express";
import { addFollow, checkFollower, deleteFollow, getFollowers, getFollowings } from "../controllers/follow";
import { getProfile } from "../controllers/profile";
import { authByToken } from "../middleware/auth";

const route = Router();

// GET /api/profile/:username   Get user by username
route.get("/:username", authByToken, async (req, res) => {
    try {
        const user = await getProfile(req.params.username);
        res.status(200).json({user});
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        })
    }
})

// POST /api/profiles/:username/follow  Follow a user
route.post("/:username/follow", authByToken, async (req, res) => {
    try {
        const follow = await addFollow((req as any).user.email, req.params.username);
        res.status(201).json({follow});

    } catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        })
    }
})

// DELETE /api/profiles/:username/follow    Unfollow a user
route.delete("/:username/follow", authByToken, async (req, res) => {
    try {
        const follow = await deleteFollow((req as any).user.email, req.params.username);
        res.status(200).json({follow});

    } catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        })
    }
})

// get /api/profiles/user/followers    Get all follower
route.get("/user/followers", authByToken, async (req, res) => {
    try {
        const follow = await getFollowers((req as any).user.email);
        res.status(200).json({follow});

    } catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        })
    }
})

// get /api/profiles/user/followings    Get all followings
route.get("/user/followings", authByToken, async (req, res) => {
    try {
        const follow = await getFollowings((req as any).user.email);
        res.status(200).json({follow});

    } catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        })
    }
})

// get /api/profiles/:username/checkfollow    Check follower
route.get("/:username/checkfollow", authByToken, async (req, res) => {
    try {
        const check = await checkFollower((req as any).user.email, req.params.username);
        res.status(200).json({check});
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        })
    }
})

export const profileRoute = route;
