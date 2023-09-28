import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudyCardInput from "./components/StudyCardInput";
import StudyCard from "./components/StudyCard";
import React, {useState, useEffect} from "react";
const defaultArray = [
    new StudyCard(),
    new StudyCard(),
    new StudyCard(),
]
const CreateStudySet = () => {
    const [title,changeTitle] = useState("")
    const [description, changeDescription] = useState("")
    const [cardArray, changeArr] = useState([]) 

    const handleArrayChange = (e,i,type) => {
        const {value} = e.target
        const updatedArray = cardArray.map((item,index) => {
            if(index === i){
                if(type === "term"){
                    item.term = value
                }else{
                    item.answer = value
                }
            }
            return item
        })
        changeArr(updatedArray)
    }
    const removeCard = (i) =>{
        const newArr = cardArray.filter((item,index) => {
            // console.log(index,);
            return index !== i;   
        })
        // console.log(newArr,i)
        changeArr(newArr)
        console.log(cardArray)
    }
    const addCard = (i) =>{
        changeArr(cardArray.concat(new StudyCard()))
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
                            <StudyCardInput 
                                cardArray = {cardArray}
                                handleTermChange = {(e) => {handleArrayChange(e,index,"term")}}
                                handleAnswerChange = {(e) => {handleArrayChange(e,index,"answer")}}
                                removeCard = {() => removeCard(index)}
                                index = {index}
                                key = {index}
                                term = {item.term}
                                answer = {item.answer}
                            />
                        )
                    })}
                    <button type = "button" onClick={addCard}>Add Card</button>
                </form>
            </div>
            <Footer/>
        
        </div>
    )
};

export default CreateStudySet;