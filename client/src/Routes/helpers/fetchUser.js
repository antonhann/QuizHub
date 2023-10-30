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
        const response = await fetch('http://localhost:3003/study-set',{
            credentials: 'include',
        })
        const res = await response.json();
        return res
    }catch(error){
        console.error(error)
    }
}