'use client'
import React from 'react';
import {useState, useEffect} from 'react';
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
} from "victory";
import computeNutritionPercentage from './helperFuntions/nutritionPerc';
import computePHPercentage from './helperFuntions/pHPerc';


function formatData(input, type){
  const final = [];
  const Sun = [];
  const Mon = [];
  const Tues = [];
  const Wed = [];
  const Thurs = [];
  const Fri = [];
  const Sat = [];

  input.forEach((element) => {
    const day = new Date(element.date).getDay();
    if (day === 0){
      Sun.push(element.value);
    }else if(day === 1){
      Mon.push(element.value);
    }else if(day === 2){
      Tues.push(element.value);
    }
    else if(day === 3){
      Wed.push(element.value);
    }
    else if(day === 4){
      Thurs.push(element.value);
    }
    else if(day === 5){
      Fri.push(element.value);
    }
    else if(day === 6){
      Sat.push(element.value);
    }
  })

  const days = [{"Sun" : Sun}, {"Mon": Mon}, {"Tues": Tues}, {"Wed": Wed}, {"Thurs": Thurs}, {"Fri" : Fri}, {"Sat": Sat}];

  days.forEach((day, index) => {
    let sum = 0;
    const dayArray = Object.keys(day);
    if (day[dayArray[0]].length === 0){
      final.push({x: dayArray[0], y: 0});
    }else{
      day[dayArray[0]].forEach((value) => {
        sum += +value;
      })
      if (type === 'Nutrition'){
        final.push({x: dayArray[0], y: computeNutritionPercentage([sum/(day[dayArray[0]].length)])});
      }else{
        final.push({x: dayArray[0], y: computePHPercentage([sum/(day[dayArray[0]].length)])});
      }
      
    }
  })
  return final;
}

export default function GraphDash() {
  const [nutritionData, setNutritionData] = useState([]);
  const [pHData, setPHData] = useState([]);
  useEffect(() => {
    fetch(`/api/nutritionData`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setNutritionData(formatData(data, 'Nutrition'));
        })
        .catch(error => console.error('Fetch error:', error)); 

    fetch(`/api/pHData`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setPHData(formatData(data, 'PH'));
        })
        .catch(error => console.error('Fetch error:', error)); 
  }, [])

  return (
    <div className="w-full h-full border-l-4 border-pH border-dashed lg:border-none mt-1 flex flex-col justify-between">
    <VictoryChart
    domain={{ y: [0, 100] }}
    domainPadding={{ x: 20 }}
    >
      <VictoryGroup
        offset={12}
        style={{data: {width: 10}}}
      >
        {/*<VictoryBar 
        style={{ data: { fill: "var(--color-water)" } }}
        data={
        } 
        />*/}
        <VictoryBar 
        style = {{ data: { fill: "var(--color-nutrition)" } }}
        data={
          nutritionData
        } 
        />
        <VictoryBar 
        style = {{data: { fill: "var(--color-pH)" } }}
        data={
          pHData
        } 
        />

      </VictoryGroup>
    </VictoryChart>



      <div 
      className="w-[90%] h-[10%] justify-center items-center flex"
      >
        <div 
        className="pl-8 pr-8 justify-center items-center gap-8 flex"
        >
            {/*<div 
            className="flex items-center p-4 gap-4 justify-start"
            >
                <div 
                className="w-4 h-4 flex items-center justify-center"
                >
                    <div
                    className="w-4 h-4 flex flex-col justify-start items-start relative" 
                    >
                        <div className="w-2 h-2 bg-water border-white border-solid border-[1px]"/>
                    </div>
                </div>
                <div
                className="text-black text-[12px] font-mono font-[400] break-words" 
                >
                  Water Levels
                </div>
            </div>*/}
            <div 
            className="flex items-center p-4 gap-4 justify-start"
            >
                <div 
                className="w-4 h-4 flex items-center justify-center"
                >
                    <div 
                    className="w-4 h-4 flex flex-col justify-start items-start relative"
                    >
                        <div
                        className="w-2 h-2 bg-nutrition border-white border-solid border-[1px]" />
                    </div>
                </div>
                <div
                className="text-black text-[12px] font-mono font-[400] break-words" 
                >
                  Nutrition
                </div>
            </div>
            <div
            className="flex items-center p-4 gap-4 justify-start" 
            >
                <div 
                className="w-4 h-4 flex items-center justify-center"
                >
                    <div 
                    className="w-4 h-4 flex flex-col justify-start items-start relative"
                    >
                        <div 
                        className="w-2 h-2 bg-pH border-white border-solid border-[1px]" 
                        />
                    </div>
                </div>
                <div
                className="text-black text-[12px] font-mono font-[400] break-words" 
                >
                  pH
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}