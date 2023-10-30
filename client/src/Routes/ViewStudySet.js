import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
const ViewStudySet = (props) => {
    const{
        currentUser,
    } = props;
    const params = useParams();
    const [studySet, setStudySet] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchStudySet = async () => {
            console.log(params.id)
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
                console.error(error)
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
                {studySet.studySetArray.map((item,index) => {
                    return(
                       <div>{item.term} {item.answer}</div>
                    )
                })}
            </div>
            <Footer/>
        </div>
    )
}

export default ViewStudySet;