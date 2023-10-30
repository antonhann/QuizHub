import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Terms } from './components/Terms';
import { deleteStudySet } from './helpers/fetchAPI';
const ViewStudySet = (props) => {
    const{
        currentUser,
    } = props;
    const params = useParams();
    const [studySet, setStudySet] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const handleDeleteStudySet = async (e,id) => {
        e.preventDefault();
        const res = await deleteStudySet(id)
        if(res.acknowledged){
            navigate("/study-sets")
        }else{
            navigate("/study-sets")
        }
    }

    useEffect(() => {
        const fetchStudySet = async () => {
            try{
                const response = await fetch('http://localhost:3003/view-study-set', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        studySetID: params.id
                    }),
                  });
                const res = await response.json();
                if(res){
                    setStudySet(res[0])
                }else{
                    //handle when empty or not found
                }
            }
            catch(error){
                console.error('Error fetching data:', error);
            }finally{
                setLoading(false)
            }
        }
        fetchStudySet()
    },[])
    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    return(
        <div>
            <Navbar active = "" currentUser = {currentUser}/>
            <div className="studySetCollection">
                <h2>{studySet.title}</h2>
                {currentUser.username == studySet.username ? <div>
                    <button>Edit</button>
                    <button onClick={(e) => handleDeleteStudySet(e,params.id)}>Delete</button>
                </div> : null}
                {studySet.terms.map((item,index) => {
                    return(
                       <Terms key = {index} term = {item.term} answer = {item.answer}></Terms>
                    )
                })}
            </div>
            <Footer/>
        </div>
    )
}

export default ViewStudySet;