import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudyCard from "./components/StudyCard";
import StudySet from "./components/StudySet";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { useState } from "react";
import { fetchStudySet } from "./helpers/fetchUser";
const testSet = [
    {
        id: uuidv4(),
        title: "this is study set one",
        description: "here is my description",
        date: new Date(),
        // studyCards: cardArray,
    },
    {
        id: uuidv4(),
        title: "this is study set two",
        description: "here is my description",
        date: new Date(),
        // studyCards: cardArray,
    },
    {
        id: uuidv4(),
        title: "this is study set three",
        description: "here is my description",
        date: new Date(),
        // studyCards: cardArray,
    },
]
//sort arrays by their month and group them by their month / year
//add id to each study set
const StudySetCollection = (props) =>{
    const {
        currentUser,
    } = props
    const[studySet,changeStudySet] = useState([])
    const[loading, setLoading] = useState(true)
    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await fetchStudySet();
                console.log(res)
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
        return(
            <div>
                <Navbar active = "Study Sets" currentUser = {currentUser}/>
                <div className="studySetCollection">
                    <h2>pls log in</h2>
                </div>
                <Footer/>
            </div>
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