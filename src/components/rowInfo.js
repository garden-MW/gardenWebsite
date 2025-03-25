'use client'

import {useState} from 'react';
import PercIndicator from './percIndicator';


function computeNutritionPercentage(data){
    let totalPerc = 0;
    data.forEach(element => {
        if (element.value < 1800){
            totalPerc += element.value/1800 * 100;
        }if(element.value > 2600){
            totalPerc += 100 - (element.value/2600 * 100);
        }else{
            totalPerc += 100;
        }
    });
    return totalPerc/data.length;
}

function computePHPercentage(data){
    let totalPerc = 0;
    data.forEach(element => {
        if (element.value < 6.5){
            totalPerc += element.value/6.5 * 100;
        }if(element.value > 7.5){
            totalPerc += 100 - (element.value/7.5 * 100);
        }else{
            totalPerc += 100;
        }
    });
    return totalPerc/data.length;
}

export default function RowInfo({type, withDetails = false}){
    const [percentage, setPercentage] = useState(0);

    const title = type.charAt(0).toUpperCase() + type.slice(1);
    const colors = {
        water: '#3CC3DF',
        nutrition: '#6F4F4C',
        pH: '#2B7052',
    }

    fetch(`/api/${type}Data`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (type === 'nutrition'){
                setPercentage(computeNutritionPercentage(data));
            }else{
                setPercentage(computePHPercentage(data));
            }
        })
        .catch(error => console.error('Fetch error:', error)); 

    return(
        <div style={{borderColor: colors[type]}}className={`w-full h-[30%] border-l-[3px] flex flex-row items-center justify-between px-4`}>
            <div className="w-24 h-5 justify-start text-black text-xs font-normal font-['Inter']">{title}</div>
            <div className="w-24 h-5  justify-start text-black text-xs font-normal font-['Inter']">{percentage}%</div>
            <div className="w-24 h-5">
                <PercIndicator percentage={percentage}/>
            </div>
            <div className="w-24 h-5  justify-start text-black text-xs font-normal font-['Inter'] underline">Details</div>
        </div>
    )
}