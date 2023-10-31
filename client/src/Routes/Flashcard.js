import { useParams, useLocation} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from 'react';
const Flashcard = (props) => {
    const{
        currentUser
    } = props
    const params = useParams();
    const location = useLocation();
    const studySet = location.state.studySet
    const [orderedIndex, setOrderedIndex] = useState(0)
    const [currentFlashcard,setCurrentFlashcard] = useState(studySet.terms[0])
    const [showingTerm, toggleFlashcard] = useState(true)
    const [shuffled, setShuffle] = useState(false)

    const flipFlashcard = () => {
        toggleFlashcard(!showingTerm)   
    }
    const handleNextClick = () => {
        if(!shuffled){
            if(orderedIndex === studySet.terms.length){
                //handle when user has finished looking at the entire set
            }
            else{
                console.log(orderedIndex)
                setOrderedIndex(orderedIndex + 1)
                console.log(orderedIndex)
                setCurrentFlashcard(studySet.terms[orderedIndex])
            }
        }
    }
    const handlePrevClick = () => {

    }
    return(
        <div>
            <Navbar currentUser = {currentUser}/>
            <div className = "landingPage">
                <div className='flashcard' onClick={() => flipFlashcard()}>
                    {showingTerm ? currentFlashcard.term : currentFlashcard.answer}
                </div>
                <div>
                    <button onClick={() => handlePrevClick()}>Prev</button>
                    <button onClick={() => handleNextClick()}>Next</button>
                </div>
            </div>
            <Footer/>
        </div>
        
    )
}

export default Flashcard;