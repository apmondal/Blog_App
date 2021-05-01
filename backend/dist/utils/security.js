"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeComment = exports.sanitizeArticle = exports.sanitizeField = void 0;
function sanitizeField(user) {
    if (user === null || user === void 0 ? void 0 : user.password)
        delete user.password;
    return user;
}
exports.sanitizeField = sanitizeField;
function sanitizeArticle(articles) {
    for (var i = 0; i < articles.length; i++) {
        sanitizeField(articles[i].author);
    }
}
exports.sanitizeArticle = sanitizeArticle;
function sanitizeComment(comments) {
    for (var i = 0; i < comments.length; i++) {
        sanitizeField(comments[i].author);
    }
}
exports.sanitizeComment = sanitizeComment;
