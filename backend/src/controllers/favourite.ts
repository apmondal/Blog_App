import { getRepository } from "typeorm";
import { Article } from "../entities/Article";
import { User } from "../entities/User";
import { sanitizeArticle, sanitizeField } from "../utils/security";

export async function addFavourite(slug: string, userEmail: string): Promise<Article> {
    try {
        const articleRepo = getRepository(Article);
        const userRepo = getRepository(User);
        
        const articleLink = await articleRepo.findOne(slug, {relations: ["favouriteUsers"]});
        const user = await userRepo.findOne(userEmail);

        if(!user) throw new Error("User is not present!");
        if(!articleLink) throw new Error("Article is not present!");

        articleLink.favouriteUsers.forEach(user => {
            sanitizeField(user);
            if(user.email === userEmail) throw new Error("Article is already favourited!");
        })

        articleLink.favouriteUsers.push(user);

        const articles = await articleRepo.save(articleLink);

        return articles;

    } catch (err) {
        throw err;
    }
}

export async function removeFavourite(slug: string, userEmail: string): Promise<Article> {
    try {
        const articleRepo = getRepository(Article);
        const userRepo = getRepository(User);
        
        const articleLink = await articleRepo.findOne(slug, {relations: ["favouriteUsers"]});
        const user = await userRepo.findOne(userEmail);

        if(!user) throw new Error("User is not present!");
        if(!articleLink) throw new Error("Article is not present!");

        var f = 0;

        articleLink.favouriteUsers.forEach((user, ind) => {
            if(user.email === userEmail) articleLink.favouriteUsers.splice(ind, 1), f = 1;
        })

        if(!f) throw new Error("Article is already unfavourited!");
        
        const articles = await articleRepo.save(articleLink);

        return articles;

    } catch (err) {
        throw err;
    }
}
