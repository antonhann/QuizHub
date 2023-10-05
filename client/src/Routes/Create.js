import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudyCardInput from "./components/StudyCardInput";
import StudyCard from "./components/StudyCard";
import React, {useState, useEffect} from "react";
import {Link, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
const defaultArray = [
    new StudyCard(),
    new StudyCard(),
    new StudyCard(),
]

const CreateStudySet = () => {
    const [title,changeTitle] = useState("")
    const [description, changeDescription] = useState("")
    const [cardArray, changeArr] = useState([]) 
    const navigate = useNavigate();
    
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
            return index !== i;   
        })
        changeArr(newArr)
    }
    const addCard = () =>{
        changeArr(cardArray.concat(new StudyCard()))
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const newArr = cardArray.filter((item) => {
            return item.term !== "" && item.answer !== ""
        })
        if(newArr.length < 3 && title === ""){
            //handle when there arent two cards or a title
            console.log("no title / not enough cards")
            return;
        }else if(title === ""){
            //handle when there isnt a title
            console.log("no title")
            return;
        }else if(newArr.length < 3){
            //handle when there arent two cards
            console.log("not enough cards")
            return;
        }
        changeArr(newArr)

        let studySet = {
            title: title,
            description: description,
            date: new Date(),
            studyCards: cardArray,
        }
        console.log(studySet)
        navigate('/', {replace: true});
        // console.log(cardArray)
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
                    <div className="errorMessage"></div>
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
                    <input type = "submit" value="Submit" onClick={(e) => handleSubmit(e)}/>
                </form>
            </div>
            <Footer/>
        
        </div>
    )
};

export default CreateStudySet;