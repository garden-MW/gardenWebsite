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
    <div>
      <h1 className="text-water">Testing testing</h1>
    <VictoryChart
    domain={{ y: [0.5, 5.5] }}
    domainPadding={{ x: 40 }}

    >
      <VictoryGroup
        offset={12}
        style={{data: {width: 10}}}
      >
        <VictoryBar 
        data={
          [
            { x: "Sun", y: 3},
            { x: "Mon", y: 2},
            { x: "Tues", y: 3},
            { x: "Wed", y: 2 },
            { x: "Thurs", y: 1},
            { x: "Fri", y: 1},
            { x: "Sat", y: 1},
          ]
        } 
        />
        <VictoryBar 
        data={
          [
            { x: "Sun", y: 1},
            { x: "Mon", y: 2},
            { x: "Tues", y: 3},
            { x: "Wed", y: 2 },
            { x: "Thurs", y: 1},
            { x: "Fri", y: 1},
            { x: "Sat", y: 1},
          ]
        } 
        />
        <VictoryBar 
        data={
          [
            { x: "Sun", y: 5},
            { x: "Mon", y: 2},
            { x: "Tues", y: 3},
            { x: "Wed", y: 2 },
            { x: "Thurs", y: 1},
            { x: "Fri", y: 1},
            { x: "Sat", y: 1},
          ]
        } 
        />

      </VictoryGroup>
    </VictoryChart>
    </div>
  );
}