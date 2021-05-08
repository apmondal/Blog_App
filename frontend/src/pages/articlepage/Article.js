import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Article.scss"

const Article = () => {
    const {slug} = useParams();
    const url = "http://localhost:4000/api/articles/" + slug;

    const [article, setArticle] = useState({
        title: "",
        description: "",
        author: "",
        createDate: "",
        updateDate: ""
    });

    useEffect(() => {
        axios.get(url).then((res) => {
            const data = res.data.article;
            setArticle(() => {
                return {
                    title: data.title,
                    description: data.description,
                    author: data.author.name,
                    createDate: data.createdAt,
                    updateDate: data.lastUpdatedAt
                }
            })

            console.log(data);
        })
    },[])
    

    return (
        <>
            <div className="articlepage_box">
                <div className="title_bar">
                    <p className="title">{article.title}</p>
                    <div className="activity">
                        <div className="activity_image">
                            <img src="media/like.png" alt="like"/>
                            <img className="unlike" src="media/like.png" alt="unlike"/>
                            <img className="favourite" src="media/heart.png" alt="favourite"/>
                        </div><br></br><br /><br /><br />
                        <p className="author">Author: {article.author}</p>
                        <p className="createdat">Created At: {article.createDate.substring(0, 10)}</p>
                        <p className="updatedat">Last Updated At: {article.updateDate.substring(0, 10)}</p>
                    </div>
                </div>
                <p className="description">{article.description}</p>
            </div>
        </>
    )
}

export default Article;
