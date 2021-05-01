"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articlesRoute = void 0;
const express_1 = require("express");
const articles_1 = require("../controllers/articles");
const comments_1 = require("../controllers/comments");
const favourite_1 = require("../controllers/favourite");
const auth_1 = require("../middleware/auth");
const route = express_1.Router();
// GET /api/articles    List articles
route.get("/", async (req, res) => {
    try {
        const articles = await articles_1.getAllArticles();
        res.status(200).json({ articles });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: ["No article found!", err.message]
            }
        });
    }
});
// GET /api/articles/feed   Feed articles for given user
route.get("/feed", auth_1.authByToken, async (req, res) => {
    try {
        const articles = await articles_1.getFeedArticles(req.user.email);
        res.status(200).json({ articles });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Article doesn't exist!", err.message]
            }
        });
    }
});
// GET /api/articles/:slug  Get a single article
route.get("/:slug", async (req, res) => {
    try {
        const article = await articles_1.getArticlesBySlug(req.params.slug);
        res.status(200).json({ article });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Article doesn't exist!", err.message]
            }
        });
    }
});
// POST /api/article    Create an article
route.post("/", auth_1.authByToken, async (req, res) => {
    try {
        const article = await articles_1.createArticle(req.body.article, req.user.email);
        res.status(201).json({ article });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not create article!", err.message]
            }
        });
    }
});
// PATCH /api/articles/:slug    Update an article
route.patch("/:slug", auth_1.authByToken, async (req, res) => {
    try {
        const article = await articles_1.updateArticle(req.body.article, req.params.slug);
        res.status(200).json({ article });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not found article!", err.message]
            }
        });
    }
});
// DELETE /api/articles/:slug   Delete an article
route.delete("/:slug", auth_1.authByToken, async (req, res) => {
    try {
        const article = await articles_1.deleteArticle(req.params.slug);
        res.status(200).json({ article });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Article could not found!", err.message]
            }
        });
    }
});
// POST /api/articles/:slug/comments    Add a comment
route.post("/:slug/comments", auth_1.authByToken, async (req, res) => {
    try {
        const comment = await comments_1.createComment(req.body.comment.body, req.params.slug);
        res.status(201).json({ comment });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not add comment!", err.message]
            }
        });
    }
});
// GET /api/articles/:slug/comments    Get all comments of an article
route.get("/:slug/comments", auth_1.authByToken, async (req, res) => {
    try {
        const comments = await comments_1.getCommentBySlug(req.params.slug);
        res.status(200).json({ comments });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not find any comments!", err.message]
            }
        });
    }
});
// DELETE /api/articles/:slug/comments/:id    Delete a comment
route.delete("/:slug/comments/:id", auth_1.authByToken, async (req, res) => {
    try {
        const comment = await comments_1.deleteComment(req.params.slug, req.params.id);
        res.status(200).json({ comment });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not find any comments!", err.message]
            }
        });
    }
});
// POST /api/articles/:slug/favourite    Favourite an article
route.post("/:slug/favourite", auth_1.authByToken, async (req, res) => {
    try {
        const favourite = await favourite_1.addFavourite(req.params.slug, req.user.email);
        res.status(201).json({ favourite });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        });
    }
});
// DELETE /api/articles/:slug/favourite    Unfavourite an article
route.delete("/:slug/favourite", auth_1.authByToken, async (req, res) => {
    try {
        const favourite = await favourite_1.removeFavourite(req.params.slug, req.user.email);
        res.status(201).json({ favourite });
    }
    catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        });
    }
});
exports.articlesRoute = route;
