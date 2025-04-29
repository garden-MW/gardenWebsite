'use client'
import RowInfo from "@/components/rowInfo"
import SpecificLineGraph from "@/components/specificLineGraph"
import {useState, useEffect} from 'react';
import formatData from '../../components/helperFuntions/formatData';
import InfoBox from "@/components/infoBox";

export default function NutritionData() {
     const [fullData, setFullData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [currentGraphData, setCurrentGraphData] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(1);
    useEffect(() => {
        fetch(`/api/nutritionData?sorted=true&time=${time}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setFullData(data);
                setCurrentData(data ? data[index] : []);
                setCurrentGraphData(formatData(data.length > 0 ? data[index] : [], 'Nutrition'));
                setLoading(false);
            })
            .catch(error => console.error('Fetch error:', error)); 
        }, [time])

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
        <div className="flex flex-col h-screen w-screen p-10 space-y-5 items-center justify-evenly overflow-scroll">
            <h1 className="text-3xl">Sensor: {currentData ? index + 1 : "No Current Data"}</h1>
            <div className="w-full h-auto lg:max-w-[90%] flex justify-center items-center">
                <button onClick={() => handleClick("previous")}>Previous</button>
                <div className="w-full h-auto lg:max-w-[50%] flex justify-center items-center">
                    <SpecificLineGraph type="nutrition" data={currentGraphData} setTime={setTime} />
                </div>
                <button onClick={() => handleClick("next")}>Next</button>
            </div>
            <div className="w-full h-auto">
                <InfoBox type="nutrition" />
            </div>
            <div className="flex flex-col md:flex-row w-full h-auto md:justify-between  ">
                <div className=" w-full h-auto flex items-center mb-3 md:mb-0">
                    <RowInfo type={"nutrition"} data={currentData} isAverage/>
                </div>
                <div className=" w-full h-auto flex items-center">
                    <RowInfo type={"nutrition"} data={currentData} isRecent/>
                </div>
            </div>
           
    
        </div>
    )
}