import { useNavigate } from 'react-router-dom';


const StudySet = (props) => {
    const {
        studySet,
    } = props
    const navigate = useNavigate()
    const handleStudySetClick = () => {
        const customRoute = '/' + studySet._id + '/view-study-set';
        navigate(customRoute)
    }
    return(
        <div className="studySet" onClick={() => {handleStudySetClick()}}>
            <div>{studySet.title}</div>
            <div>{studySet.createdAt}</div>
        </div>
    )
}
export default StudySet;