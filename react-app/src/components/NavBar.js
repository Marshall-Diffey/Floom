import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  if (!user) {
    return (
      <nav className="navbar">
        <div className="navbar__logo">
          <NavLink to="/" exact={true} activeClassName="active" className="navbar__logoLink">
            <button className="navbar__logoLinkButton">
              Floom
            </button>
            {/* <img src="../Logo.png" ></img> */}
          </NavLink>
          {/* <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink> */}
        </div>
        <div className="navbarLoginSignup">
          <NavLink className="navbarLoginSignup__login" to="/login" exact={true} activeClassName="active">
            <button className="navbarLoginSignup__loginButton">Login</button>
          </NavLink>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            <button className="navbarLoginSignup__signupButton">Sign Up</button>
          </NavLink>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <NavLink to="/" exact={true} activeClassName="active" className="navbar__logo">
        Floom
        {/* <img src="../Logo.png" ></img> */}
      </NavLink>
      <div className="navbarLogoutProfile">
        <LogoutButton />
        <NavLink to="/users/:id" exact={true} activeClassName="active">
          <button>Profile</button>
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar;
