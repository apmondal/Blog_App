"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRoute = void 0;
const express_1 = require("express");
const tags_1 = require("../controllers/tags");
const auth_1 = require("../middleware/auth");
const route = express_1.Router();
// POST /api/article/:slug   add tag
route.post("/:slug", auth_1.authByToken, async (req, res) => {
    try {
        const article = await tags_1.addTags(req.params.slug, req.body.tags);
        res.status(200).json({ article });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not add tag", err.message]
            }
        });
    }
});
// GET /api/article/:slug   get all tag of an article
route.get("/:slug", auth_1.authByToken, async (req, res) => {
    try {
        const article = await tags_1.getTagsBySlug(req.params.slug);
        res.status(200).json({ article });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        });
    }
});
// Delete /api/article/:slug   get all tag of an article
route.delete("/:slug", auth_1.authByToken, async (req, res) => {
    try {
        const article = await tags_1.deleteTags(req.params.slug, req.body.tag);
        res.status(200).json({ article });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        });
    }
});
exports.articleRoute = route;
