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
                <h2 className="landingPageHeading">WELCOME TO QUIZHUB {currentUser? currentUser.username : ""}</h2>
                <div className="btn">
                {Object.keys(currentUser).length === 0 ?<button className ="mainButton">LOGIN</button>: <div></div>}
                </div>
            </div>
            <Footer/>
        </div>

    )
}
export default Home;