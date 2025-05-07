#!/usr/bin/env/ python3
#run every 10 minutes
import requests
import json
from datetime import datetime
import os

ORP_DATA_FILE = '/home/hydro/raspberry_pi_scripts/orp_data/orp_data.json'
ORP_ARCHIVE_FILE = '/home/hydro/raspberry_pi_scripts/orp_data/orp_data_archive.json'
SENSOR_NAME = "orp1"

#url = 'http://10.3.108.151:3000/api/remoteDataInput'
url = 'https://makers-garden.vercel.app/api/remoteDataInput'

def truncate_to_minute(ts_str):
    dt = datetime.fromisoformat(ts_str)
    truncated = dt.replace(second=0, microsecond=0)
    return truncated

# Load current orp_data
try:
    with open(ORP_DATA_FILE, 'r') as f:
        data = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    data = []

if not data:
    print("No data to upload.")
    exit()

to_upload = data[:]  # get first 10 entries
batch = []
for record in to_upload:
    sensor_type = record['sensor']
    raw_timestamp = record['timestamp']
    value = record['value']

    truncated_timestamp = truncate_to_minute(raw_timestamp).isoformat()

    payload = {
        "sensor_type": sensor_type,
        "date": truncated_timestamp,
        "value": value,
        "sensor": SENSOR_NAME
    }

    batch.append(payload)

# Send the batch if there is data
if batch:
    response = requests.post(url, json=batch)
    if response.status_code == 200:
        print("Batch Success:", response.json())
        
        # 1. Remove uploaded entries from main orp_data.json
        with open(ORP_DATA_FILE, 'w') as f:
            json.dump([], f, indent=2)
            
        # 2. Save uploaded entries into an archive file
        if os.path.exists(ORP_ARCHIVE_FILE):
            with open(ORP_ARCHIVE_FILE, 'r') as f:
                try:
                    archive_data = json.load(f)
                except json.JSONDecodeError:
                    archive_data = []
                
        else:
            archive_data = []

        archive_data.extend(to_upload)

        with open(ORP_ARCHIVE_FILE, 'w') as f:
            json.dump(archive_data, f, indent=2)
        print(f"Archived {len(to_upload)} entries to {ORP_ARCHIVE_FILE}")

    else:
        print("Batch Error:", response.status_code, response.text)
