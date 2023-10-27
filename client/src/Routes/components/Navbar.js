import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useUser } from '../../User';
const Navbar = (props) => { 
    const {
      active
    } = props
    const {currentUser} = useUser();
    const handleLogout = async () => {
      let response = await fetch("localhost:3005/logout",{
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(response.ok){
        console.log("successfully logged out")
      }else{
        console.log("couldnt log out")
      }
    }
    const navigate = useNavigate();
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme = "dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">QuizHub</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <NavLinks linkName = "Create" active = {active} href = "/create"/>
              <NavLinks linkName = "Study Sets" active = {active} href = "/study-sets"/>
              <NavLinks linkName = "LinkThree" active = {active} href = "/"/>
              {console.log(currentUser)}
              {!currentUser? <button type = "button" onClick={() => {navigate("/login")}}>Login</button> : <button type = "button" onClick={() => handleLogout()}>{currentUser.username}</button>}
            </ul>
          </div>
        </div>
      </nav>
    )
}

const NavLinks = (props) => {
  const {
    linkName,
    href,
    active
  } = props;

  return(
    <div>
      {(active === linkName) ?
              (<li className="nav-item">
                <a className="nav-link active" aria-current="page" href={href}>{linkName}</a>
              </li>) :
              (<li className="nav-item">
              <a className="nav-link" aria-current="page" href={href}>{linkName}</a>
            </li>) }
    </div>
  )
  
}

export default Navbar;