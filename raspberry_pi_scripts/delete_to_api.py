#!/usr/bin/env/ python3
#run once a day
import requests
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

# Calculate timestamp for 3 weeks ago (21 day ago)

#use this way if the delete doesn't happen
#old = datetime.utcnow() - timedelta(days=21)

old = datetime.now(ZoneInfo("US/Eastern")) - timedelta(days=21)
old_timestamp = old.isoformat()

# API endpoint for deleting data older than yesterday
url = 'https://makers-garden.vercel.app/api/remoteDataInput'

# Payload containing the timestamp to delete records older than this
payload = {
    'date': old_timestamp
}

# Send DELETE request with the payload
response = requests.delete(url, json=payload)

# Check the response
if response.status_code == 200:
    print("Successfully deleted records older than 1 day.")
else:
    print(f"Error: {response.status_code}, {response.text}")
