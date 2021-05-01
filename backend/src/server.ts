import express from "express";
import {createConnection} from "typeorm"
import { Article } from "./entities/Article";
import { Comment } from "./entities/Comment";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";
import { articleRoute } from "./routes/article";
import { articlesRoute } from "./routes/articles";
import { profileRoute } from "./routes/profile";
import { userRoute } from "./routes/user";
import { usersRoute } from "./routes/users";
var cookieParser = require('cookie-parser')
var cors = require('cors')

const app = express();
const port = process.env.PORT || 4000

app.use(cors())

app.use(cookieParser())

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Apurba!");
})

app.use("/api/users", usersRoute);
app.use("/api/user", userRoute);
app.use("/api/articles", articlesRoute);
app.use("/api/profile", profileRoute);
app.use("/api/article", articleRoute);

async function start() {
    await createConnection({
        type: "postgres",
        username: "conduit",
        password: "conduit",
        database: "conduit",
        entities: [Article, User, Comment, Tag],
        synchronize: true,
        //dropSchema: true,
        logging: true,
        logger: "advanced-console"
    })
    
    app.listen(port, () => {
        console.log("Server started on port no: " + port + "...");
    })
}

start()
