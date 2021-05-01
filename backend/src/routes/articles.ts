import { Router } from "express";
import { createArticle, deleteArticle, getAllArticles, getArticlesBySlug, getFeedArticles, updateArticle } from "../controllers/articles";
import { createComment, deleteComment, getCommentBySlug } from "../controllers/comments";
import { addFavourite, removeFavourite } from "../controllers/favourite";
import { authByToken } from "../middleware/auth";

const route = Router();

// GET /api/articles    List articles
route.get("/", async (req, res) => {
    try {
        const articles = await getAllArticles();
        res.status(200).json({articles});
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ["No article found!", err.message]
            }
        })
    }
})

// GET /api/articles/feed   Feed articles for given user
route.get("/feed", authByToken, async (req, res) => {
    try {
        const articles = await getFeedArticles((req as any).user.email);
        res.status(200).json({articles})
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Article doesn't exist!", err.message]
            }
        })
    }
})

// GET /api/articles/:slug  Get a single article
route.get("/:slug", async (req, res) => {
    try {
        const article = await getArticlesBySlug(req.params.slug);
        res.status(200).json({article})
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Article doesn't exist!", err.message]
            }
        })
    }
})

// POST /api/article    Create an article
route.post("/", authByToken, async (req, res) => {
    try {
        const article = await createArticle(req.body.article, (req as any).user.email);
        res.status(201).json({article});

    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not create article!", err.message]
            }
        })
    }
})

// PATCH /api/articles/:slug    Update an article
route.patch("/:slug", authByToken, async (req, res) => {
    try {
        const article = await updateArticle(req.body.article, req.params.slug);
        res.status(200).json({article});
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not found article!", err.message]
            }
        })
    }
})

// DELETE /api/articles/:slug   Delete an article
route.delete("/:slug", authByToken, async (req, res) => {
    try {
        const article = await deleteArticle(req.params.slug);
        res.status(200).json({article});

    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Article could not found!", err.message]
            }
        })
    }
})

// POST /api/articles/:slug/comments    Add a comment
route.post("/:slug/comments", authByToken, async (req, res) => {
    try {
        const comment = await createComment(req.body.comment.body, req.params.slug);
        res.status(201).json({comment});
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not add comment!", err.message]
            }
        })
    }
})

// GET /api/articles/:slug/comments    Get all comments of an article
route.get("/:slug/comments", authByToken, async (req, res) => {
    try {
        const comments = await getCommentBySlug(req.params.slug);
        res.status(200).json({comments});

    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not find any comments!", err.message]
            }
        })
    }
})

// DELETE /api/articles/:slug/comments/:id    Delete a comment
route.delete("/:slug/comments/:id", authByToken, async (req, res) => {
    try {
        const comment = await deleteComment(req.params.slug, (req as any).params.id);
        res.status(200).json({comment});
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ["Could not find any comments!", err.message]
            }
        })
    }
})

// POST /api/articles/:slug/favourite    Favourite an article
route.post("/:slug/favourite", authByToken, async (req, res) => {
    try {
        const favourite = await addFavourite(req.params.slug, (req as any).user.email);

        res.status(201).json({favourite});

    } catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        })
    }
})

// DELETE /api/articles/:slug/favourite    Unfavourite an article
route.delete("/:slug/favourite", authByToken, async (req, res) => {
    try {
        const favourite = await removeFavourite(req.params.slug, (req as any).user.email);

        res.status(201).json({favourite});

    } catch (err) {
        return res.status(422).json({
            errors: {
                body: [err.message]
            }
        })
    }
})

export const articlesRoute = route;
