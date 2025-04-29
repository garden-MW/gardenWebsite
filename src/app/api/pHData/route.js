//import onError from '../../../lib/middleware';
import PH from '../../../../models/PH';
import { NextResponse } from 'next/server';

const normalizeToLocalMidnight = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0); // Set time to midnight in local time
  return normalized;
};

/*
 original code to get data from sunday onwards incase there is a decision to switch back to weekly

const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const offsetToLastSunday = (currentDay + 7) % 7;
    let lastSundayDate = new Date(currentDate);
    lastSundayDate.setDate(currentDate.getDate() - offsetToLastSunday);
    lastSundayDate = normalizeToLocalMidnight(lastSundayDate);
*/

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const sorted = searchParams.get("sorted");
    const currentDate = new Date(new Date().toLocaleDateString());
    const threeDaysAgo = normalizeToLocalMidnight(new Date(currentDate.toLocaleDateString()));
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    try {
        const ph = await PH.query().orderBy('sensor_type', 'asc');
        if (ph) {
          const weekData = ph.filter((input) => {
            const inputDate = normalizeToLocalMidnight(new Date(input.date));
            return currentDate >= inputDate && inputDate >= threeDaysAgo;
         })
         if (weekData.length > 0 && sorted){
          const groupedData = [];
          let current = weekData[0].sensor_type;
          let currentArray = [];
          weekData.forEach((element) => {
            if (element.sensor_type === current){
              currentArray.push(element);
            }else{
              groupedData.push(currentArray);
              currentArray = [element];
              current = element.sensor_type;
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
        error: "Failed to fetch pH data",
        details: error.message
      });
    }
}

export async function POST(request){
    try {
        
        const { dataPoints } = await request.json();
        const ph = await PH.query().insertAndFetch(dataPoints);
        return NextResponse.json(ph);
    } catch (error) {
        return NextResponse.error(error);
    }
}
