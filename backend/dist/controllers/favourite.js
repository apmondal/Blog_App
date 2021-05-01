"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavourite = exports.addFavourite = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("../entities/Article");
const User_1 = require("../entities/User");
const security_1 = require("../utils/security");
async function addFavourite(slug, userEmail) {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const userRepo = typeorm_1.getRepository(User_1.User);
        const articleLink = await articleRepo.findOne(slug, { relations: ["favouriteUsers"] });
        const user = await userRepo.findOne(userEmail);
        if (!user)
            throw new Error("User is not present!");
        if (!articleLink)
            throw new Error("Article is not present!");
        articleLink.favouriteUsers.forEach(user => {
            security_1.sanitizeField(user);
            if (user.email === userEmail)
                throw new Error("Article is already favourited!");
        });
        articleLink.favouriteUsers.push(user);
        const articles = await articleRepo.save(articleLink);
        return articles;
    }
    catch (err) {
        throw err;
    }
}
exports.addFavourite = addFavourite;
async function removeFavourite(slug, userEmail) {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const userRepo = typeorm_1.getRepository(User_1.User);
        const articleLink = await articleRepo.findOne(slug, { relations: ["favouriteUsers"] });
        const user = await userRepo.findOne(userEmail);
        if (!user)
            throw new Error("User is not present!");
        if (!articleLink)
            throw new Error("Article is not present!");
        var f = 0;
        articleLink.favouriteUsers.forEach((user, ind) => {
            if (user.email === userEmail)
                articleLink.favouriteUsers.splice(ind, 1), f = 1;
        });
        if (!f)
            throw new Error("Article is already unfavourited!");
        const articles = await articleRepo.save(articleLink);
        return articles;
    }
    catch (err) {
        throw err;
    }
}
exports.removeFavourite = removeFavourite;
