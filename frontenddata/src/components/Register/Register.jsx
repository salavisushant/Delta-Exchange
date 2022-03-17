import { useContext, useRef } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
    
import { useNavigate } from "react-router-dom"

export const Register=()=> {
  const userName = useRef()
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const{token, handleToken} = useContext(AuthContext)
const navigate = useNavigate()
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(passwordAgain.current.value, password.current.value)
    if (passwordAgain.current.value !== password.current.value) {
      alert("Passwords don't match!");
    } else {
      const user = {
        name: name.current.value,
        username:userName.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      console.log(user)
      fetch("https://twitter-backend1.herokuapp.com/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "content-type": "application/json" }
      }).then((res) => 
        res.json()
      ).then((res) =>  {
        if(res.status === "passed"){
        handleToken(res)
        navigate("/login")
      }else if(res.message === " Please provide a different email address"){
        alert("Please provide a different email address")
      }else{
        alert("Enter correct details")
      }})
    }
  }
    
  
     

  return (
    <div className="login">
      <div className="loginWrapper">
         <div className="loginLeft">
            <img style={{marginLeft:"1%",width:"100%",height:"100%"}} src="https://thumbs.dreamstime.com/b/text-sign-showing-register-now-conceptual-photo-name-official-list-enlist-to-be-member-up-digital-arrowhead-curve-business-209738185.jpg" alt="" />
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
          <input
              placeholder="User Name"
              required
              ref={userName}
              className="loginInput"
            />
            <input
              placeholder="Name"
              required
              ref={name}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button onClick={()=>navigate("/login")} className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
