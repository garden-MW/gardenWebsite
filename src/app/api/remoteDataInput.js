//API endpoint for validating data coming from raspberry pi
import { createRouter } from 'next-connect';
import Nutrition from '../../../models/Nutrition';
import PH from '../../../models/PH';

const router = createRouter();

router
    .post(async (req, res) => {
        const { sensor_type } = req.body;

        let Model;
        switch (sensor_type) {
            case "Nutrition":
                Model = Nutrition;
                break;
            case "Ph":
                Model = PH;
                break;
            default:
            return res.status(400).json({ error: `Unknown sensor type: ${sensor_type}` });
        }

        try {
            const validated = Model.fromJson(req.body);
            const inserted = await Model.query().insert(validated); // write directly to database once validated
            return res.status(200).json({ success: true, data: validated });
          } catch (err) {
            return res.status(400).json({ error: 'Validation failed', message: err.message });
          }
    })


export default router.handler();
