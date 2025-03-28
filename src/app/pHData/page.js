'use client'
import { useEffect } from "react"
import RowInfo from "@/components/rowInfo"
import SpecificGraph from "@/components/phGraph"

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
            .catch(error => console.error('Fetch error:', error)); 
    }, [])

    return (
        <div className="flex flex-col h-screen w-screen p-5 items-center justify-evenly">
            <div className="w-full h-auto lg:max-w-[50%] flex justify-center items-center">
                <SpecificGraph type="pH" />
            </div>
            <div className="flex flex-row w-full h-auto justify-between ">
                <div className=" h-auto flex items-center">
                    <RowInfo type={"pH"} isAverage/>
                </div>
                <div className=" h-auto flex items-center">
                    <RowInfo type={"pH"} isRecent/>
                </div>
            </div>
           
    
        </div>
    )
}