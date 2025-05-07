#!/usr/bin/env/ python3
#run every 3 weeks
import json
import os
import zipfile
from datetime import datetime, timedelta

FILENAME = '/home/hydro/raspberry_pi_scripts/ec_data/ec_data_archive.json'
FILES_TO_CLEAR_CRON =  ["/home/hydro/raspberry_pi_scripts/ec_data/cron_log.txt" , "/home/hydro/raspberry_pi_scripts/ec_data/cron_log2.txt"]
ARCHIVE_FOLDER = '/home/hydro/raspberry_pi_scripts/ec_data/archives/'
MAX_AGE = timedelta(weeks=3)

# Make sure archive folder exists
os.makedirs(ARCHIVE_FOLDER, exist_ok=True)

# Load main file
try:
    with open(FILENAME, 'r') as f:
        data_list = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    print("No main data file found or empty.")
    data_list = []

# Exit if nothing
if not data_list:
    exit(0)

# Split old and new
cutoff_time = datetime.utcnow() - MAX_AGE
old_data = []
new_data = []

for entry in data_list:
    timestamp = datetime.fromisoformat(entry['timestamp'])
    if timestamp < cutoff_time:
        old_data.append(entry)
    else:
        new_data.append(entry)

# If there is old data to archive
if old_data:
    timestamp_now = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    archive_json_name = f'ec_archive_{timestamp_now}.json'
    archive_json_path = os.path.join(ARCHIVE_FOLDER, archive_json_name)

    # Save JSON archive
    with open(archive_json_path, 'w') as f:
        json.dump(old_data, f, indent=2)

    # Now compress it
    archive_zip_name = f'ec_archive_{timestamp_now}.zip'
    archive_zip_path = os.path.join(ARCHIVE_FOLDER, archive_zip_name)

    with zipfile.ZipFile(archive_zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as zipf:
        zipf.write(archive_json_path, arcname=archive_json_name)

    # After compressing, remove the original .json file
    os.remove(archive_json_path)

    print(f"Archived and compressed {len(old_data)} records into {archive_zip_path}")

    # Save trimmed main file
    with open(FILENAME, 'w') as f:
        json.dump(new_data, f, indent=2)
    print(f"Main data file trimmed to {len(new_data)} records.")
    
    #clearing old cron txt files (data about cron jobs ran)
    for cron_file in FILES_TO_CLEAR_CRON:
        try:
            with  open(cron_file, 'w') as f:
                f.write('')
            print(f"cleared {cron_file}.")
            
        except Exception as e:
            print(f"failed to clear {cron_file}: {e}")
else:
    print("No data older than 3 weeks to archive.")
