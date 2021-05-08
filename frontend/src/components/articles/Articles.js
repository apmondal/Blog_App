import { Link } from "react-router-dom";
import "./Articles.scss"

const Articles = () => {
    const title = "Apurba";
    const authorName = "Apurba";
    const date = "06 Apr 2000"
    const tags = ["tag1", "tag2", "tag3", "tag4", "tag1", "tag2", "tag3", "tag4"];

    const value = (props) => {
        console.log(tags[props.target.id]);
    }

    const allTags = tags.map((tag, index) => <p id={index} onClick={value}>{tag}</p>)

    return (
        <>
            <div className="article_box">
                <Link title={title} className="title">Title</Link><br />
                <Link className="description">Description</Link>
                <p className="all_tags">{allTags}</p>
                <Link className="author">Written by {authorName}</Link>
                <div className="date_image">
                    <p className="update_date">Last updated in: {date}</p>
                    <div className="images">
                        <img src="media/like.png" alt="like"/>
                        <img className="unlike" src="media/like.png" alt="unlike"/>
                        <img src="media/heart.png" alt="favourite"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Articles;
