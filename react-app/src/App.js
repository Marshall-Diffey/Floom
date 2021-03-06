import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className="application">
        {/* <NavBar /> */}
        <Switch>
          <Route path="/" exact={true}>
            <LandingPage />
          </Route>
          {/* <Route path="/login" exact={true}>
            <LoginForm />
          </Route> */}
          {/* <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route> */}
          <ProtectedRoute path="/users" exact={true} >
            <UsersList/>
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true} >
            <User />
          </ProtectedRoute>
          <Route path="/users/:userId/profile" exact={true} >
            <ProfilePage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
