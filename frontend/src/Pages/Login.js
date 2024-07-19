import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
            .get('http://localhost:3001/register')
            .then((res) => {
                console.log(res.data);
            });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios
                .post('http://localhost:3001/login', { username, password });
            const token = response.data.token;
            alert('Login successful');
            setUsername('');
            setPassword('');
            fetchUsers();
            navigate('/account');
            window.location.reload();
            localStorage.setItem('token', token);
        } catch (error) {
            console.log('Login Error', error);
        }
    };

    return (
        <div className="wrapper">
            <h1>Login</h1>
            <form className='login-form' onSubmit={handleLogin}>
                
                <div className="input-box">   
                    <FaUser className='icon' />
                    <input 
                        className='input-field'
                        type='text'
                        placeholder='Username'  
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="input-box">
                  
                    <FaLock className='icon' />
                    <input 
                        className='input-field'
                        type='password'
                        placeholder='Password' 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button className='login-button' type='submit'>Login</button>
            </form>
        </div>
    );
}

export default Login;
