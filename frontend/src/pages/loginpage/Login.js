import "./Login.scss"
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import Axios from "axios"
import { useCookies } from "react-cookie";


const Login = () => {

    const url = "http://localhost:4000/api/users/login";
    const history = useHistory();
    var [cookies, setCookies] = useCookies();

    const [data, setData] = useState({
        username: "",
        password: "",
        checkbox: false
    })

    const updateValue = (event) => {
        const name = event.target.name;
        const value = (name === "checkbox")?event.target.checked: event.target.value;

        setData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        Axios.post(url, {
            user: {
                username: data.username,
                password: data.password,
                checkbox: data.checkbox
            }
        }).then(res => {
            const token = "Token " + res.data.user.token;
            if(data.checkbox) {
                setCookies("Token", token, {
                    expires: new Date(Date.now() + 100000000000),
                    path: "/"
                });
            }
            else {
                setCookies("Token", token, {
                    expires: new Date(Date.now() + 10000),
                    path: "/"
                });
            }
            console.log(res.data);
            // cookies.Token = "Token " + cookies.Token;
            history.goBack();
        }).catch(err => {
            if(err.response.data.errors.body.length > 1) alert(err.response.data.errors.body[0] + " " + err.response.data.errors.body[1])
            else alert(err.response.data.errors.body[0]);
        })
    }

    return (
        <>
            <div className="login_form_box">
                <div className="field_design">
                    <h3>Login using</h3>
                </div>
                <div className="social_icons">
                    <img src="media/google.png" alt="google"/>
                    <img src="media/facebook.png" alt="facebook"/>
                    <img src="media/linkedin.png" alt="linkedin"/>
                    <img src="media/twitter.png" alt="twitter"/>
                </div>
                <form className="input_box" onSubmit={onSubmit}>
                    <input type="text" className="input_field" placeHolder="username" name="username" onChange={updateValue} required/>
                    <input type="password" className="input_field" placeHolder="password" name="password" onChange={updateValue} required/>
                    <input type="checkbox" className="check_box" name="checkbox" onClick={updateValue}/><span>Remember me</span>
                    <button type="submit" className="submit_button">Log in</button>
                </form>
                <div className="below_button1">
                    <p className="col-95">Don't have an account?
                    <Link to="/register" className="another_comp">Register</Link>
                    </p>
                </div>
                <div className="below_button2">
                    <Link className="another_comp">Forgot password</Link>
                </div>
            </div>
        </>
    )
}

export default Login;
