const fetchUser = () => {
    fetch('http://localhost:3005/home', {
        credentials: 'include',
      })
    .then((res) => {
        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        else{
            return res.json()
        }
    })
    .then(data => {
        return (data.username)
    })
    .catch(error => {
        console.error('Fetch error:', error);
        return (undefined)
    });
}
export default fetchUser;