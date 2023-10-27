import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";
import { useUser } from "../User";
const Home = () => {
    const [message, changeMessage] = useState("")
    const {currentUser} = useUser()
    return(
        <div>
            <Navbar active = "LinkOne"/>
            <div className="landingPage">
                <div className="landingPageContainer">
                        <h2 className="landingPageHeading">WELCOME TO QUIZHUB {currentUser.username}</h2>
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