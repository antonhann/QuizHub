import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudyCard from "./components/StudyCard";
import StudySet from "./components/StudySet";
import { v4 as uuidv4 } from 'uuid';
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
const StudySetCollection = () =>{
    return(
        <div>
            <Navbar active = "Study Sets"/>
            <div className="studySetCollection">
                <h2>My Study Set</h2>
                {testSet.map((item,index) => {
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