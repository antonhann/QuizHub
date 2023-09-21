import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, {useState} from "react";
const CreateStudySet = () => {
    const [title,changeTitle] = useState("")
    const [description, changeDescription] = useState("")
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
                        <input className = "inputDescription" type="text" placeholder = "Descripition" value={description} onChange={(e) => changeDescription(e.target.value)}></input>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
};

export default CreateStudySet;