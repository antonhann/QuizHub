const StudyCard = (props) => {
    const {
        index,
        term,
        answer,
        handleTermChange,
        handleAnswerChange
    } = props
    return (
        <div className="studyCard">
            <textarea placeholder="Term" value = {term} onChange={handleTermChange}></textarea>
            <textarea placeholder="Answer" value = {answer} onChange={handleAnswerChange}></textarea>
            <h1>{index}</h1>
        </div>
    )
}

export default StudyCard;