import './App.css';
import Home from './Routes/Home';
import LoginPage from './Routes/LoginPage';
import Register from './Routes/Register';
import CreateStudySet from './Routes/Create';
import StudySetCollection from './Routes/StudySetCollection';
import ViewStudySet from './Routes/ViewStudySet';
import Flashcard from './Routes/Flashcard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from './Routes/helpers/fetchAPI';
function App() {
  const [currentUser,changeCurrentUser] = useState({});
  const[loading, setLoading] = useState(true);
  useEffect(() => {
      const fetchUser = async () => {
          try{
              const user = await fetchCurrentUser();
              if(user.username && user.id){
                changeCurrentUser({
                  username: user.username,
                  id: user.id
                })
              }else{
                changeCurrentUser({})
              }
              
          }catch(error){  
              console.error(error)
          }finally{
              setLoading(false)
          }
      }
      fetchUser();
  },[])
  if(loading){
      return(
          <div>
              Loading...
          </div>
      )
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home currentUser = {currentUser}/>}/>
          <Route path = "/login" element = {<LoginPage currentUser = {currentUser}/>}/>
          <Route path = "/register" element = {<Register currentUser = {currentUser}/>}/>
          <Route path = "/create" element = {<CreateStudySet currentUser = {currentUser}/>}/>
          <Route path = "/study-sets" element = {<StudySetCollection currentUser = {currentUser}/>}/>
          <Route
            path="/:id/view-study-set"
            element = {<ViewStudySet currentUser = {currentUser}/>}
          />
          <Route
            path="/:id/view-study-set/flashcard"
            element = {<Flashcard currentUser = {currentUser}/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     fetch("/api")
//       .then((res) => res.json())
//       .then((data) => setData(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>{!data ? "Loading..." : data}</p>
//       </header>
//     </div>
//   );
// }

// export default App;