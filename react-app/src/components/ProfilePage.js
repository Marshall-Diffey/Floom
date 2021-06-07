import React from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './NavBar';

const ProfilePage = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    if (!user) {
        return (
            <Redirect to='/'></Redirect>
        )
    }
    return (
        <div className="profilePage__div">
            {/* <div className="profilePage__navbarDiv"> */}
                <Navbar></Navbar>
            {/* </div> */}
            <div>
                Profile Page!
            </div>
        </div>
    )
}

export default ProfilePage;
