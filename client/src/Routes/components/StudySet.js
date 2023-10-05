const StudySet = (props) => {
    const {
        studySet,
    } = props
    console.log(studySet)
    return(
        <div className="studySet">
            <div>{studySet.title}</div>
            <div>{studySet.date.getMonth()}</div>
        </div>
    )
}
export default StudySet;