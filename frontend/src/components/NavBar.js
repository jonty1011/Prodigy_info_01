import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./NavBar.css";

function Navbar() {
    const isUserSignedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav className='navbar'>
            <Link to='/'>AuthDB</Link>
            <ul className='navbar-links'>
                {isUserSignedIn ? (
                    <>
                        <Link to='/account'><li>Account</li></Link>
                        <li><button onClick={handleSignOut}>Sign Out</button></li>
                    </>
                ) : (
                    <>
                        <Link to='/login'><li>Login</li></Link>
                        <Link to='/signup'><li>Signup</li></Link>
                    </>
                )}
            </ul>
          
        </nav>
    );
}

export default Navbar;
