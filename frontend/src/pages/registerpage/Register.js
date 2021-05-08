import "./Register.scss"
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";


const Register = () => {

    const url = "http://localhost:4000/api/users";
    const history = useHistory();
    
    var [cookies, setCookies] = useCookies();

    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        cnfpassword: "",
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
        if(data.password !== data.cnfpassword) alert("Confirm password doesn't match with password");
        else {
            Axios.post(url, {
                user: {
                    name: data.name,
                    username:data.username,
                    email: data.email,
                    password: data.password,
                    checkbox: data.checkbox
                }
            }).then(res => {const token = "Token " + res.data.user.token;
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
                cookies.Token = "Token " + cookies.Token;
                history.push("/");
                console.log(res.data);
            }).catch(err => {
                if(err.response.data.errors.body.length > 1) alert(err.response.data.errors.body[0] + " " + err.response.data.errors.body[1])
                else alert(err.response.data.errors.body[0]);
            })
        }
    }

    return (
        <>
            <div className="reg_form_box">
                <div className="field_design">
                    <h3>Create account using</h3>
                </div>
                <div className="social_icons">
                    <img src="media/google.png" alt="google"/>
                    <img src="media/facebook.png" alt="facebook"/>
                    <img src="media/linkedin.png" alt="linkedin"/>
                    <img src="media/twitter.png" alt="twitter"/>
                </div>
                <form className="input_box" onSubmit={onSubmit}>
                    <input type="text" className="input_field" placeHolder="Name" name="name" onChange={updateValue} required/>
                    <input type="text" className="input_field" placeHolder="Username" name="username" onChange={updateValue} required/>
                    <input type="email" className="input_field" placeHolder="Email id" name="email" onChange={updateValue} required/>
                    <input type="password" className="input_field" placeHolder="Password" name="password" onChange={updateValue} required/>
                    <input type="password" className="input_field" placeHolder="Confirm password" name="cnfpassword" onChange={updateValue} required/>
                    <input type="checkbox" className="check_box" name="checkbox" onChange={updateValue}/><span>Remember me</span>
                    <button type="submit" className="submit_button">Register</button>
                </form>
                <div className="below_button">
                    <p className="col-95">Already have an account?
                    <Link to="/login" className="another_comp">Log in</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register;
