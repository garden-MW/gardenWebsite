'use client'
import React from 'react';
import {useState, useEffect} from 'react';
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
} from "victory";
import formatData from './helperFuntions/formatData';

export default function SpecificGraph({type, data}) {
  const limit = type === "nutrition" ? 3000 : 9;

  return (
    <div className="w-full h-full lg:border-none mt-1 flex flex-col justify-between">
    <VictoryChart
    domain={{ y: [0, limit] }}
    domainPadding={{ x: 20 }}
    >
      <VictoryGroup
        offset={12}
        style={{data: {width: 10}}}
      >
       { type === "nutrition" && <VictoryBar 
        style = {{ data: { fill: "var(--color-nutrition)" } }}
        data={
          data
        } 
        /> }
        {type === "pH" && <VictoryBar 
        style = {{data: { fill: "var(--color-pH)" } }}
        data={
          data
        } 
        />}

      </VictoryGroup>
    </VictoryChart>



      <div 
      className="w-[90%] h-[10%] justify-center items-center flex"
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
      </div>
    </div>
  );
}