
export const fetchCurrentUser = async () => {
    try{
        const response = await fetch('http://localhost:3003/currentUser', {
            credentials: 'include',
        });
        const res = await response.json()
        return res
    }catch(error){
        console.error(error)
    }
}
export const fetchStudySet = async() => {
    try{
        const response = await fetch('http://localhost:3003/study-set-collection',{
            credentials: 'include',
        })
        const res = await response.json();
        return res
    }catch(error){
        console.error(error)
    }
}

export const deleteStudySet = async(id) => {
    try{
        const response = await fetch('http://localhost:3003/delete-study-set', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studySetID: id
            }),
          });
        
        const res = await response.json();
        return res;
    }
    catch(error){
        console.error('Error deleting data:', error);
        return(error);
    }
}