import './App.css';
import Home from './Routes/Home';
import LoginPage from './Routes/LoginPage';
import CreateStudySet from './Routes/Create';
import StudySetCollection from './Routes/StudySetCollection';
import ViewStudySet from './Routes/ViewStudySet';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/login" element = {<LoginPage/>}/>
          <Route path = "/create" element = {<CreateStudySet/>}/>
          <Route path = "/study-sets" element = {<StudySetCollection/>}/>
          <Route
            path="/:id/view-study-set"
            element = {<ViewStudySet/>}
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