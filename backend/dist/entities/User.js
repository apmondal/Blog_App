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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("./Article");
let User = User_1 = class User {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ default: "abc" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    typeorm_1.OneToMany(() => Article_1.Article, (article) => article.author),
    __metadata("design:type", Array)
], User.prototype, "articles", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Article_1.Article, (article) => article.favouriteUsers),
    __metadata("design:type", Array)
], User.prototype, "favouriteArticles", void 0);
__decorate([
    typeorm_1.ManyToMany(() => User_1),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "follower", void 0);
__decorate([
    typeorm_1.ManyToMany(() => User_1),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
User = User_1 = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
