
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom"
import "./login.css";


export const Login=()=> {
    const [form,setForm] = useState({})
    const{token, handleToken} = useContext(AuthContext)

    const handleChange = ({target:{name,value}})=>{
        setForm({
            ...form,
            [name]:value
        })
        console.log(form)
    }

    const navigate = useNavigate()

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img style={{marginLeft:"2%",width:"100%",height:"100%"}} src="https://www.gpbirlaedufoundation.com/images/Login.jpg" alt="" />
        </div>
        <div className="loginRight">
          <div className="loginBox" >
            <input
              placeholder="Email"
              type="email"
              name="email"
              required
              className="loginInput"
              onChange={handleChange}
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              required
              minLength="6"
              className="loginInput"
              onChange={handleChange}
            />
            <button className="loginButton" onClick={()=>{
              fetch("https://twitter-backend1.herokuapp.com/login",{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(form)
              })
              .then(res => res.json())
              .then(res => {if(res.status === "passed"){
                handleToken(res)
                console.log(res)
                localStorage.setItem("email", res.user.name);
                navigate("/list")
              }else{
                alert("wrong login details")
              }})
            }}>Login</button>
            <button className="signupButton" onClick={()=>{navigate("/signup")}}>Sign Up</button>
            <span className="loginForgot">Forgot Password?</span>
          </div>
        </div>
      </div>
    </div>
  );
}