'use client'
import RowInfo from "@/components/rowInfo"
import SpecificGraph from "@/components/specificGraph"
import {useState, useEffect} from 'react';
import formatData from '../../components/helperFuntions/formatData';
import InfoBox from "@/components/infoBox";
//^^^^  FORMATDATA NEEDS TO BE UPDATED FOR NEW DATA TYPE

export default function BlankData2() {   //change to appropriate name
    const [fullData, setFullData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [currentGraphData, setCurrentGraphData] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`/api/blankData2?sorted=true`)   //replace blankData2 with appropriate name (will also need to update the api route name)
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setFullData(data);
                setCurrentData(data[index]);
                setCurrentGraphData(formatData(data[index], 'Blank2')); //replace Blank2 with appropriate name
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
            setCurrentGraphData(formatData(fullData[next], 'Blank2')); //replace Blank2 with appropriate name
            setLoading(false);
        }else{
            let next = 0; 
            index === 0 ? next = fullData.length - 1 : next = index - 1; 
            setIndex(next);
            setCurrentData(fullData[next]);
            setCurrentGraphData(formatData(fullData[next], 'Blank2')); //replace Blank2 with appropriate name
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
                    <SpecificGraph type="blank2" data={currentGraphData} /> {/*replace blank2 with appropriate name*/}
                </div>
                <button onClick={() => handleClick("next")}>Next</button>
            </div>
            <div className="w-full h-auto">
                <InfoBox type="ph" />
            </div>
            <div className="flex flex-row w-full h-auto justify-between ">
                <div className=" h-auto flex items-center">
                    <RowInfo type={"blank2"} data={currentData} isAverage/> {/*replace blank2 with appropriate name*/}
                </div>
                <div className=" h-auto flex items-center">
                    <RowInfo type={"blank2"} data={currentData} isRecent/> {/*replace blank2 with appropriate name*/}
                </div>
            </div>
           
    
        </div>
    )
}