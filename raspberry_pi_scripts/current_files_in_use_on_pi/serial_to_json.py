#!/usr/bin/env/ python3
import serial
import json
import time
from datetime import datetime
from zoneinfo import ZoneInfo

PH_DATA_FILE = '/home/hydro/raspberry_pi_scripts/ph_data/ph_data.json'
ORP_DATA_FILE = '/home/hydro/raspberry_pi_scripts/orp_data/orp_data.json'
EC_DATA_FILE = '/home/hydro/raspberry_pi_scripts/ec_data/ec_data.json'

try:
    ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
    time.sleep(2)
except Exception as e:
    print("---Serial port could not be opened---")
    print("Error:", e)
    exit()

last_sensor_data_ph = None
last_sensor_data_orp = None
last_sensor_data_ec = None
#last_sensor_data_# = None

start_time = time.time()
timeout_seconds = 20  # Read for 10 seconds

while time.time() - start_time < timeout_seconds:
    try:
        line = ser.readline().decode('utf-8').strip()
        if line:
            try:
                sensor_data = json.loads(line)
                sensor_type = sensor_data.get("sensor")
                
                #adding timestamp
                date = datetime.now(ZoneInfo("US/Eastern"))
                sensor_data['timestamp'] = date.isoformat()

                if sensor_type == "Ph":
                    last_sensor_data_ph = sensor_data
                elif sensor_type == "ORP":
                    last_sensor_data_orp = sensor_data
                elif sensor_type == "Ec":
                    last_sensor_data_ec = sensor_data
                    
                #SPOT FOR ANOTHER SENSOR
                # elif sensor_type == "#":
                #     last_sensor_data_# = sensor_data
                
                else:
                    print("Uknown sensor: ", sensor_type)
                    
            except json.JSONDecodeError:
                print("Invalid JSON received:", line)
    except Exception as e:
        print("Error:", e)
        break

ser.close()

# Now save ONLY the last reading for designated sensor

#ph
if last_sensor_data_ph:
    try:
        # Load existing file if exists
        with open(PH_DATA_FILE, 'r') as f:
            existing_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = []

    existing_data.append(last_sensor_data_ph)

    with open(PH_DATA_FILE, 'w') as f:
        json.dump(existing_data, f, indent=2)

    print("Saved latest data:", last_sensor_data_ph)
else:
    print("No valid data received in this cycle.")

#orp
if last_sensor_data_orp:
    try:
        # Load existing file if exists
        with open(ORP_DATA_FILE, 'r') as f:
            existing_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = []

    existing_data.append(last_sensor_data_orp)

    with open(ORP_DATA_FILE, 'w') as f:
        json.dump(existing_data, f, indent=2)

    print("Saved latest data:", last_sensor_data_orp)
else:
    print("No valid data received in this cycle.")
    
#ec
if last_sensor_data_ec:
    try:
        # Load existing file if exists
        with open(EC_DATA_FILE, 'r') as f:
            existing_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = []

    existing_data.append(last_sensor_data_ec)

    with open(EC_DATA_FILE, 'w') as f:
        json.dump(existing_data, f, indent=2)

    print("Saved latest data:", last_sensor_data_ec)
else:
    print("No valid data received in this cycle.")
    
#FOR FUTURE SENSOR
# if last_sensor_data_#:
#     try:
#         # Load existing file if exists
#         with open(#_DATA_FILE, 'r') as f:
#             existing_data = json.load(f)
#     except (FileNotFoundError, json.JSONDecodeError):
#         existing_data = []

#     existing_data.append(last_sensor_data_#)

#     with open(#_DATA_FILE, 'w') as f:
#         json.dump(existing_data, f, indent=2)

#     print("Saved latest data:", last_sensor_data_#)
# else:
#     print("No valid data received in this cycle.")