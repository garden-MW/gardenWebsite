#run every minute
import serial
import json
import time
from datetime import datetime

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
time.sleep(2)

last_sensor_data = None

start_time = time.time()
timeout_seconds = 10  # Read for 10 seconds

while time.time() - start_time < timeout_seconds:
    try:
        line = ser.readline().decode('utf-8').strip()
        if line:
            try:
                sensor_data = json.loads(line)
                sensor_data['timestamp'] = datetime.utcnow().isoformat()

                last_sensor_data = sensor_data  # Keep only the latest valid reading
                print("Latest reading:", sensor_data)
            except json.JSONDecodeError:
                print("Invalid JSON received:", line)
    except Exception as e:
        print("Error:", e)
        break

ser.close()

# Now save ONLY the last reading
if last_sensor_data:
    try:
        # Load existing file if exists
        with open('ph_data.json', 'r') as f:
            existing_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = []

    existing_data.append(last_sensor_data)

    with open('ph_data.json', 'w') as f:
        json.dump(existing_data, f, indent=2)

    print("Saved latest data:", last_sensor_data)
else:
    print("No valid data received in this cycle.")
