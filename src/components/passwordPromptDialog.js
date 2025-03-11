'use client'

import React, { useState } from 'react';

export default function PasswordPromptDialog({ onSubmit }){
    const [password, setPassword] = useState('');
    const [passwordIncorrect, setPasswordIncorrect] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) =>{
            e.preventDefault();
            setLoading(true);
            const request = await fetch('/api', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });
            if (request.status !== 200){
                return setPasswordIncorrect(true), setLoading(false);
            }else{
                window.location.reload();
            }       
    }
    return (
        <div className='password-prompt-dialog'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='password'>Password:</label>
                <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" >Submit</button>
            </form>
        </div>
    );
}