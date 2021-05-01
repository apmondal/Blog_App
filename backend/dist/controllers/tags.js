"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTagsBySlug = exports.deleteTags = exports.addTags = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("../entities/Article");
async function addTags(slug, tags) {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const article = await articleRepo.findOne(slug, { relations: ["tags"] });
        if (!article)
            throw new Error("Article is not present!");
        tags.forEach((tag1) => {
            var f = 0;
            article.tags.forEach((tag2) => {
                if (tag1 === tag2)
                    f = 1;
            });
            if (!f)
                article.tags.push(tag1);
            else
                console.log(tag1 + " is already present!");
        });
        console.log(article.tags);
        const articleWithTags = await articleRepo.save(article);
        return articleWithTags;
    }
    catch (err) {
        throw err;
    }
}
exports.addTags = addTags;
async function deleteTags(slug, tag) {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const article = await articleRepo.findOne(slug, { relations: ["tags"] });
        if (!article)
            throw new Error("Article is not exist!");
        article.tags.filter(tag => tag);
        return article;
    }
    catch (err) {
        throw err;
    }
}
exports.deleteTags = deleteTags;
async function getTagsBySlug(slug) {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const article = await articleRepo.findOne(slug, { relations: ["tags"] });
        if (!article)
            throw new Error("Article is not exist!");
        if (!article.tags.length)
            throw new Error("Article doesn't have any tag!");
        //console.log(article.tags);
        return article;
    }
    catch (err) {
        throw err;
    }
}
exports.getTagsBySlug = getTagsBySlug;
