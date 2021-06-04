import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    dispatch(logout());
  };

  return <button onClick={onLogout} className="navbarLogoutProfile__logout">Logout</button>;
};

export default LogoutButton;
