import Axios from "axios";
import { useState } from "react";
import {Cookies} from "react-cookie";
import { useHistory } from "react-router";
import "./InputArticle.scss"

const InputArticle = () => {
    const url = "http://localhost:4000/api/articles";

    const history = useHistory();
    const [article, setArticle] = useState({
        title: "",
        description: ""
    })

    const updateValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setArticle((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })
    }

    const cookies = new Cookies();
    const token = cookies.get("Token");

    const onSubmit =(event) => {
        event.preventDefault();
        Axios.post(url, {
            article: {
                title: article.title,
                description: article.description,
                body: article.description
            }
        }, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            alert("Successfully created ur Article!");
            console.log(res.data);
            history.goBack();
        }).catch(err => {
            console.log(err);
            console.log(token);
        })
    }
    return (
        <>
            <div className="input_articlebox">
                <form className="create_article_form" onSubmit={onSubmit}>
                    <p className="title">Title</p>
                    <textarea className="title_area" name="title" onChange={updateValue} required/>
                    <p className="description">Description</p>
                    <textarea className="description_area" name="description" onChange={updateValue} required/><br/>
                    <button className="submit_article" type="submit">Create</button>
                </form>
            </div>
        </>
    )
}

export default InputArticle;
