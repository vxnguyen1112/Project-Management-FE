/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { NavLink} from "react-router-dom";
import {logout} from "store/reducers/authSlice";
import {clear} from 'store/reducers/listprojectSlide'
import { useDispatch } from "react-redux";

const NavBar=()=> {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <React.Fragment>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
           <img src="../../favicon.png" alt="" style={{width:'74px',marginLeft:"24px"}} />
            <i className="fas fa-code" />
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/home/account"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Account
              </NavLink>
            </li>
            <li className="nav-item"  >
              <NavLink
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={()=> {dispatch(logout());dispatch(clear())}}
              >
                Logout
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavBar;