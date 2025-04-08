"use client"

import {useState, useEffect} from "react";

export default function InfoBox({type}){
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        fetch(`/api/dataMessage`)
            .then( response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => console.error('Fetch error:', error))

            fetch(`/api/dataMessage`)
                .then(response => {
                    if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setMessage(data.filter((point) => point.type === type)[0].message);
                })
                .catch(error => console.error('Fetch error:', error)); 
    })
    
    return(
        <div className="bg-white w-full h-full rounded-lg flex items-center justify-center">
            <p className="p-3 text-center">{message}</p>
        </div>
    )
}