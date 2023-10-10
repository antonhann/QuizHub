import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLoginSubmit = async (e) => {
        if(!username || !password){
            console.log("error")
            return
        }
        try {
          const response = await fetch('http://localhost:3004/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
          });
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //       const response = await fetch('/api/submitForm', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData),
    //       });
    
    //       const result = await response.json();
    //       console.log(result);
    //     } catch (error) {
    //       console.error('Error submitting form:', error);
    //     }
    //   };

    return(
        <div>
            <Navbar/>
            <div className="loginPage">
                <h2>Login</h2>
                <form className="loginForm">
                    <div>
                        <h3>Username: </h3>
                        <input value={username} onChange={e => setUsername(e.target.value)}></input>
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input value = {password} onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <button type="button" onClick={() => handleLoginSubmit()}>Submit</button>
                </form>
                <div><a href = '/register'>Not registered yet?</a></div>
            </div>
            <Footer/>
        </div>
    )
}

export default LoginPage;