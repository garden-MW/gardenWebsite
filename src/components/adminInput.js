'use client'

import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import { useRouter } from "next/navigation";

export default function AdminInput() {
    const [status, setStatus] = useState("standard");
    const router = useRouter();

    const handleSubmit = () => {
        setStatus("loading");
        const type = document.querySelector('input[name="type"]:checked').id;
        const entryDate = document.getElementById('entryDate').value;
        const sensor = document.getElementById('sensor').value;
        const value = Number(document.getElementById('value').value);

        if (!type || !entryDate || !sensor || !value){
            setStatus("error");
            return;
        }

        fetch(`/api/${type}Data`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dataPoints:{
                    sensor,
                    value,
                    date: entryDate
                }
            })
        })
            .then(response => {
                if (!response.ok) {
                    setStatus("error");
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setStatus("success");
                return response.json();
            })
            .catch(error => console.error('Fetch error:', error)); 
    }

    const handleMessage = () => {
        setStatus("loading");
        const type = document.querySelector('input[name="Mtype"]:checked').value;
        const entryMessage = document.getElementById('entryMessage').value;

        if (!type || !entryMessage ){
            setStatus("error");
            return;
        }

        fetch(`/api/dataMessage`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dataPoints:{
                    type,
                    message: entryMessage
                }
            })
        })
            .then(response => {
                if (!response.ok) {
                    setStatus("error");
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setStatus("success");
                return response.json();
            })
            .catch(error => console.error('Fetch error:', error)); 
    }

    if (status === "error"){
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Alert onClose={() => { window.location.reload()}} severity="error">There was an issue uploading. Make sure all fields are completed. If so, please try again. Contact if problem persists.</Alert>
            </div>
        );
    }
    
    if (status === "loading"){ 
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Alert severity="info">Please wait...</Alert>
            </div>
        );
    }

    if (status === "success"){ 
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Alert severity="success" onClose={() => {window.location.reload()}}>Data has been added!</Alert>
            </div>
        );
    }

    //IF NEW SENSOR TYPES ARE ADDED, UPDATE THE CHOICES FOR THE RADIO INPUTS

    return (
        <div className="h-screen w-sceen flex flex-col space-y-10 justify-center items-center">
            <div className="flex flex-row w-full h-auto justify-evenly">

                {/** Entry Message Input */}
                <div className="h-full space-y-5 flex flex-col justify-center items-center">
                    <h1>Select Data Entry Type</h1>
                    <div>
                        <input type="radio" id="pH" name="Mtype" value="ph" defaultChecked/>
                        <label style={{marginRight: '2rem'}} htmlFor="pH">pH</label>
                        <input type="radio" id="nutrition" name="Mtype" value="nutrition"/>
                        <label htmlFor="nutrition">Nutrition</label>
                    </div>
                    <label htmlFor="entryMessage">Entry Page Message</label>
                    <textarea className="rounded-lg w-60 h-60" type="text" id="entryMessage" name="entryMessage" required/>
                    <button type="submit" onClick={() => handleMessage()} style={{backgroundColor: '#b55e3e', width: '12rem'}} className="rounded-lg" >Submit</button>
                </div>


                {/** Entry Value Input */}
                <div className="h-full space-y-5 flex flex-col justify-center items-center">
                    <h1>Select Data Entry Type</h1>
                    <div>
                        <input type="radio" id="pH" name="type" value="PH" defaultChecked/>
                        <label style={{marginRight: '2rem'}} htmlFor="pH">pH</label>
                        <input type="radio" id="nutrition" name="type" value="Nutrition"/>
                        <label htmlFor="nutrition">Nutrition</label>
                    </div>
                    <label htmlFor="entryDate">Entry (date and time)</label>
                    <input className="rounded-lg w-48" type="datetime-local" id="entryDate" name="entryDate" required/>
                    <label htmlFor="sensor">Sensor</label>
                    <input className="rounded-lg w-48" type="text" id="sensor" name="sensor" required/>
                    <label htmlFor="value">Value</label>
                    <input className="rounded-lg w-48" type="number" id="value" name="value" required/>
                    <button type="submit" onClick={() => handleSubmit()} style={{backgroundColor: '#b55e3e', width: '12rem'}} className="rounded-lg" >Submit</button>
                </div>
                
            </div>
    
            
            <button onClick={() => {router.push('/')}} style={{backgroundColor: '#b55e3e', width: '12rem'}} className="rounded-lg w-48">Back to Home</button>
        </div>
    )
}