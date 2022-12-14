/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { NavLink} from "react-router-dom";
import { removeStoredAuthToken } from 'react-project-management';
import "./navbar.css";

const NavBar=()=> {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <React.Fragment>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Project management
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
                to="/home/project-create"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Add project
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/blog"
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
                onClick={()=>removeStoredAuthToken()}
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