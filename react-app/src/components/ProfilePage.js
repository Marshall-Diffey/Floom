import React from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './NavBar';
import Accounts from './Accounts';

const ProfilePage = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    if (!user) {
        return (
            <Redirect to='/'></Redirect>
        )
    }
    return (
        <div className="profilePage__outerDiv">
            {/* <div className="profilePage__navbarDiv"> */}
                <Navbar></Navbar>
            {/* </div> */}
            <div className="profilePage__innerDiv">
                <span id="profilePage__username">
                    {user.username}
                </span>
                <Accounts></Accounts>
            </div>
        </div>
    )
}

export default ProfilePage;
