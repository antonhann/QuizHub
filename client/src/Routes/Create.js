import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudyCard from "./components/StudyCard";
import React, {useState} from "react";
const CreateStudySet = () => {
    const [title,changeTitle] = useState("")
    const [description, changeDescription] = useState("")
    const [cardArray, changeArr] = useState([]) 
    const defaultArray = [
        {
            term: "",
            question: "",
        },
        {
            term: "",
            question: "",
        },
        {
            term: "",
            question: "",
        },
    ]
    function handleSubmit(){
        return "hello"
    }
    return(
        <div>
            <Navbar active = "Create"/>
            <div>
                <div className="createStudySetHeading">
                        <h2>Create a Study Set!</h2>
                </div>
                <form className="createStudySet">
                    <div className="studySetDescription">
                        <input className = "inputTitle" type="text" placeholder = "Title" value={title} onChange={(e) => changeTitle(e.target.value)}></input>
                        <textarea className = "inputDescription" type="text" placeholder = "Descripition" value={description} onChange={(e) => changeDescription(e.target.value)}></textarea>
                    </div>

                    {defaultArray.map((item,index) => {
                        return <StudyCard index = {index} term = {item.term} answer = {item.answer}/>
                    })}
                </form>
            </div>
            <Footer/>
        
        </div>
    )
};

export default CreateStudySet;