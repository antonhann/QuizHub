import { useParams, useLocation} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState,useEffect, useRef} from 'react';
import * as Helper from "./components/helper";
const Flashcard = (props) => {
    const{
        currentUser
    } = props
    const params = useParams();
    const location = useLocation();
    const originalStudySet = location.state.studySet
    const [studySet, setStudySet] = useState(JSON.parse(JSON.stringify(originalStudySet.terms)))
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showingTerm, setShowTerm] = useState(true)
    const [shuffled, setShuffle] = useState(false)
    const [smartSort, setSmartSort] = useState(false)
    const [knowTerms, setKnowTerms] = useState(0)
    const [endOfStudySet, setEndOfStudySet] = useState(false)
    const [startsWithTerm, setStartsWith] = useState(true)
    const [loading, setLoading] = useState(true)
    const [optionPopUp, setOptionsPopUp] = useState(false)
    const formRef = useRef(null);

    const flipFlashcard = () => {
        setShowTerm(!showingTerm)   
    }
    const updateFlashcardData = async () => {
        const updatedData = {
            studySetID: params.id,
            studySet: studySet,
            currentIndex: currentIndex,
            showingTerm: showingTerm,
            shuffled: shuffled,
            smartSort: smartSort,
            knowTerms: knowTerms,
            endOfStudySet: endOfStudySet,
            startsWithTerm: startsWithTerm,
        }
        let response = await fetch('http://localhost:3003/set-flashcard-data',{
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        if(!response.ok){
            console.error('Adding Flashcard Data failed. Status:', response.status);
            return;
        }
        const result = await response.json()
        if(!result.ok){
            console.error("error adding Flashcard to the DB");
        }
    }
    const changecurrentIndex = (add) => {
        setCurrentIndex(currentIndex + add)
        setShowTerm(startsWithTerm)
    }
    const handleNextClick = () => {
        if(currentIndex === studySet.length - 1){
            setEndOfStudySet(true)
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
        setShuffle(!shuffled)
        if(updatedShuffled){
            const doneStudySet = studySet.slice(0,currentIndex)
            const remainingStudySet = studySet.slice(currentIndex)
            shuffle(remainingStudySet)
            if(remainingStudySet.length !== 1){
                while(remainingStudySet[0].number === remainingStudySet[1].number - 1){
                    shuffle(remainingStudySet)
                }
            }
            setStudySet(doneStudySet.concat(remainingStudySet))
        }else{
            const doneSet = studySet.slice(0,currentIndex)
            const remainingSet = studySet.slice(currentIndex).sort((a,b) => a.number - b.number)
            setStudySet(doneSet.concat(remainingSet))
        }
        setShowTerm(startsWithTerm)
    }
    const toggleSmartSort = () => {
        setSmartSort(!smartSort)
    }
    const toggleStartWithTerm = () => {
        setStartsWith(!startsWithTerm)
        flipFlashcard()
    }
    const handleDontKnowClick = () => {
        studySet[currentIndex].know = false
        setKnowTerms(knowTerms - 1)
        handleNextClick()
    }
    const handleKnowCLick = () => {
        studySet[currentIndex].know = true
        setKnowTerms(knowTerms + 1)
        handleNextClick()
    }
    const handleRestartClick = () => {
        setCurrentIndex(0)
        setKnowTerms(0)
        const newStudySet = originalStudySet.terms.slice(); // Create a copy of the original terms

        if (shuffled) {
            shuffle(newStudySet); // Shuffle the copied array
        } else {
            newStudySet.sort((a, b) => a.number - b.number); // Sort the copied array
        }

        setStudySet(newStudySet); // Update the state with the new array
        setEndOfStudySet(false)
    }
    const handleReviewUnknownTermsClick = () => {
        setKnowTerms(0)
        const unknownSet = studySet.filter((item) => {
            return item.know === false
        })
        if(unknownSet.length === 0){
            
        }else{
            setStudySet(unknownSet)
            setCurrentIndex(0)
            setEndOfStudySet(false)
        }
        
    }
    const toggleOptionsPopup = () => {
        setOptionsPopUp(!optionPopUp)
    }
    const handleClickOutsideForm = (event) => {
        /**if click is outside of the div close form */
        if (formRef.current && !formRef.current.contains(event.target)) {
            setOptionsPopUp(false);
        }
    }

    useEffect(() => {
        const fetchFlashcardData = async () => {
            try{
                const response = await fetch('http://localhost:3003/view-flashcard-data', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        studySetID: params.id
                    }),
                  });
                const res = await response.json();
                if(res.found){
                    const data = res.data[0]
                    console.log(data)
                    setStudySet(data.studySet);
                    setCurrentIndex(data.currentIndex);
                    setShowTerm(data.showingTerm);
                    setShuffle(data.shuffled);
                    setSmartSort(data.smartSort);
                    setKnowTerms(data.knowTerms);
                    setEndOfStudySet(data.endOfStudySet);
                    setStartsWith(data.startsWithTerm);
                    console.log(data.studySet)
                }else{
                    //handle error when it is not found
                }
            }
            catch(error){
                console.error('Error fetching flashcard data:', error);
            }finally{
                setLoading(false)
            }
        }
        fetchFlashcardData()
    },[])
    useEffect(() => {
        updateFlashcardData();
    },[studySet,currentIndex,showingTerm,shuffled,smartSort,knowTerms,endOfStudySet,startsWithTerm])
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideForm);
        // Cleanup the event listener on component unmount
        return () => {
          document.removeEventListener("mousedown", handleClickOutsideForm);
        };
      }, [formRef]);
    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    //need use effect to handle the showing the first current flashcard when popped up
    //store the users current ordered index and shuffled index to ensure they can pick up where they left off
    return(
        <div>
            <Navbar currentUser = {currentUser}/>
            {!endOfStudySet ?
            <div>
                <div className = "flashcardBody">
                    <div>{currentIndex + 1} / {studySet.length}</div>
                    <div className= {`flashcard ${showingTerm ? '' : 'flipped'}`} onClick={() => flipFlashcard()}>
                        {
                        showingTerm ? 
                        <div className='flashcardFace flashcardFront'>
                            {studySet[currentIndex].term}
                        </div> : 
                        <div className='flashcardBack'>
                            {studySet[currentIndex].answer}
                        </div>
                        }
                    </div>
                        {!smartSort ? 
                        <div className='regularSortFlashcardButtons'>
                            <button onClick={() => handlePrevClick()}>Prev</button>
                            <button onClick={() => handleNextClick()}>Next</button> 
                        </div>
                        :
                        <div className='smartSortFlashcardButtons'>
                            <button onClick={() => handlePrevClick()}>UNDO</button>
                            <button onClick={() => handleDontKnowClick()}>IDK</button>
                            <button onClick={() => handleKnowCLick()}>KNOW</button> 
                        </div>
                        }
                    <button className = "flashcardOptionsButton" onClick={() => toggleOptionsPopup()}>Options</button>
                    {optionPopUp && (
                            <div className = "flashcardOptionsPopup">
                                <div ref = {formRef} className='flashcardOptionInner'>
                                    <div className='flashcardOptionHeading'>
                                        <h2>Options!</h2>
                                        <button className = "closeButton" onClick={() => toggleOptionsPopup()}>Close</button>
                                    </div>
                                    <div className='toggleButtons'>
                                        <Helper.ToggleButton
                                            toggleFunction = {() => toggleShuffle()}
                                            label = "Shuffle"
                                            check = {shuffled}
                                        ></Helper.ToggleButton>
                                        <Helper.ToggleButton
                                            toggleFunction = {() => toggleSmartSort()}
                                            label = "Smart Sort"
                                            check = {smartSort}
                                        ></Helper.ToggleButton>
                                        <Helper.ToggleButton
                                            toggleFunction = {() => toggleStartWithTerm()}
                                            label = "Start with Term"
                                            check = {startsWithTerm}
                                        ></Helper.ToggleButton>
                                    </div>
                                </div>
                            </div>
                    )}
                </div>
            </div> 
            :
            <div className = "flashcardBody">
                {smartSort?
                (knowTerms !== studySet.length) ? <button onClick={() => handleReviewUnknownTermsClick()}>Review Unknown Terms</button> : <div>CONGRATS KNOWING ALL TERMS</div>
                :
                null
                }
                <button onClick={() => handleRestartClick()}>RESTART EVERYTHING</button>
            </div>
            }
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