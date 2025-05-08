//API endpoint for validating data coming from raspberry pi

// app/api/remoteDataInput/route.js
import Nutrition from '../../../../models/Nutrition';
import PH from '../../../../models/PH';
import ORP from '../../../../models/ORP';
import { NextResponse } from 'next/server';


export async function POST(request){
  try{
    const body = await request.json();
    const records = Array.isArray(body) ? body : [body];
    
    if(records.length === 0){
      return NextResponse.json({error: "No records provided"}, {status: 400});
    }

    const { sensor_type } = records[0]; // model type
    let Model;
    switch (sensor_type) {
      case "Nutrition":
        Model = Nutrition;
        break;
      case "Ph":
        Model = PH;
      case "ORP":
        Model = ORP;
        break;
      default:
        return NextResponse.json({ error: `Unknown sensor type: ${sensor_type}` }, { status: 400 });
    }
    const validated = records.map(({sensor_type, ...record}) => Model.fromJson(record)); //drop 'sensor_type' property
    const inserted = await Model.query().insert(validated);

    return NextResponse.json({ success: true, data: inserted });
  } catch (err) {
    console.error("Validation or DB insert error:", err);
    return NextResponse.json({ status: 400, error: err }); 
  }
}



export async function DELETE(request) {
  try {
    const body = await request.json();
    const { date } = body;

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    const parsedDate= new Date(date);

    if (isNaN(parsedDate)) {
      return NextResponse.json({ error: "Invalid Date format" }, { status: 400 });
    }

    // Delete records older than the provided timestamp

    const deletedPH = await PH.query()
      .where('date', '<', parsedDate)
      .del();

      const deletedORP = await ORP.query()
      .where('date', '<', parsedDate)
      .del();

    // const deletedNutrition = await Nutrition.query()
    //   .where('timestamp', '<', parsedTimestamp)
    //   .del();

    return NextResponse.json({ success: true, deleted: {ph: deletedPH, orp: deletedORP}}); //deleted: ... + deletedNutrition 
  } catch (err) {
    console.error("Error while deleting data:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });;
  }
}
//FOR ONE POST REQ
// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { sensor_type } = body;

//     let Model;
//     switch (sensor_type) {
//       case "Nutrition":
//         Model = Nutrition;
//         break;
//       case "Ph":
//         Model = PH;
//         break;
//       default:
//         return NextResponse.json({ error: `Unknown sensor type: ${sensor_type}` }, { status: 400 });
//     }

//     const validated = Model.fromJson(body);
//     const inserted = await Model.query().insert(validated);

//     return NextResponse.json({ success: true, data: inserted });
//   } catch (err) {
//     console.error("Validation or DB insert error:", err);
//     return NextResponse.json({ status: 400 });
//   }
// }
