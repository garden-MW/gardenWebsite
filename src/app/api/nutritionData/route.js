//import onError from '../../../lib/middleware';
import Nutrition from '../../../../models/Nutrition';
import { NextResponse } from 'next/server';

export async function GET(request){
    try {
        const nutrition = await Nutrition.query();
        if (nutrition) {
            return NextResponse.json(nutrition);
        }
        return NextResponse.json([]);
        
    } catch (error) {
        return NextResponse.error(error);
    }
}

export async function PUT(request){
    try {
        
        const { dataPoints } = await request.json();
        const nutrition = await Nutrition.query().insertAndFetch(dataPoints);
        return NextResponse.json(nutrition);
    } catch (error) {
        return NextResponse.error(error);
    }
}


/* How to get all pH data from PH table

fetch('/api/nutritionData', {
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

fetch('/api/nutritionData', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        dataPoints:{
            sensor: "nutrition2",
            value: 2006,
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