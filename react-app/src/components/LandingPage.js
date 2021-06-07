import React from 'react'
import { NavLink } from 'react-router-dom'

const LandingPage = () => {
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
            <button className="landingPage__loginButton">
                {/* <NavLink className="landingPage__login" to="/login"> */}
                    LOGIN
                {/* </NavLink> */}
            </button>
            <button className="landingPage__signupButton">
                SIGN UP
            </button>
            <button className="landingPage__demoButton">
                DEMO
            </button>
        </div>
    )
}

export default LandingPage
