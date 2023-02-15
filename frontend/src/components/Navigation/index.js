import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className='header'>
            <ul className='nav-list'>
                <li>
                    <NavLink to="/"> A Place To Sleep</NavLink>
                </li>
                <li className={'profile-section'}>
                {sessionUser && (
                    <div>
                    <NavLink to="/spots/new" className='add-spot'>
                        Add A Spot!
                    </NavLink>
                    </div>
                )}
                {isLoaded && (
                <div className='profile-button'>
                    <ProfileButton user={sessionUser} />
                </div>
                )}
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;