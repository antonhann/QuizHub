import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudyCard from "./components/StudyCard";
import StudySet from "./components/StudySet";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { useState } from "react";
import { fetchStudySet } from "./helpers/fetchAPI";
import { useNavigate } from "react-router-dom";
//sort arrays by their month and group them by their month / year
//add id to each study set
const StudySetCollection = (props) =>{
    const {
        currentUser,
    } = props

    const[studySet,changeStudySet] = useState([])
    const[loading, setLoading] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await fetchStudySet();
                if(res){
                    changeStudySet(res)
                }
            }catch(error){
                console.error(error)
            }finally{
                setLoading(false)
            }
        }
        fetch();
    },[])
    if(Object.keys(currentUser).length === 0){
        navigate("/login")
        return(
            <div>Redirecting YOU!</div>
        )
    }
    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    return(
        <div>
            <Navbar active = "Study Sets" currentUser = {currentUser}/>
            <div className="studySetCollection">
                <h2>My Study Set</h2>
                {studySet.map((item,index) => {
                    return(
                        <StudySet studySet = {item} key = {index}/>
                    )
                })}
            </div>
            <Footer/>
        </div>
        
    )
}

export default StudySetCollection;