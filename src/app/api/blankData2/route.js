//import onError from '../../../lib/middleware';
import BlankData2 from '../../../../models/PH'; //will need to update models, seed data, next, etc. 
import { NextResponse } from 'next/server';

const normalizeToLocalMidnight = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0); // Set time to midnight in local time
  return normalized;
};

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const sorted = searchParams.get("sorted");
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const offsetToLastSunday = (currentDay + 7) % 7;
    let lastSundayDate = new Date(currentDate);
    lastSundayDate.setDate(currentDate.getDate() - offsetToLastSunday);
    lastSundayDate = normalizeToLocalMidnight(lastSundayDate);
    try {
        const blankData2 = await BlankData2.query().orderBy('sensor', 'asc');
        if (blankData2) {
          const weekData = blankData2.filter((input) => {
            const inputDate = normalizeToLocalMidnight(new Date(input.date));
            return inputDate >= lastSundayDate;
         })
         if (weekData.length > 0 && sorted){
          const groupedData = [];
          let current = weekData[0].sensor;
          let currentArray = [];
          weekData.forEach((element) => {
            if (element.sensor === current){
              currentArray.push(element);
            }else{
              groupedData.push(currentArray);
              currentArray = [element];
              current = element.sensor;
            }
          })
          groupedData.push(currentArray);
          return NextResponse.json(groupedData);
         }


          return NextResponse.json(weekData);
        }
        return NextResponse.json([]);
        
    } catch (error) {
      return NextResponse.json({
        error: "Failed to fetch blankData2 data",
        details: error.message
      });
    }
}

export async function PUT(request){
    try {
        
        const { dataPoints } = await request.json();
        const blankData2 = await BlankData2.query().insertAndFetch(dataPoints);
        return NextResponse.json(blankData2);
    } catch (error) {
        return NextResponse.error(error);
    }
}


/* How to get all pH data from PH table

fetch('/api/pHData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Fetch error:', error));  */

/* How to add entirely new pH entry

fetch('/api/pHData', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        dataPoints:{
            sensor: "pH2",
            value: 7.5,
            date: "2024-11-12T00:00:00.000Z"
        }
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Fetch error:', error)); */