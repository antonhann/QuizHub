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
    const handleDeleteStudySet = async(e,id) => {
        e.preventDefault();
        const res = await deleteStudySet(id)
        if(res.acknowledged){
            navigate("/study-sets")
        }else{
            navigate("/study-sets")
        }
    }
    return(
        <div className="studySet" onClick={() => {handleStudySetClick()}}>
            <div>{studySet.title}</div>
            <div>{studySet.createdAt}</div>
            <button onClick={(e) => handleDeleteStudySet(e,studySet._id)}>Delete</button>
        </div>
    )
}
export default StudySet;