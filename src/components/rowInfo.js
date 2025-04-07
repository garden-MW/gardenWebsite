'use client'

import {useState, useEffect} from 'react';
import PercIndicator from './percIndicator';
import computeNutritionPercentage from './helperFuntions/nutritionPerc';
import computePHPercentage from './helperFuntions/pHPerc';

function handleRecent (data){
    if (!data) {
        return {value: "N/A"}
    }
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    return data[0];
}

export default function RowInfo({type, data, withDetails = false, isAverage = false, isRecent = false }){
    const [percentage, setPercentage] = useState(0);
    const [negPerc, setNegPerc] = useState(0);
    const [posPerc, setPosPerc] = useState(0);

    const title = type.charAt(0).toUpperCase() + type.slice(1);
    const colors = {
        water: '#3CC3DF',
        nutrition: '#6F4F4C',
        pH: '#2B7052',
    }

    useEffect(() => {
        if (!withDetails){
            if (type === 'nutrition'){
                if (isRecent){
                    setPercentage(handleRecent(data));
                }else{
                    if (isAverage){
                        setPercentage(computeNutritionPercentage(data, true));
                    }else{
                        const result = computeNutritionPercentage(data, false, false, true);
                        setNegPerc(result.neg);
                        setPosPerc(result.pos);
                    }
                }
            }else{
                if (isRecent){
                    setPercentage(handleRecent(data));
                }else{
                    if (isAverage){
                        setPercentage(computePHPercentage(data, true));
                    }else{
                        const result = computePHPercentage(data, false, false, true);
                        setNegPerc(result.neg);
                        setPosPerc(result.pos);
                    }
                }
            }
        }else{
            fetch(`/api/${type}Data`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (type === 'nutrition'){
                if (isRecent){
                    setPercentage(handleRecent(data));
                }else{
                    if (isAverage){
                        setPercentage(computeNutritionPercentage(data, true));
                    }else{
                        const result = computeNutritionPercentage(data, false, false, true);
                        setNegPerc(result.neg);
                        setPosPerc(result.pos);
                    }
                }
            }else{
                if (isRecent){
                    setPercentage(handleRecent(data));
                }else{
                    if (isAverage){
                        setPercentage(computePHPercentage(data, true));
                    }else{
                        const result = computePHPercentage(data, false, false, true);
                        setNegPerc(result.neg);
                        setPosPerc(result.pos);
                    }
                }
            }
        })
        .catch(error => console.error('Fetch error:', error));
        }
        
    }, [data])

    if (isAverage){
        return(
            <div style={{borderColor: colors[type]}}className={`w-full border-l-[3px] flex flex-row items-center justify-between px-4`}>
                <h1 className="w-24 h-5 justify-start text-black text-xl font-normal font-['Inter']">Average</h1>
                <h1 className="w-24 h-5  justify-start text-black text-xl font-normal font-['Inter']">{percentage ? percentage : 'N/A' }</h1>
                <div className="w-24 h-5">
                    <PercIndicator percentage={percentage ? percentage : 100}/>
                </div>
            </div>
        )
    }else if (isRecent){
        return(
            <div style={{borderColor: colors[type]}}className={`w-full border-l-[3px] flex flex-row items-center justify-between px-4`}>
                <h1 className="w-32 h-5 justify-start text-black text-xl font-normal font-['Inter']">Most Recent</h1>
                <h1 className="w-24 h-5  justify-start text-black text-xl font-normal font-['Inter']">{percentage ? percentage.value : 'N/A'}</h1>
                <div className="w-24 h-5">
                    <PercIndicator percentage={percentage ? percentage.value : 100}/>
                </div>
            </div>
        )
    }

    return(
        <div style={{borderColor: colors[type]}}className={`w-full border-l-[3px] flex flex-row items-center justify-between px-4`}>
            <h1 className="w-24 h-5 justify-start text-black text-xl font-normal font-['Inter']">{title}</h1>
            <div>
                <h1 className=" h-5  justify-start text-black text-xl font-normal font-['Inter']">{ Number.isNaN(posPerc) ? 'N/A' : posPerc}%</h1>
                <h1 className=" h-5  justify-start text-black text-xl font-normal font-['Inter']">{Number.isNaN(negPerc) ? 'N/A' : negPerc}%</h1>
            </div>
           <div className="pt-4">
                <div className="w-24 h-5 justify-start">
                    <PercIndicator percentage={posPerc}/>
                </div>

                <div className="w-24 h-5">
                    <PercIndicator percentage={negPerc}/>
                </div>
           </div>
            {withDetails && <a href={`/${type}Data`} className="w-24 h-5  justify-start text-black text-lg font-normal font-['Inter']">Details</a>}
        </div>
    )
}