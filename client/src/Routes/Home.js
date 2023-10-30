import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const Home = (props) => {
    const{
        currentUser,
    } = props;
    return(
        <div>
            <Navbar active = "LinkOne" currentUser = {currentUser}/>
            <div className="landingPage">
                <div className="landingPageContainer">
                        <h2 className="landingPageHeading">WELCOME TO QUIZHUB {currentUser? currentUser.username : ""}</h2>
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