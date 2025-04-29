#run every 10 minutes
import requests
import json
from datetime import datetime
import os

def truncate_to_minute(ts_str):
    dt = datetime.fromisoformat(ts_str)
    truncated = dt.replace(second=0, microsecond=0)
    return truncated

# Load current ph_data
try:
    with open('ph_data.json', 'r') as f:
        data = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    data = []

if not data:
    print("No data to upload.")
    exit()

url = 'http://localhost:3000/api/remoteDataInput'  # Replace with your real URL

batch_size = 10
to_upload = data[:batch_size]  # get first 10 entries

batch = []
for record in to_upload:
    sensor = record['sensor']
    raw_timestamp = record['timestamp']
    value = record['value']

    truncated_timestamp = truncate_to_minute(raw_timestamp).isoformat()

    payload = {
        "sensor_type": sensor,
        "timestamp": truncated_timestamp,
        "value": value
    }

    batch.append(payload)

# Send the batch if there is data
if batch:
    response = requests.post(url, json=batch)
    if response.status_code == 200:
        print("Batch Success:", response.json())
        
        # 1. Remove uploaded entries from main ph_data.json
        remaining_data = data[batch_size:]
        with open('ph_data.json', 'w') as f:
            json.dump(remaining_data, f, indent=2)
        print(f"Removed {len(to_upload)} uploaded entries. Remaining: {len(remaining_data)}")

        # 2. Save uploaded entries into an archive file
        archive_file = 'ph_data_archive.json'
        if os.path.exists(archive_file):
            with open(archive_file, 'r') as f:
                archive_data = json.load(f)
        else:
            archive_data = []

        archive_data.extend(to_upload)

        with open(archive_file, 'w') as f:
            json.dump(archive_data, f, indent=2)
        print(f"Archived {len(to_upload)} entries to {archive_file}")

    else:
        print("Batch Error:", response.status_code, response.text)
