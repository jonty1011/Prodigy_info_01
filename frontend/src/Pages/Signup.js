import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import './Signup.css'

function SignUp() {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3001/register')
        .then((res) => {
            // console.log(res.data)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post('http://localhost:3001/register', { email, username, password })
        .then(() => {
            alert('Registration Successful')
            setEmail('')
            setUsername('')
            setPassword('')
            fetchUsers();
            navigate('/login')
        })
        .catch((error) => {
            console.log('Unable to register user')
        })

    }

    return (
        <div className="wrapper">
              <h1>SignUp</h1>
                <form className='signup-form' onSubmit={handleSubmit}>
                   
                <div className="input-box">
                <MdEmail className='icon'/>
                    <input 
                     
                        className='input-field'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    </div>
                    
                    <div className="input-box">
                    <FaUser className='icon' />
                    <input 
                        className='input-field'
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    </div>
                   
                    <div className="input-box">
                    <MdPassword className='icon'/>
                    <input 
                        className='input-field'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                  
                   </div>

                    <button className='signup-button' type='submit'>Sign Up</button>
                </form>
            </div>
    )
}

export default SignUp
