import axios from 'axios';
import conf from '../config';
import { useState } from 'react';

const MemberForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    
    const createMember = () => {
        const dataMember = {
            username,
            email,
            password
        }

        const config = {
            method: 'post',
            url: `${conf.serverUrl}/api/member`,
            headers: {  'Content-Type': 'application/json' },
            data : dataMember
        };
        try {
            axios(config)
            .then((response) => {
                console.log(response.data)
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        createMember({username,email,password});
        setUsername('');
        setPassword('');
        setEmail('');
    }
    
    return (
        <div>
            <form onSubmit={handleSignup}>
                <div className="username">
                    <p>Username</p>
                    <input type="text" onChange={handleUsername} value={username}/>
                </div>
                <div className="password">
                    <p>Password</p>
                    <input type="password" onChange={handlePassword} value={password}/>
                </div>
                <div className="email">
                    <p>E-mail</p>
                    <input type="text" onChange={handleEmail} value={email}/>
                </div>
                <div className="btn">
                    <button type="submit">Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default MemberForm;