const StudyCardInput = (props) => {
    const {
        cardArray,
        index,
        term,
        answer,
        handleTermChange,
        handleAnswerChange,
        removeCard
    } = props
    return (
        <div className="studyCard">
            <textarea placeholder="Term" value = {term} onChange={handleTermChange}></textarea>
            <textarea placeholder="Answer" value = {answer} onChange={handleAnswerChange}></textarea>
            <h1>{index}</h1>
            {(cardArray.length <= 3) ? <button type = "button" >X</button> : <button type = "button" onClick={removeCard}>X</button>}
        </div>
    )
}

export default StudyCardInput;