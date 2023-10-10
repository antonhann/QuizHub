import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
const Home = () => {
    const [message, changeMessage] = useState("")
    useEffect(() => {
        fetch('http://localhost:3005/home', {
            credentials: 'include',
          })
        .then((res) => {
            if(!res.ok){
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            else{
                return res.json()
            }
        })
        .then(data => {
            console.log(data.username)
            changeMessage(data.username)
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    },[])
    return(
        <div>
            <Navbar active = "LinkOne"/>
            <div className="landingPage">
                <div className="landingPageContainer">
                        <h2 className="landingPageHeading">WELCOME TO QUIZHUB {message}</h2>
                    <div className="btn">
                        <button className ="mainButton">BTN</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    )
}
export default Home;