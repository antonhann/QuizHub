import {useNavigate} from 'react-router-dom';
const Navbar = (props) => { 
    const {
      active,
      currentUser
    } = props
    const navigate = useNavigate();
    const handleLogout = async () => {
      let response = await fetch("http://localhost:3003/logout",{
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const res = await response.json();
      if(res.deleted){
        window.location.reload();
      }else{
        console.log("couldnt log out")
      }
    }
    return(
      <nav className="navbar navbar-expand-lg" data-bs-theme = "dark">
          <div className="container-fluid">
            <a className="navbarBrand" href="/">QuizHub</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
              <ul className="center navbar-nav ms-auto">
                <div style = {{cursor: "pointer"}}onClick={() => navigate("/Create",{state:{new: true, id: 0}})}>
                  <NavLinks linkName = "Create" active = {active}/>
                </div>
                
                <NavLinks linkName = "Study Sets" active = {active} href = "/study-sets"/>
                <NavLinks linkName = "LinkThree" active = {active} href = "/"/>
                {/* <button type = "button" onClick={() => {navigate("/login")}}>Login</button> */}
                {Object.keys(currentUser).length === 0 ? <button className = "logButton" type = "button" onClick={() => {navigate("/login")}}>Login</button> : <button className = "logButton"  type = "button" onClick={() => handleLogout()}>Logout</button>}
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
    active,
  } = props;
  return(
    <div>
      {(active === linkName) ?
              (<li className="nav-item" onClick = {onclick}>
                <a className="navLink active" aria-current="page" href={href}>{linkName}</a>
              </li>) :
              (<li className="nav-item">
              <a className="navLink" aria-current="page" href={href}>{linkName}</a>
            </li>) }
    </div>
  )
  
}

export default Navbar;