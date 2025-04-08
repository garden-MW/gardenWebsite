'use client'
import RowInfo from "@/components/rowInfo"
import SpecificGraph from "@/components/specificGraph"
import {useState, useEffect} from 'react';
import formatData from '../../components/helperFuntions/formatData';
//^^^^  FORMATDATA NEEDS TO BE UPDATED FOR NEW DATA TYPE

export default function BlankData3() {   //change to appropriate name
    const [fullData, setFullData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [currentGraphData, setCurrentGraphData] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`/api/blankData3?sorted=true`)   //replace blankData3 with appropriate name (will also need to update the api route name)
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setFullData(data);
                setCurrentData(data[index]);
                setCurrentGraphData(formatData(data[index], 'Blank3')); //replace Blank3 with appropriate name
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
            setCurrentGraphData(formatData(fullData[next], 'Blank3')); //replace Blank3 with appropriate name
            setLoading(false);
        }else{
            let next = 0; 
            index === 0 ? next = fullData.length - 1 : next = index - 1; 
            setIndex(next);
            setCurrentData(fullData[next]);
            setCurrentGraphData(formatData(fullData[next], 'Blank3')); //replace Blank3 with appropriate name
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
        <div className=" p-10 flex flex-col h-screen w-screen space-y-5 items-center justify-evenly">
            <h1 className="text-3xl">Sensor: {currentData ? index + 1 : "No Current Data"}</h1>
            <div className="w-full h-auto lg:max-w-[50%] flex justify-center items-center">
                <button onClick={() => handleClick("previous")}>Previous</button>
                <div className="w-full h-auto lg:max-w-[50%] flex justify-center items-center">
                    <SpecificGraph type="blank3" data={currentGraphData} /> {/*replace blank3 with appropriate name*/}
                </div>
                <button onClick={() => handleClick("next")}>Next</button>
            </div>
            <div className="bg-white w-full h-44 rounded-lg flex items-center justify-center">
                <p className="p-3 text-center">Placeholder for info box</p>
            </div>
            <div className="flex flex-row w-full h-auto justify-between ">
                <div className=" h-auto flex items-center">
                    <RowInfo type={"blank3"} data={currentData} isAverage/> {/*replace blank3 with appropriate name*/}
                </div>
                <div className=" h-auto flex items-center">
                    <RowInfo type={"blank3"} data={currentData} isRecent/> {/*replace blank3 with appropriate name*/}
                </div>
            </div>
           
    
        </div>
    )
}