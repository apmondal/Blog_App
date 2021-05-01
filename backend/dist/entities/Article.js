"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Article_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Article = Article_1 = class Article {
    constructor(slug, title, description, body, author) {
        this.slug = slug;
        this.title = title;
        this.description = description;
        this.body = body;
        this.author = author;
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ length: 30 }),
    __metadata("design:type", String)
], Article.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ length: 60 }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Article.prototype, "body", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Article.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Article.prototype, "lastUpdatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.articles, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", User_1.User)
], Article.prototype, "author", void 0);
__decorate([
    typeorm_1.ManyToMany(() => User_1.User, (user) => user.favouriteArticles),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Article.prototype, "favouriteUsers", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Article_1),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Article.prototype, "tags", void 0);
Article = Article_1 = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, String, String, String, User_1.User])
], Article);
exports.Article = Article;
