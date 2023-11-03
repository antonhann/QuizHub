import { useParams, useLocation} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState,useEffect } from 'react';
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
    const[startsWithTerm, setStartsWith] = useState(true)
    const[loading, setLoading] = useState(true)
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
        setShuffle(updatedShuffled)
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
        setStudySet(originalStudySet.terms.slice(0))
        if(shuffled){
            shuffle(studySet)
        }
        else{
            studySet.sort((a,b) => a.number - b.number)
        }
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
                    console.log(data);
                    setStudySet(data.studySet);
                    setCurrentIndex(data.currentIndex);
                    setShowTerm(data.showingTerm);
                    setShuffle(data.shuffled);
                    setSmartSort(data.smartSort);
                    setKnowTerms(data.knowTerms);
                    setEndOfStudySet(data.endOfStudySet);
                    setStartsWith(data.startsWithTerm);
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
        console.log(shuffled)
        updateFlashcardData();
    },[studySet,currentIndex,showingTerm,shuffled,smartSort,knowTerms,endOfStudySet,startsWithTerm])
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
                <div className = "body">
                    <div>{currentIndex + 1} / {studySet.length}</div>
                    <div className='flashcard' onClick={() => flipFlashcard()}>
                        {
                        startsWithTerm && showingTerm ? 
                        studySet[currentIndex].term : studySet[currentIndex].answer
                        }
                    </div>
                        {!smartSort ? 
                        <div>
                        <button onClick={() => handlePrevClick()}>Prev</button>
                        <button onClick={() => handleNextClick()}>Next</button> 
                        </div>
                        :
                        <div>
                            <button onClick={() => handlePrevClick()}>UNDO</button>
                            <button onClick={() => handleDontKnowClick()}>IDK</button>
                            <button onClick={() => handleKnowCLick()}>KNOW</button> 
                        </div>
                        }
                    <div>
                        {shuffled ? <button className = "shuffle active" onClick={() => toggleShuffle()}>Shuffle</button> : <button className = "shuffle" onClick={() => toggleShuffle()}>Shuffle</button>}
                        {smartSort ? <button className = "smartSortButton active"onClick={() => toggleSmartSort()}>Smart Sort</button> : <button className = "smartSortButton"onClick={() => toggleSmartSort()}>Smart Sort</button>}
                    </div>
                </div>
            </div> 
            :
            <div className = "body">
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