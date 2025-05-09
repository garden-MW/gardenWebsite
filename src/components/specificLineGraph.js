'use client'
import React from 'react';
import {
  VictoryChart,
  VictoryGroup,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
} from "victory";
import TimeSelector from './timeSelector';


export default function SpecificLineGraph({type, data, setTime}) {
  
  let limit;
  let begin;

switch (type) {
  case "nutrition":
    limit = 4500;
    begin = 0;
    break;
  case "ph":
    limit = 7.5;
    begin = 5.5;
    break;
  case "orp":
    limit = 2000;
    begin = -2000;
    break;
  default:
    limit = 7.5;
    begin = 5.5;
}




  return (
    <div className="w-full h-full lg:border-none mt-1 flex flex-col justify-between">
    <VictoryChart
    domain={{ y: [begin, limit], }}
    containerComponent={
      <VictoryVoronoiContainer 
        voronoiDimension="x"
        labels={({ datum }) => `${datum.x} \n value: ${datum.y}`}
        labelComponent={
          <VictoryTooltip />
        }
      />
    }
    >
      <VictoryAxis
        tickValues={[]}
      />
      <VictoryAxis dependentAxis  />
      <VictoryGroup
        offset={0}
        style={{data: {width: 10}}}
      >
       { type === "nutrition" && <VictoryLine 
        style = {{ data: { color: "var(--color-nutrition)" } }}
        data={
          data
        } 
        /> }
        {type === "pH" &&
          <VictoryLine 
          style = {{data: { color: "var(--color-pH)" } }}
          data={
            data
          } 
          />
        }
        {type === "orp" &&
          <VictoryLine 
          style = {{data: { color: "var(--color-nutrition)" } }}
          data={
            data
          } 
          />
        }
        {data.length == 1 &&
          <VictoryScatter
          style={{ data: { fill: "#c43a31" } }}
          size={3}
          data={data}
        />
        }

      </VictoryGroup>
    </VictoryChart>



      <div 
      className="w-full h-[10%] justify-center items-center flex md:flex-row flex-col"
      >
        <div 
        className="pl-8 justify-center items-center gap-8 flex"
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
                        <div 
                        style={{backgroundColor: type === "nutrition" ? "var(--color-nutrition)" : "var(--color-pH)"}}
                        className="w-4 h-4 border-white border-solid border-[1px]" 
                        />
                    </div>
                </div>
                <h1
                className="text-black text-2xl font-mono font-[400] break-words" 
                >
                  {`${type.toUpperCase()} LEVEL`}
                </h1>
            </div>
        </div>
        <TimeSelector setTime={setTime}/>
      </div>
    </div>
  );
}