import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button } from 'reactstrap';
import { logout } from '../redux/loginSlice';


function NavBar() {

    const dispatch = useDispatch();
    const { isAuthenticated, user ={} } = useSelector((state) => state.login);
    const navigate = useNavigate()
  
    const handleLogout = () => {
      dispatch(logout());
    };

    useEffect(()=>{
        console.log("isAuth",isAuthenticated)
        if(!isAuthenticated){

        }
    },[isAuthenticated])
  return (
    <header>
    <strong>Plan Perfect</strong>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/signup">signup</Link>
            </li>
          </>
        ) : (
            <>
          <li>
            <Button className="btn-primary" onClick={() => handleLogout()}>
              Logout
            </Button>
          </li>
          <li >
            {`Hi, ${user?.firstName}`}
          </li>
            </>
        )}
      </ul>
    </nav>
  </header>
  )
}

export default NavBar
