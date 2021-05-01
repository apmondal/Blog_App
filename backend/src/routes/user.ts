import { Router } from "express";
import { getAllArticleOfAUser } from "../controllers/articles";
import { getUserByEmail, updateUserDetails } from "../controllers/users";
import { authByToken } from "../middleware/auth";

const route = Router()

// GET /user
route.get('/', authByToken, async (req, res) => {

    try {
        const user = await getUserByEmail((req as any).user.email);

        if(!user) throw new Error("No such user found!");

        return res.status(200).json({user});
    } catch (err) {
        return res.status(404).json({
            errors: {
                body: [err.message]
            }
        })
    }
})

//PATCH /user       to update a user
route.patch('/', authByToken, async (req, res) => {
    try {
        const user = await updateUserDetails(req.body.user, (req as any).user.email);
        return res.status(201).json({user});
    } catch(e) {
        return res.status(422).json({
            errors: {
                body: ["There is some error!", e.message]
            }
        })
    }
})

//GET /:username    get all articles of a user
route.get("/:username", authByToken, async (req, res) => {
    try {
        const articles = await getAllArticleOfAUser(req.params.username);
        return res.status(200).json({articles});
    } catch (e) {
        return res.status(422).json({
            errors: {
                body: [e.message]
            }
        })
    }
})

export const userRoute = route;
