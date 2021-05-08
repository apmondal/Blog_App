import axios from "axios";
import { useEffect, useState } from "react";
import {Cookies} from "react-cookie";
import { useHistory, useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import ProfileArticle from "../../components/profilearticle/ProfileArticle";
import Article from "../articlepage/Article";
import "./Profile.scss"

const Profile = () => {
    const {username} = useParams();
    const history = useHistory();
    const url = "http://localhost:4000/api/profile/" + username;
    const url0 = "http://localhost:4000/api/user";
    const urledit = "http://localhost:4000/api/user";
    const article = "http://localhost:4000/api/user/" + username;
    
    const cookies = new Cookies();
    const token = cookies.get("Token");

    const [details, setup] = useState({
        name: "",
        username: "",
        bio: "",
        email: ""
    })

    const [details0, setup0] = useState({
        name: "",
        username: "",
        bio: "",
        email: ""
    })

    const [articleData, allArticle] = useState([]);
    
    const [followed, setFollow] = useState("Follow");

    useEffect(() => {
        axios.get(url, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            const data = res.data.user;
            //console.log(data);
            setup(() => {
                return {
                    name: data.name,
                    username: data.username,
                    bio: data.bio,
                    email: data.email
                }
            })
        }).catch(err => {
            // if(err.response.data.errors.body.length > 1) alert(err.response.data.errors.body[0] + " " + err.response.data.errors.body[1])
            // else alert(err.response.data.errors.body[0]);
            history.push("/error");
        })

        axios.get(url0, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            const data = res.data.user;
            //console.log(data);
            setup0(() => {
                return {
                    name: data.name,
                    username: data.username,
                    bio: data.bio,
                    email: data.email
                }
            })
        }).catch(err => {
            // if(err.response.data.errors.body.length > 1) alert(err.response.data.errors.body[0] + " " + err.response.data.errors.body[1])
            // else alert(err.response.data.errors.body[0]);
            history.push("/error");
        })

        axios.get(article, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            allArticle(res.data.articles);
        }).catch(err => {
            console.log(err);
        })

    },[])

    const [flag, changeState] = useState(false);
    
    const show = () => {
        changeState(true);
    }

    const [editDetails, setEdit] = useState({
        name: "",
        bio: ""
    })

    const hide = () => {
        changeState(false);
    }

    const updateVal = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setEdit((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })
    }

    const submit = (event) => {
        event.preventDefault();
        axios.patch(urledit,{
            user: {
                name: editDetails.name,
                bio: editDetails.bio
            }
        }, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            const data = res.data.user;
            setup(() => {
                return {
                    name: data.name,
                    bio: data.bio
                }
            })
            console.log(data);
        }).then(() => {
            changeState(false);
            window.location.reload();
        }).catch(err => {
            console.log(err);
        })
    }

    const callIndex = (props) => {
        return (<Article/>)
    }

    const allArticles = articleData.map((article, index) => <NavLink to={"/article/" + article.slug} onClick={callIndex}><ProfileArticle data = {article} flag = {(details.email === details0.email)}/></NavLink>)

    const follow = () => {
        const urlFollow = "http://localhost:4000/api/profile/" + details.username + "/follow";
        if(followed === "Follow") {
            axios.post(urlFollow, {}, {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                setFollow("Unfollow");
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            axios.delete(urlFollow, {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                setFollow("Follow");
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <>
            <div className="main_box">
                <div className="profile_box">
                    <img src="media/author.png" alt="pic"/>
                    <h3 className="name">{details.name}</h3>
                    <p className="username">{details.username}</p>
                    <p className="email">{details.email}</p>
                    <p className="bio">{details.bio}</p>
                    {(details.email !== details0.email)? <button className="follow" onClick={follow}>{followed}</button> : <button className="edit_button" onClick={show}>Edit your profile</button>}
                    {flag?
                    <div className="hidden">
                        <h3 className="edit_profile">Edit your profile</h3>
                        <form className="edit_profile_form" onSubmit={submit}>
                            <p>Profile image</p>
                            <input type="file" name="image"/>
                            <p>Name</p>
                            <input type="text" name="name" onChange={updateVal}/>
                            <p>Bio</p>
                            <textarea name="bio" onChange={updateVal}/><br/>
                            <button type="submit" className="edit_submit">Submit</button>
                        </form>
                    </div> : null}
                </div>
                <div className="detail_box">
                    <div className="profile_navbar">
                        <p>My Articles</p>
                        <p>Followers</p>
                        <p>Followings</p>
                    </div>
                    <div className="content">
                        {allArticles}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
