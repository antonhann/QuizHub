const StudyCard = (props) => {
    const {
        index,
        term,
        answer,
    } = props
    return (
        <div className="studyCard">
            <form>
                <textarea placeholder="Term"></textarea>
                <textarea placeholder="Answer"></textarea>
                <h1>{index}</h1>
            </form>
        </div>
    )
}

export default StudyCard;