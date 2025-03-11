'use client'
import { useEffect } from "react"

export default function PHData() {
    useEffect(() => {
        fetch('/api/pHData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Fetch error:', error)); 
    }, [])

    return (
        <div>
            <h1>pH Data</h1>
            <p>Here is the data for pH</p>
        </div>
    )
}