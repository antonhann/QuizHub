import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const Home = () => {
    return(
        <div>
            <Navbar active = "LinkOne"/>
            <div className="landingPage">
                <div className="landingPageContainer">
                        <h2 className="landingPageHeading">WELCOME TO QUIZHUB</h2>
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