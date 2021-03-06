import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../store/session'
import LoginForm from './auth/LoginForm'
import SignUpForm from './auth/SignUpForm'
import Modal from 'react-modal'

const customStyles = {
    content : {
        top                   : '30%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        padding: 0,
        // background: 'none',
        // height: '100%',
    }
}

Modal.setAppElement('body');


const LandingPage = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const setLoginTrue = () => {
        setOpenLogin(true)
    }

    const setLoginFalse = () => {
        setOpenLogin(false)
    }

    const setSignupTrue = () => {
        setOpenSignup(true)
    }

    const setSignupFalse = () => {
        setOpenSignup(false)
    }

    const loginDemo = async () => {
        const email = "demo@aa.io";
        const password = "password";
        await dispatch(login(email, password))
    }

    if (user) {
        return <Redirect to={`/users/${user.id}/profile`} />;
    }

    return (
        <div className="landingPage">
            <div className="landingPage__welcome">
                WELCOME TO FLOOM
            </div>
            <div className="landingPage__info">
                A Personal Finance Management Website
            </div>
            <div className="landingPage__suggest1">
                Log in or sign up to budget your accounts to the moon
            </div>
            <div className="landingPage__suggest2">
                If you don't have an account, try the demo user to see sample accounts and monthly budgets
            </div>
            <button onClick={setLoginTrue} className="landingPage__loginButton">
                {/* <NavLink className="landingPage__login" to="/login"> */}
                    LOGIN
                {/* </NavLink> */}
            </button>
            <Modal
                isOpen={openLogin}
                onRequestClose={setLoginFalse}
                style={customStyles}
                id="loginModal"
                // className="loginModal"
            >
                <LoginForm></LoginForm>
            </Modal>
            <button onClick={setSignupTrue} className="landingPage__signupButton">
                SIGN UP
            </button>
            <Modal
                isOpen={openSignup}
                onRequestClose={setSignupFalse}
                style={customStyles}
            >
                <SignUpForm></SignUpForm>
            </Modal>
            <button onClick={loginDemo} className="landingPage__demoButton">
                DEMO
            </button>
        </div>
    )
}

export default LandingPage
