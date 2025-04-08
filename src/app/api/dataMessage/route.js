//import onError from '../../../lib/middleware';
import DataMessage from '../../../../models/DataMessage';
import { NextResponse } from 'next/server';


export async function GET(){
    try {
        const dataMessage = await DataMessage.query();
        if (dataMessage) {
          return NextResponse.json(dataMessage);
        }
        return NextResponse.json([]);
        
    } catch (error) {
      return NextResponse.json({
        error: "Failed to fetch Message data",
        details: error.message
      });
    }
}

export async function PUT(request){
    try {
        
        const { dataPoints } = await request.json();
        const dataMessage = await DataMessage.query().where('type', dataPoints.type).insertAndFetch("message", dataPoints.message);
        return NextResponse.json(dataMessage);
    } catch (error) {
        return NextResponse.error(error);
    }
}


/*
fetch('/api/dataMessage', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        dataPoints:{
            type: "pH",
            message: "hi hi" 
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