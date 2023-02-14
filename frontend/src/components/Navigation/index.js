import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className='header'>
            <ul className='nav-list'>
                <li>
                    <NavLink exact to="/"> A Place To Sleep</NavLink>
                </li>
                {isLoaded && (
                   <>
                   <Route exact path="/spots/current">
                        <li className='create-spot'>
                            Create a New Spot
                        </li>
                    </Route>
                    <li className='profile-button'>
                        <ProfileButton user={sessionUser} />
                    </li>
                    </> 
                )}
            </ul>
        </nav>
    );
}

export default Navigation;