import { useNavigate } from 'react-router-dom';
import { deleteStudySet } from '../helpers/fetchAPI';

const StudySet = (props) => {
    const {
        studySet,
    } = props
    const navigate = useNavigate()
    const handleStudySetClick = () => {
        const customRoute = '/' + studySet._id + '/view-study-set';
        navigate(customRoute)
    }
    const handleDeleteStudySet = async() => {
        const res = await deleteStudySet(studySet._id)
        window.location.reload()
    }
    const handleEditStudySet = () => {
        navigate("/Create",{state:{new: false, id: studySet._id}})
    }
    return(
        <div>
            <div className="studySet" onClick={() => {handleStudySetClick()}}>
                <div>{studySet.title}</div>
                <div>{studySet.createdAt}</div>
            </div>
            <div>
                <button onClick={() => handleEditStudySet()}>Edit</button>
                <button onClick={() => handleDeleteStudySet()}>Delete</button>
            </div>
        </div>
        
    )
}
export default StudySet;