//API endpoint for validating data coming from raspberry pi

// app/api/remoteDataInput/route.js
import Nutrition from '../../../../models/Nutrition';
import PH from '../../../../models/PH';
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
        break;
      default:
        return NextResponse.json({ error: `Unknown sensor type: ${sensor_type}` }, { status: 400 });
    }
    const validated = records.map(record => Model.fromJson(record));
    const inserted = await Model.query().insert(validated);

    return NextResponse.json({ success: true, data: inserted });
  } catch (err) {
    console.error("Validation or DB insert error:", err);
    return NextResponse.json({ status: 400 }); 
  }
}



export async function DELETE(request) {
  try {
    const body = await request.json();
    const { timestamp } = body;

    if (!timestamp) {
      return NextResponse.json({ error: "Timestamp is required" }, { status: 400 });
    }

    const parsedTimestamp = new Date(timestamp);

    if (isNaN(parsedTimestamp)) {
      return NextResponse.json({ error: "Invalid timestamp format" }, { status: 400 });
    }

    // Delete records older than the provided timestamp
    // const deletedNutrition = await Nutrition.query()
    //   .where('timestamp', '<', parsedTimestamp)
    //   .del();
    const deletedPH = await PH.query()
      .where('timestamp', '<', parsedTimestamp)
      .del();

    return NextResponse.json({ success: true, deleted: deletedPH }); //deleted: deletedNutrition + deletedPH 
  } catch (err) {
    console.error("Error while deleting data:", err);
    return NextResponse.json({ error: "Error deleting data" }, { status: 500 });
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
