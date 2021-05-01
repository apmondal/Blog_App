"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getCommentBySlug = exports.createComment = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("../entities/Article");
const Comment_1 = require("../entities/Comment");
const User_1 = require("../entities/User");
const security_1 = require("../utils/security");
async function createComment(data, slug) {
    try {
        if (!data)
            throw new Error("Data missing!");
        const commentRepo = typeorm_1.getRepository(Comment_1.Comment);
        const userRepo = typeorm_1.getRepository(User_1.User);
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const article = await articleRepo.findOne(slug);
        if (!article)
            throw new Error("Article does not exist!");
        const user = await userRepo.findOne(article.author);
        if (!user)
            throw new Error("User does not exist!");
        const comment = await commentRepo.save({
            slug: slug,
            body: data,
            author: security_1.sanitizeField(user)
        });
        return comment;
    }
    catch (err) {
        throw err;
    }
}
exports.createComment = createComment;
async function getCommentBySlug(slug) {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const commentRepo = typeorm_1.getRepository(Comment_1.Comment);
        const article = await articleRepo.findOne(slug);
        if (!article)
            throw new Error("Article does not exist!");
        const comments = await commentRepo.find({ relations: ["author"] });
        if (!comments)
            throw new Error("No comments!");
        security_1.sanitizeComment(comments);
        return comments;
    }
    catch (err) {
        throw err;
    }
}
exports.getCommentBySlug = getCommentBySlug;
async function deleteComment(slug, id) {
    try {
        const commentRepo = typeorm_1.getRepository(Comment_1.Comment);
        const comment = await commentRepo.findOne({ where: [{ slug, id }] });
        if (!comment)
            throw new Error("Comment doesn't exist!");
        await commentRepo.delete(id);
        return comment;
    }
    catch (err) {
        throw err;
    }
}
exports.deleteComment = deleteComment;
