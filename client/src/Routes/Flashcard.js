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
    const [showingTerm, setShowTerm] = useState(true)
    const [shuffled, setShuffle] = useState(false)
    const[startWithTerm, setStartWith] = useState(true)

    const flipFlashcard = () => {
        setShowTerm(!showingTerm)   
    }
    const changeOrderedIndex = (add) => {
        setOrderedIndex(orderedIndex + add)
        setCurrentFlashcard(studySet.terms[orderedIndex + add])
        setShowTerm(startWithTerm)
    }
    const handleNextClick = () => {
        if(!shuffled){
            if(orderedIndex === studySet.terms.length - 1){
                //handle when user has finished looking at the entire set
            }
            else{
                changeOrderedIndex(1)
            }
        }
    }
    const handlePrevClick = () => {
        if(!shuffled){
            if(orderedIndex === 0){
                //handle when user has finished looking at the entire set
            }
            else{
                changeOrderedIndex(-1)
            }
        }
    }
    return(
        <div>
            <Navbar currentUser = {currentUser}/>
            <div className = "landingPage">
                <div className='flashcard' onClick={() => flipFlashcard()}>
                    {startWithTerm && showingTerm ? currentFlashcard.term : currentFlashcard.answer}
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