import "./Login.scss"
import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios"


const Login = () => {

    const url = "http://localhost:4000/api/users/login";

    const [data, setData] = useState({
        username: "",
        password: "",
        checkbox: "off"
    })

    const updateValue = (event) => {
        const name = event.target.name;
        var value = event.target.value;

        setData((preValue) => {
            if(name === "checkbox" && preValue.checkbox === "on") value = "off";
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
            console.log(res.data);
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
