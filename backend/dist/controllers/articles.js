"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArticleOfAUser = exports.getArticlesBySlug = exports.getFeedArticles = exports.getAllArticles = exports.updateArticle = exports.deleteArticle = exports.createArticle = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("../entities/Article");
const User_1 = require("../entities/User");
const security_1 = require("../utils/security");
const stringutils_1 = require("../utils/stringutils");
async function createArticle(data, email) {
    // Data validation
    if (!data.title)
        throw new Error("Article title missing!");
    if (!data.description)
        throw new Error("Article description missing!");
    if (!data.body)
        throw new Error("Article body missing!");
    const articleRepo = typeorm_1.getRepository(Article_1.Article);
    const userRepo = typeorm_1.getRepository(User_1.User);
    try {
        // Find out the author object
        const user = await userRepo.findOne(email);
        if (!user)
            throw new Error("User does not exist!");
        const article = await articleRepo.save(new Article_1.Article(stringutils_1.slugify(data.title), data.title, data.description, data.body, security_1.sanitizeField(user)));
        return article;
    }
    catch (err) {
        throw err;
    }
}
exports.createArticle = createArticle;
async function deleteArticle(slug) {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const article = await articleRepo.findOne(slug);
        if (!article)
            throw new Error("Article doesn't exist!");
        await articleRepo.delete(slug);
        return article;
    }
    catch (err) {
        throw err;
    }
}
exports.deleteArticle = deleteArticle;
async function updateArticle(data, slug) {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const article = await articleRepo.findOne(slug, { relations: ["author"] });
        if (!article)
            throw new Error("Article doesnot exist!");
        if (data.body)
            article.body = data.body;
        if (data.description)
            article.description = data.description;
        if (data.title) {
            article.title = data.title;
            article.slug = stringutils_1.slugify(data.title);
        }
        article.lastUpdatedAt = new Date;
        const newArticle = await articleRepo.update(slug, article);
        // console.log(newArticle);
        return article;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
exports.updateArticle = updateArticle;
async function getAllArticles() {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const articles = await articleRepo.find({ relations: ["author"] });
        security_1.sanitizeArticle(articles);
        return articles;
    }
    catch (err) {
        throw err;
    }
}
exports.getAllArticles = getAllArticles;
async function getFeedArticles(email) {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const articles = await articleRepo.find({ relations: ["favouriteUsers"] });
        var favouritedArticles = [articles[-1]];
        articles.forEach(article => {
            article.favouriteUsers.forEach(user => {
                if (user.email === email) {
                    security_1.sanitizeField(user);
                    favouritedArticles.push(article);
                }
            });
        });
        return favouritedArticles;
    }
    catch (err) {
        throw err;
    }
}
exports.getFeedArticles = getFeedArticles;
async function getArticlesBySlug(slug) {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const userRepo = typeorm_1.getRepository(User_1.User);
        const article = await articleRepo.findOne(slug, { relations: ["author"] });
        const user = await userRepo.findOne(article === null || article === void 0 ? void 0 : article.author);
        if (!article)
            throw new Error("Article not present in database!");
        console.log("(------------------------------------------------------------------------);");
        console.log(article.author);
        console.log("(========================================================================);");
        article.author = security_1.sanitizeField(user);
        console.log(article.author);
        console.log("(++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++);");
        return article;
    }
    catch (err) {
        throw err;
    }
}
exports.getArticlesBySlug = getArticlesBySlug;
async function getAllArticleOfAUser(username) {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const userRepo = typeorm_1.getRepository(User_1.User);
        const user = await userRepo.findOne({ where: [{ username }], relations: ["articles"] });
        if (!user)
            throw new Error("User does not exist!");
        const articles = user.articles;
        return articles;
    }
    catch (err) {
        throw err;
    }
}
exports.getAllArticleOfAUser = getAllArticleOfAUser;
