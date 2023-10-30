import { useNavigate } from 'react-router-dom';


const StudySet = (props) => {
    const {
        studySet,
    } = props
    const navigate = useNavigate()
    const handleStudySetClick = () => {
        const customRoute = '/' + studySet.id + '/view-study-set';
        navigate(customRoute)
    }
    console.log(typeof(studySet.createdAt))
    return(
        <div className="studySet" onClick={() => {handleStudySetClick()}}>
            <div>{studySet.title}</div>
            <div>{studySet.createdAt}</div>
        </div>
    )
}
export default StudySet;