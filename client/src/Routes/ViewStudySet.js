import {useParams} from 'react-router-dom';
const ViewStudySet = (props) => {
    const params = useParams();
    console.log(props)
    return(
        <div>
            Hello {params.id}
        </div>
    )
}

export default ViewStudySet;