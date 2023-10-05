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
    return(
        <div className="studySet" onClick={() => {handleStudySetClick()}}>
            <div>{studySet.title}</div>
            <div>{studySet.date.getMonth()}</div>
        </div>
    )
}
export default StudySet;