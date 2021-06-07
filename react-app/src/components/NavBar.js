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
              Floom
            {/* <img src="../Logo.png" ></img> */}
          </NavLink>
          {/* <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink> */}
        </div>
        <div className="navbarLoginSignup">
          <NavLink className="navbarLoginSignup__login" to="/login" exact={true} activeClassName="active">Login</NavLink>
          <NavLink className="navbarLoginSignup__signup" to="/sign-up" exact={true} activeClassName="active">Sign Up</NavLink>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/" exact={true} activeClassName="active" className="navbar__logoLink">
          Floom
          {/* <img src="../Logo.png" ></img> */}
        </NavLink>
      </div>
      <div className="navbarLogout">
        <LogoutButton />
        {/* <NavLink to="/users/:id" exact={true} activeClassName="active">
          <button>Profile</button>
        </NavLink> */}
      </div>
    </nav>
  )
}

export default NavBar;
