import { Link } from "react-router-dom";
import Articles from "../../components/articles/Articles";
import TrendingArticle from "../../components/trendingArticle/TrendingArticle";
import "./Home.scss"

const Home = () => {
    const start = "Let's start";

    const tags = ["tag1", "tag2", "tag3", "tag4", "tag1", "tag2", "tag3", "tag4"];

    const value = (props) => {
        console.log(tags[props.target.id]);
    }

    const yo = tags.map((tag, index) => <p id={index} onClick={value}>{tag}</p>)

    return (
        <>
            <div className="home_field">
                <div className="navbar">
                    <img src="media/Blog App-logos.jpeg" alt="App-Logo" />
                    <Link className="login" to="/login">{start}</Link>
                </div>
                <p>Trendings</p>
                <div className="table">
                    <div className="col-85">
                        <div className="flexBox">
                            <TrendingArticle />
                            <TrendingArticle />
                            <TrendingArticle />
                            <TrendingArticle />
                            <TrendingArticle />
                        </div>
                        <div className="articles_below_trending">
                            <Articles />
                        </div>
                    </div>
                    <div className="col-15">
                        <p>All Tags:</p>
                        <div className="tags">{yo}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
