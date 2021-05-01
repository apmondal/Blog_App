import { Any, getRepository } from "typeorm";
import { Article } from "../entities/Article";
import { User } from "../entities/User";
import { sanitizeArticle, sanitizeField } from "../utils/security";
import { slugify } from "../utils/stringutils";

interface ArticleData {
    slug: string
    title: string
    description: string
    body:string
}

export async function createArticle(data: ArticleData, email: string): Promise<Article> {

    // Data validation
    if(!data.title) throw new Error("Article title missing!");
    if(!data.description) throw new Error("Article description missing!");
    if(!data.body) throw new Error("Article body missing!");

    const articleRepo = getRepository(Article);
    const userRepo = getRepository(User);

    try {
        // Find out the author object
        const user = await userRepo.findOne(email);
        if(!user) throw new Error("User does not exist!");

        const article = await articleRepo.save(new Article(
            slugify(data.title),
            data.title,
            data.description,
            data.body,
            sanitizeField(user)
        ))

        return article;
    } catch (err) {
        throw err;
    }
}

export async function deleteArticle(slug: string): Promise<Article> {
    try {
        const articleRepo = getRepository(Article);
        const article = await articleRepo.findOne(slug);
        
        if(!article) throw new Error("Article doesn't exist!");

        await articleRepo.delete(slug);

        return article;
        
    } catch (err) {
        throw err;
    }
}

export async function updateArticle(data: ArticleData, slug: string): Promise<Article> {
    
    try {
        
        const articleRepo = getRepository(Article);
        const article = await articleRepo.findOne(slug, {relations: ["author"]});

        if(!article) throw new Error("Article doesnot exist!");


        if(data.body) article.body = data.body;
        if(data.description) article.description = data.description;
        if(data.title) {
            article.title = data.title;
            article.slug = slugify(data.title);
        }
        article.lastUpdatedAt = new Date;

        const newArticle = await articleRepo.update(slug, article);

        // console.log(newArticle);


        return article;

    } catch (err) {
        console.log(err);
        
        throw err;
    }
}

export async function getAllArticles(): Promise<Article[]> {
    try {
        const articleRepo = getRepository(Article);
        const articles = await articleRepo.find({relations: ["author"]});

        sanitizeArticle(articles);

        return articles;
    } catch (err) {
        throw err;
    }
}

export async function getFeedArticles(email: string): Promise<Article[]> {
    try {
        const articleRepo = getRepository(Article);
        const articles = await articleRepo.find({relations: ["favouriteUsers"]});

        var favouritedArticles = [articles[-1]];

        articles.forEach(article => {
            article.favouriteUsers.forEach(user => {
                if(user.email === email) {
                    sanitizeField(user);
                    favouritedArticles.push(article);
                }
            })
        })

        return favouritedArticles;
    } catch (err) {
        throw err;
    }
}

export async function getArticlesBySlug(slug: string): Promise<Article> {
    try {
        const articleRepo = getRepository(Article);
        const userRepo = getRepository(User);

        const article = await articleRepo.findOne(slug, {relations: ["author"]});
        const user = await userRepo.findOne(article?.author);

        if(!article) throw new Error("Article not present in database!");

        console.log("(------------------------------------------------------------------------);");
        console.log(article.author);
        console.log("(========================================================================);");
        
        article.author = sanitizeField(user);
        console.log(article.author);
        console.log("(++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++);");
        
        

        return article;
    } catch (err) {
        throw err;
    }
}

export async function getAllArticleOfAUser(username: string): Promise<Article[]> {
    try {
        const articleRepo = getRepository(Article);
        const userRepo = getRepository(User);

        const user = await userRepo.findOne({where: [{username}], relations: ["articles"]});

        if(!user) throw new Error("User does not exist!");

        const articles = user.articles;

        return articles;
    } catch (err) {
        throw err;
    }
}
