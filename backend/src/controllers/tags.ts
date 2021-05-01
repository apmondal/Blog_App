import { getRepository } from "typeorm";
import { Article } from "../entities/Article";

export async function addTags(slug: string, tags: string[]): Promise<Article> {
    try {
        const articleRepo = getRepository(Article);
        const article = await articleRepo.findOne(slug, {relations: ["tags"]});

        if(!article) throw new Error("Article is not present!");

        tags.forEach((tag1) => {
            var f = 0;
            article.tags.forEach((tag2) => {
                if(tag1 === tag2) f = 1;
            })
            if(!f) article.tags.push(tag1);
            else console.log(tag1 + " is already present!");
            
        });

        console.log(article.tags);
        const articleWithTags = await articleRepo.save(article);

        return articleWithTags;
    } catch (err) {
        throw err;
    }
}

export async function deleteTags(slug: string, tag: string): Promise<Article> {
    try {
        const articleRepo = getRepository(Article);
        const article = await articleRepo.findOne(slug, {relations: ["tags"]});

        if(!article) throw new Error("Article is not exist!");

        article.tags.filter(tag => tag);

        return article;
    } catch (err) {
        throw err;
    }
}

export async function getTagsBySlug(slug: string): Promise<Article> {
    try {
        const articleRepo = getRepository(Article);
        const article = await articleRepo.findOne(slug, {relations: ["tags"]});

        if(!article) throw new Error("Article is not exist!");

        if(!article.tags.length) throw new Error("Article doesn't have any tag!");

        //console.log(article.tags);
        

        return article;
    } catch (err) {
        throw err;
    }
}
