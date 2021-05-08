import { Link } from "react-router-dom";
import {Cookies, useCookies} from "react-cookie";
import Articles from "../../components/articles/Articles";
import TrendingArticle from "../../components/trendingArticle/TrendingArticle";
import "./Home.scss"

const Home = () => {
    const tags = ["tag1", "tag2", "tag3", "tag4", "tag1", "tag2", "tag3", "tag4"];

    const value = (props) => {
        console.log(tags[props.target.id]);
    }

    const cookies = new Cookies();
    const cookie = cookies.get("Token");
    console.log(cookie);

    const start = (cookie)? "Logout": "Let's Start";

    const allTags = tags.map((tag, index) => <p id={index} onClick={value}>{tag}</p>)

    var [oldCookies, setCookies, removeCookies] = useCookies();

    const rmvCookies = () => {
        removeCookies("Token");
    }

    return (
        <>
            <div className="home_field">
                <div className="navbar">
                    <img src="media/Blog App-logos.jpeg" alt="App-Logo" />
                    {(start === "Let's Start")? <Link className="login" to="/login">{start}</Link>: <Link className="login" to="/" onClick={rmvCookies}>{start}</Link>}
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
                        <p>Articles</p>
                        <div className="articles_below_trending">
                            <Articles />
                            <Articles />
                        </div>
                    </div>
                    <div className="col-15">
                        <p>All Tags:</p>
                        <div className="tags">{allTags}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
