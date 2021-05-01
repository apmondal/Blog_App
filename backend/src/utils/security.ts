import { Article } from "../entities/Article";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";

export function sanitizeField(user?: User) {
    if(user?.password) delete user.password;
    return  user
}

export function sanitizeArticle(articles: Article[]) {
    for (var i = 0; i < articles.length; i++) {
        sanitizeField(articles[i].author);
    }
}

export function sanitizeComment(comments: Comment[]) {
    for (var i = 0; i < comments.length; i++) {
        sanitizeField(comments[i].author);
    }
}
