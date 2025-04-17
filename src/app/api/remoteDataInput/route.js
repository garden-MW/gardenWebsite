//API endpoint for validating data coming from raspberry pi

// app/api/remoteDataInput/route.js
import Nutrition from '../../../../models/Nutrition';
import PH from '../../../../models/PH';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { sensor_type } = body;

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

    const validated = Model.fromJson(body);
    const inserted = await Model.query().insert(validated);

    return NextResponse.json({ success: true, data: inserted });
  } catch (err) {
    console.error("Validation or DB insert error:", err);
    return NextResponse.json({ status: 400 });
  }
}
