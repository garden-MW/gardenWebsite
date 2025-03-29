'use client'

import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';

export default function PasswordPromptDialog({ onSubmit }){
    const router = useRouter();
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
    if (passwordIncorrect){
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Alert onClose={() => {setPassword(''); setPasswordIncorrect(false)}} severity="error">Incorrect password. Please try again.</Alert>
            </div>
        );
    }

    if (loading){
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Alert severity="info">Please wait...</Alert>
            </div>
        );
    }

    return (
        <div className=' flex flex-col items-center justify-center space-y-5 h-screen'>
            <h1 className="text-xl">Please enter admin password to gain access to this page.</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center">
                <input
                style={{marginBottom: '1rem'}}
                className="rounded-lg w-48"
                type='password'
                id='password'
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                />
                <button style={{backgroundColor: '#b55e3e', width: '12rem'}} type="submit" className="rounded-lg w-48" >Submit</button>
            </form>
            <button onClick={() => {router.push('/')}} style={{backgroundColor: '#b55e3e', width: '12rem'}} className="rounded-lg w-48">Back to Home</button>
        </div>
    );
}