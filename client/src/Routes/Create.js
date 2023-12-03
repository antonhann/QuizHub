import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudyCardInput from "./components/StudyCardInput";
import StudyCard from "./components/StudyCard";
import React, {useState, useEffect} from "react";
// import { v4 as uuidv4 } from 'uuid';
import {useLocation, useNavigate} from 'react-router-dom';
const defaultArray = [
    new StudyCard(0),
    new StudyCard(1),
    new StudyCard(2),
]

const CreateStudySet = (props) => {
    const {
        currentUser,
    } = props
    const location = useLocation();
    const [title,changeTitle] = useState("")
    const [description, changeDescription] = useState("")
    const [studySet, setStudySet] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const handleArrayChange = (e,i,type) => {
        const {value} = e.target
        const updatedArray = studySet.map((item,index) => {
            if(index === i){
                if(type === "term"){
                    item.term = value
                }else{
                    item.answer = value
                }
            }
            return item
        })
        setStudySet(updatedArray)
    }
    const removeCard = (i) =>{
        const newArr = studySet.filter((item,index) => {
            return index !== i;   
        })
        setStudySet(newArr)
    }
    const addCard = () =>{
        setStudySet(studySet.concat(new StudyCard()))
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newArr = studySet.filter((item) => {
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
        for(var i = 0; i < studySet.length; i++){
            newArr[i].number = i;
        }
        setStudySet(newArr)
        let newStudySet = {
            title: title,
            description: description,
            studySetArray: studySet,
            id: location.state.id,
            newBool: location.state.new,
        }
        try{
            let response = await fetch('http://localhost:3003/create-study-set',{
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudySet),
            })
            if (!response.ok) {
                // Handle error, e.g., display an error message to the user
                console.error('Adding Study Card failed. Status:', response.status);
                return;
            }
            const result = await response.json()
            if(result.ok){
                navigate('/', {replace: true});
            }else{
                console.error("error adding study set to the DB");
            }
            
        }
        catch(error){
            console.error(error)
        }
    }
    // eslint-disable-next-line
    useEffect(() => {
        const fetchStudySet = async () => {
            try{
                const response = await fetch('http://localhost:3003/view-study-set', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        studySetID: location.state.id
                    }),
                  });
                const res = await response.json();
                if(res){
                    setStudySet(res[0].terms)
                    changeDescription(res[0].description)
                    changeTitle(res[0].title)
                }else{
                    //handle when empty or not found
                }
            }
            catch(error){
                console.error('Error fetching data:', error);
            }finally{
                setLoading(false)
            }
        }
        if(location.state.new){
            setStudySet(defaultArray);
            setLoading(false)
            return;
        }else{
            fetchStudySet();
        }
    },[])
    if(Object.keys(currentUser).length === 0){
        navigate("/login")
        return(
            <div>Redirecting YOU!</div>
        )
    }
    else if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    return(
        <div>
            <Navbar active = "Create" currentUser = {currentUser}/>
            <div className="createBody">
                <div className="createStudySetHeading">
                        <h2>Create a Study Set!</h2>
                </div>
                <form className="createStudySet">
                    <div className="studySetDescription">
                        <input className = "inputTitle" type="text" placeholder = "Title" value={title} onChange={(e) => changeTitle(e.target.value)}></input>
                        <textarea className = "inputDescription" type="text" placeholder = "Descripition" value={description} onChange={(e) => changeDescription(e.target.value)}></textarea>
                    </div>
                    <div className="errorMessage"></div>
                    {studySet.map((item,index) => {
                        return (
                            <StudyCardInput 
                                studySet = {studySet}
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