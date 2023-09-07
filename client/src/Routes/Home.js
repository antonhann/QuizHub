import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const Home = () => {
    return(
        <div>
            <Navbar active = "LinkOne"/>
            <div className="landingPage">
                <h2>WELCOME TO QUIZLET</h2>
            </div>
            <Footer/>
        </div>
    )
}
export default Home;