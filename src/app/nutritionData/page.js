'use client'
import RowInfo from "@/components/rowInfo"
import SpecificGraph from "@/components/specificGraph"
import {useState, useEffect} from 'react';
import formatData from '../../components/helperFuntions/formatData';

export default function NutritionData() {
     const [fullData, setFullData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [currentGraphData, setCurrentGraphData] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`/api/nutritionData?sorted=true`)
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setFullData(data);
                setCurrentData(data[index]);
                setCurrentGraphData(formatData(data[index], 'Nutrition'));
                setLoading(false);
            })
            .catch(error => console.error('Fetch error:', error)); 
        }, [])

    const handleClick = (direction) => {
        setLoading(true);
        if (direction === "next"){
            let next = 0; 
            index === fullData.length - 1 ? next = 0 : next = index + 1; 
            setIndex(next);
            setCurrentData(fullData[next]);
            setCurrentGraphData(formatData(fullData[next], "Nutrition"));
            setLoading(false);
        }else{
            let next = 0; 
            index === 0 ? next = fullData.length - 1 : next = index - 1; 
            setIndex(next);
            setCurrentData(fullData[next]);
            setCurrentGraphData(formatData(fullData[next], "Nutrition"));
            setLoading(false);
        }
    }

    if (loading){
        return (
            <div className="p-10 flex flex-col h-screen w-screen space-y-5 items-center justify-evenly">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen w-screen p-10 space-y-5 items-center justify-evenly">
            <h1 className="text-3xl">Sensor: {currentData ? index + 1 : "No Current Data"}</h1>
            <div className="w-full h-auto lg:max-w-[50%] flex justify-center items-center">
                <button onClick={() => handleClick("previous")}>Previous</button>
                <div className="w-full h-auto lg:max-w-[50%] flex justify-center items-center">
                    <SpecificGraph type="nutrition" data={currentGraphData} />
                </div>
                <button onClick={() => handleClick("next")}>Next</button>
            </div>
            <div className="bg-white w-full h-44 rounded-lg flex items-center justify-center">
                <p className="p-3 text-center">Placeholder for info box</p>
            </div>
            <div className="flex flex-row w-full h-auto justify-between ">
                <div className=" w-full h-auto flex items-center">
                    <RowInfo type={"nutrition"} data={currentData} isAverage/>
                </div>
                <div className=" w-full h-auto flex items-center">
                    <RowInfo type={"nutrition"} data={currentData} isRecent/>
                </div>
            </div>
           
    
        </div>
    )
}