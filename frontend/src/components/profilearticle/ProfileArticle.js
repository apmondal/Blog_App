import { Link } from "react-router-dom";
import "./ProfileArticle.scss"

const ProfileArticle = (props) => {
    const data = props.data;
    const title = data.title;
    const description = data.description;
    const updateDate = data.lastUpdatedAt;
    const date = updateDate.substring(0, 10);
    const tags = ["tag1", "tag2", "tag3", "tag4", "tag1", "tag2", "tag3", "tag4"];

    const value = (props) => {
        console.log(tags[props.target.id]);
    }

    const allTags = tags.map((tag, index) => <p id={index} onClick={value}>{tag}</p>)
    return (
        <>
            <div className="profile_article_box">
                <Link title={title} className="title">{title}</Link><br />
                <Link className="description">{description}</Link>
                <p className="all_tags">{allTags}</p>
                <div className="date_image">
                    <p className="update_date">Last updated in: {date}</p>
                    <div className="images">
                        {props.flag? null : 
                        <>
                            <img src="media/like.png" alt="like"/>
                            <img className="unlike" src="media/like.png" alt="unlike"/>
                        </>
                        }
                        <img src="media/heart.png" alt="favourite"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileArticle;
