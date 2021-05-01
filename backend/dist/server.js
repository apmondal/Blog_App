"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Article_1 = require("./entities/Article");
const Comment_1 = require("./entities/Comment");
const Tag_1 = require("./entities/Tag");
const User_1 = require("./entities/User");
const article_1 = require("./routes/article");
const articles_1 = require("./routes/articles");
const profile_1 = require("./routes/profile");
const user_1 = require("./routes/user");
const users_1 = require("./routes/users");
var cookieParser = require('cookie-parser');
var cors = require('cors');
const app = express_1.default();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(cookieParser());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello Apurba!");
});
app.use("/api/users", users_1.usersRoute);
app.use("/api/user", user_1.userRoute);
app.use("/api/articles", articles_1.articlesRoute);
app.use("/api/profile", profile_1.profileRoute);
app.use("/api/article", article_1.articleRoute);
async function start() {
    await typeorm_1.createConnection({
        type: "postgres",
        username: "conduit",
        password: "conduit",
        database: "conduit",
        entities: [Article_1.Article, User_1.User, Comment_1.Comment, Tag_1.Tag],
        synchronize: true,
        //dropSchema: true,
        logging: true,
        logger: "advanced-console"
    });
    app.listen(port, () => {
        console.log("Server started on port no: " + port + "...");
    });
}
start();
