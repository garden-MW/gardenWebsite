'use client'
import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
} from "victory";

const data = [
  { x: "Sun", y: 1},
  { x: "Sun", y: 5},
  { x: "Sun", y: 3},
  { x: "Mon", y: 2},
  { x: "Tues", y: 3},
  { x: "Wed", y: 2 },
  { x: "Thurs", y: 1},
  { x: "Fri", y: 1},
  { x: "Sat", y: 1},
];

export default function GraphDash() {
  return (
    <div className="w-full h-full border-l-4 border-pH border-dashed mt-1">
    <VictoryChart
    domain={{ y: [0, 100] }}
    domainPadding={{ x: 20 }}
    >
      <VictoryGroup
        offset={12}
        style={{data: {width: 10}}}
      >
        <VictoryBar 
        style={{ data: { fill: "var(--color-water)" } }}
        data={
          [
            { x: "Sun", y: 30},
            { x: "Mon", y: 20},
            { x: "Tues", y: 30},
            { x: "Wed", y: 25 },
            { x: "Thurs", y: 79},
            { x: "Fri", y: 23},
            { x: "Sat", y: 13},
          ]
        } 
        />
        <VictoryBar 
        style = {{ data: { fill: "var(--color-nutrition)" } }}
        data={
          [
            { x: "Sun", y: 19},
            { x: "Mon", y: 28},
            { x: "Tues", y: 73},
            { x: "Wed", y: 98 },
            { x: "Thurs", y: 20},
            { x: "Fri", y: 1},
            { x: "Sat", y: 5},
          ]
        } 
        />
        <VictoryBar 
        style = {{data: { fill: "var(--color-pH)" } }}
        data={
          [
            { x: "Sun", y: 50},
            { x: "Mon", y: 23},
            { x: "Tues", y: 35},
            { x: "Wed", y: 26 },
            { x: "Thurs", y: 11},
            { x: "Fri", y: 66},
            { x: "Sat", y: 55},
          ]
        } 
        />

      </VictoryGroup>
    </VictoryChart>



      <div 
      className="w-[90%] h-[10%] justify-center items-center inline-flex"
      >
        <div 
        className="pl-8 pr-8 justify-center items-center gap-8 flex"
        >
            <div 
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