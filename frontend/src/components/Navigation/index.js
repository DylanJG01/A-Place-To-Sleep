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
                <li classname="home-nav-link">
                    <NavLink to="/" classname="home-nav-link">
                    <div className='ptr-icon'>
                    {/* <h4>A Place To Sleep</h4> */}
                    <div id='site-icon-div'>
                    <img id='site-icon-img' src='https://cdn-icons-png.flaticon.com/512/3537/3537857.png' alt={'Gravestone'}/>
                    </div>
                    <div className='ptr-text'>A Place To Sleep</div>
                    </div>
                    </NavLink>
                </li>
                <li className='profile-section'>
                {sessionUser && (
                    <div className='add-a-spot-div'>
                    <NavLink to="/spots/new" className='add-spot'>
                        Create a New Spot
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
