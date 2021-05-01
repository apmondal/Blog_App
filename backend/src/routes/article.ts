import { Router } from "express";
import { addTags, deleteTags, getTagsBySlug } from "../controllers/tags";
import { authByToken } from "../middleware/auth";

const route = Router();

// POST /api/article/:slug   add tag
route.post("/:slug", authByToken, async (req, res) => {
    try {
        const article = await addTags(req.params.slug, req.body.tags);

        res.status(200).json({article});
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not add tag", err.message]
            }
        })
    }
})

// GET /api/article/:slug   get all tag of an article
route.get("/:slug", authByToken, async (req, res) => {
    try {
        const article = await getTagsBySlug(req.params.slug);

        res.status(200).json({article});
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        })
    }
})

// Delete /api/article/:slug   get all tag of an article
route.delete("/:slug", authByToken, async (req, res) => {
    try {
        const article = await deleteTags(req.params.slug, req.body.tag);

        res.status(200).json({article});
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        })
    }
})

export const articleRoute = route
