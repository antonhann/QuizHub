import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import fetchUser from "./helpers/fetchUser";
const Home = () => {
    const [currentUser,changeCurrentUser] = useState("");
    const[loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try{
                const response = await fetch('http://localhost:3003/currentUser', {
                    credentials: 'include',
                });
                const res = await response.json()
                console.log(res)
                changeCurrentUser(res.username)
            }catch(error){
                console.error(error)
            }finally{
                setLoading(false)
            }
        }
        fetchCurrentUser();
    },[])
    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    return(
        <div>
            <Navbar active = "LinkOne" currentUser = {currentUser}/>
            <div className="landingPage">
                <div className="landingPageContainer">
                        <h2 className="landingPageHeading">WELCOME TO QUIZHUB {currentUser? currentUser : ""}</h2>
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