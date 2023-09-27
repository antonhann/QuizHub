import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudyCard from "./components/StudyCard";
import React, {useState, useEffect} from "react";
const defaultArray = [
    {
        term: "",
        answer: "",
    },
    {
        term: "",
        answer: "",
    },
    {
        term: "",
        answer: "",
    },
]
const CreateStudySet = () => {
    const [title,changeTitle] = useState("")
    const [description, changeDescription] = useState("")
    const [cardArray, changeArr] = useState([]) 

    // function handleSubmit(){
    //     return "hello"
    // }
    const handleArrayChange = (e,index,type) => {
        const {value} = e.target
        console.log(value,index)
        var newItem;
        changeArr((prevArray) => {
            if(type === "term"){
                newItem = prevArray[index] = {
                    term: value,
                    answer: prevArray[index].answer
                }
            }else{
                newItem = prevArray[index] = {
                    term: prevArray[index].term,
                    answer: value
                }
            }
            return[
                ...prevArray.slice(0,index), 
                newItem,
                ...prevArray.slice(index + 1)
            ]
        })
    }
    // eslint-disable-next-line
    useEffect(() => {
        if(cardArray.length === 0){
            changeArr(defaultArray);
        }
    })
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

                    {cardArray.map((item,index) => {
                        return (
                            <StudyCard 
                                handleTermChange = {(e) => {handleArrayChange(e,index,"term")}}
                                handleAnswerChange = {(e) => {handleArrayChange(e,index,"answer")}}
                                index = {index}
                                key = {index}
                                term = {item.term}
                                answer = {item.answer}
                            />
                        )
                    })}
                </form>
            </div>
            <Footer/>
        
        </div>
    )
};

export default CreateStudySet;