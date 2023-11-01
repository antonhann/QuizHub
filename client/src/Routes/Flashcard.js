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
    const testShuffledSet = shuffle(JSON.parse(JSON.stringify(studySet.terms)))
    const [orderedIndex, setOrderedIndex] = useState(0)
    const [currentFlashcard,setCurrentFlashcard] = useState(studySet.terms[0])
    const [showingTerm, setShowTerm] = useState(true)
    const [shuffled, setShuffle] = useState(false)
    const [shuffledIndex, setShuffledIndex] = useState(0)
    const [shuffledSet, setShuffledSet] = useState(testShuffledSet)
    const[startWithTerm, setStartWith] = useState(true)
    
    const flipFlashcard = () => {
        setShowTerm(!showingTerm)   
    }
    const changeOrderedIndex = (add) => {
        setOrderedIndex(orderedIndex + add)
        setCurrentFlashcard(studySet.terms[orderedIndex + add])
        setShowTerm(startWithTerm)
    }
    const changeShuffledIndex = (add) => {
        setShuffledIndex(shuffledIndex + add)
        setCurrentFlashcard(shuffledSet[shuffledIndex + add])
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
        }else{
            if(shuffledIndex === studySet.terms.length - 1){
                //handle when user has finished looking at the entire set
            }
            else{
                changeShuffledIndex(1)
            }
        }
    }
    const handlePrevClick = () => {
        if(!shuffled){
            if(orderedIndex > 0){
                changeOrderedIndex(-1)
            }
        }else{
            if(shuffledIndex > 0){
                changeShuffledIndex(-1)
            }
        }
    }
    const toggleShuffle = () => {
        const updatedShuffled = !shuffled
        setShuffle(updatedShuffled)
        if(updatedShuffled){
            setCurrentFlashcard(testShuffledSet[shuffledIndex])
            setShowTerm(startWithTerm)
        }else{
            setCurrentFlashcard(studySet.terms[orderedIndex])
            setShowTerm(startWithTerm)
        }
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