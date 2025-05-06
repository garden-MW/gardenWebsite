'use client'
import {useState, useEffect} from 'react';
import formatData from '../../components/helperFuntions/formatData';
import SpecificLineGraph from "@/components/specificLineGraph";

export default function PHData() {
    const [fullData, setFullData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [currentGraphData, setCurrentGraphData] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(1);
    useEffect(() => {
        fetch(`/api/pHData?sorted=true&time=${time}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setFullData(data);
                setCurrentData(data[index]);
                setCurrentGraphData(formatData(data[index], 'PH'));
                setLoading(false);
            })
            .catch(error => console.error('Fetch error:', error)); 
      }, [time])

      const handleClick = (direction) => {
        setLoading(true);
        if (direction === "next"){
            if (fullData.length === 1){
                setLoading(false);
                return;
            }
            let next = 0; 
            index === fullData.length - 1 ? next = 0 : next = index + 1; 
            setIndex(next);
            setCurrentData(fullData[next]);
            setCurrentGraphData(formatData(fullData[next], "PH"));
            setLoading(false);
        }else{
            if (fullData.length === 1){
                setLoading(false);
                return;
            }
            let next = 0; 
            index === 0 ? next = fullData.length - 1 : next = index - 1; 
            setIndex(next);
            setCurrentData(fullData[next]);
            setCurrentGraphData(formatData(fullData[next], "PH"));
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
        <div className=" flex flex-col h-screen w-screen items-center justify-evenly overflow-scroll">
            <div className="w-full h-auto lg:max-w-[90%] flex justify-center items-center">
                <div className="w-full h-auto lg:max-w-[50%] flex flex-col justify-center items-center">
                    <SpecificLineGraph type="pH" data={currentGraphData} setTime={setTime} />
                </div>
            </div>
        </div>
    )
}