import { Link } from "react-router-dom";
import "./TrendingArticle.scss"

const TrendingArticle = () => {

    const date = "06 Apr 2000";
    return (
        <>
            <div className="trending_box">
                <div className="articles">
                    <Link className="title">Titlelivhsegiuvgseud rgbvuk dzygvbzdivyhebkuybveyrhvbekuyvheluyvbwelvukyhweckuvybwkeucyvwe lu</Link>
                    <div className="author">
                        <img src="media/author.png" alt="author"/>
                        <Link className="author_name">Author Name</Link>
                    </div>
                    <p>Last updated:  {date}</p>
                </div>
            </div>
        </>
    )
}

export default TrendingArticle;
