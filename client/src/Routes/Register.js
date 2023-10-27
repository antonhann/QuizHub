import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {useNavigate} from 'react-router-dom';
const Register = () => {    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    const handleLoginSubmit = async () => {
        if(!username || !password || !email){
            return
            //handle incorrect form values
        }
        let response = await fetch('http://localhost:3003/register',{
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            }),
        })
        if (!response.ok) {
            // Handle error, e.g., display an error message to the user
            console.error('Registration failed. Status:', response.status);
            return;
        }
        const result = await response.json()
        if(result.added){
            navigate('/', {replace: true});
        }else{
            console.log(result)
        }
        //implement result based off server
    }
    return (
        <div>
            <Navbar/>
            <div className="loginPage">
                <h2>Register</h2>
                <form className="loginForm">
                    <div>
                        <h3>Email: </h3>
                        <input type = "email" value={email} onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <h3>Username: </h3>
                        <input value={username} onChange={e => setUsername(e.target.value)}></input>
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input type = "password" value = {password} onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <button type="button" onClick={() => handleLoginSubmit()}>Submit</button>
                </form>
                <div><a href = '/login'>Have an account?</a></div>
            </div>
            <Footer/>
        </div>
    )
}

export default Register;