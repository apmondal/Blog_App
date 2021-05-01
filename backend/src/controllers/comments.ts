import { getRepository } from "typeorm";
import { Article } from "../entities/Article";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { sanitizeArticle, sanitizeComment, sanitizeField } from "../utils/security";

interface CommentsData {
    body: string
}

export async function createComment(data: string, slug: string): Promise<Comment> {
    try {
        if(!data) throw new Error("Data missing!");

        const commentRepo = getRepository(Comment);
        const userRepo = getRepository(User);
        const articleRepo = getRepository(Article);

        const article = await articleRepo.findOne(slug);

        if(!article) throw new Error("Article does not exist!");

        const user = await userRepo.findOne(article.author);

        if(!user) throw new Error("User does not exist!");

        const comment = await commentRepo.save({
            slug: slug,
            body: data,
            author: sanitizeField(user)
        })

        return comment;
    } catch (err) {
        throw err;
    }
}

export async function getCommentBySlug(slug: string): Promise<Comment[]> {
    try {
        const articleRepo = getRepository(Article);
        const commentRepo = getRepository(Comment);

        const article = await articleRepo.findOne(slug);

        if(!article) throw new Error("Article does not exist!");

        const comments = await commentRepo.find({relations: ["author"]});

        if(!comments) throw new Error("No comments!");

        sanitizeComment(comments);
        
        return comments;
    } catch (err) {
        throw err;
    }
}

export async function deleteComment(slug: string, id: number): Promise<Comment> {
    try {
        const commentRepo = getRepository(Comment);
        const comment = await commentRepo.findOne({where: [{slug, id}]});

        if(!comment) throw new Error("Comment doesn't exist!");

        await commentRepo.delete(id);

        return comment;
    } catch (err) {
        throw err;
    }
}
