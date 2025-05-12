#!/usr/bin/env/ python3
import serial
import json
import time
from datetime import datetime
from zoneinfo import ZoneInfo

PH_DATA_FILE = '/home/hydro/raspberry_pi_scripts/ph_data.json'

try:
    ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
    time.sleep(2)
except Exception as e:
    print("---Serial port could not be opened---")
    print("Error:", e)
    exit()

last_sensor_data = None

start_time = time.time()
timeout_seconds = 10  # Read for 10 seconds

while time.time() - start_time < timeout_seconds:
    try:
        line = ser.readline().decode('utf-8').strip()
        if line:
            try:
                sensor_data = json.loads(line)
                date = datetime.now(ZoneInfo("US/Eastern"))
                sensor_data['timestamp'] = date.isoformat()

                last_sensor_data = sensor_data  # Keep only the latest valid reading
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
        with open(PH_DATA_FILE, 'r') as f:
            existing_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = []

    existing_data.append(last_sensor_data)

    with open(PH_DATA_FILE, 'w') as f:
        json.dump(existing_data, f, indent=2)

    print("Saved latest data:", last_sensor_data)
else:
    print("No valid data received in this cycle.")
