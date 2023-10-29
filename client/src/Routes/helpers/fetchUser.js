const fetchUser = async () => {
    return fetch('http://localhost:3003/currentUser', {
        credentials: 'include',
    })
}
export default fetchUser;