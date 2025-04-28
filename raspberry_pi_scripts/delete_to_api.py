#run once a day
import requests
from datetime import datetime, timedelta

# Calculate timestamp for 3 weeks ago (21 day ago)
old = datetime.utcnow() - timedelta(days=21)
old_timestamp = old.isoformat()

# API endpoint for deleting data older than yesterday
url = 'https://your-api.com/delete-old-data'

# Payload containing the timestamp to delete records older than this
payload = {
    'timestamp': old_timestamp
}

# Send DELETE request with the payload
response = requests.delete(url, json=payload)

# Check the response
if response.status_code == 200:
    print("Successfully deleted records older than 1 day.")
else:
    print(f"Error: {response.status_code}, {response.text}")
