import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        if(!username || !password){
            console.log("error")
            return
        }
        try {
          const response = await fetch('http://localhost:3003/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
          });
          const result = await response.json();
          if(result.login){
            navigate("/")
            window.location.reload();
          }else{
            console.error(result)
            //hnadle error of not being logged in
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
    }

    return(
        <div>
            <Navbar currentUser = {true}/>
            <div className="loginPage">
                <h2>Login</h2>
                <form className="loginForm" onSubmit={(e) => handleLoginSubmit(e)}>
                    <div>
                        <h3>Username: </h3>
                        <input value={username} onChange={e => setUsername(e.target.value)}></input>
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input type = "password" value = {password} onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div><a href = '/register'>Not registered yet?</a></div>
            </div>
            <Footer/>
        </div>
    )
}

export default LoginPage;