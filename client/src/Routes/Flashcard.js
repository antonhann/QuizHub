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
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentFlashcard,setCurrentFlashcard] = useState(studySet.terms[0])
    const [showingTerm, setShowTerm] = useState(true)
    const [shuffled, setShuffle] = useState(false)
    const[startWithTerm, setStartWith] = useState(true)
    const flipFlashcard = () => {
        setShowTerm(!showingTerm)   
    }
    const changecurrentIndex = (add) => {
        setCurrentIndex(currentIndex + add)
        setCurrentFlashcard(studySet.terms[currentIndex + add])
        setShowTerm(startWithTerm)
    }
    const handleNextClick = () => {
        if(currentIndex === studySet.terms.length - 1){
            //handle when user has finished looking at the entire set
        }
        else{
            changecurrentIndex(1)
        }
    }
    const handlePrevClick = () => {
        if(currentIndex > 0){
            changecurrentIndex(-1)
        }
    }
    const toggleShuffle = () => {
        const updatedShuffled = !shuffled
        setShuffle(updatedShuffled)
        if(updatedShuffled){
            shuffle(studySet.terms)
        }else{
            studySet.terms.sort((a,b) => a.number - b.number)
        }
        setCurrentFlashcard(studySet.terms[currentIndex])
        setShowTerm(startWithTerm)
    }
    //need use effect to handle the showing the first current flashcard when popped up
    //store the users current ordered index and shuffled index to ensure they can pick up where they left off
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
                <div>
                    <button onClick={() => toggleShuffle()}>Shuffle</button>
                    {/* <button onClick={() => handleNextClick()}>Next</button> */}
                </div>
            </div>
            <Footer/>
        </div>
        
    )
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
export default Flashcard;