import './App.css';
import Home from './Routes/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
