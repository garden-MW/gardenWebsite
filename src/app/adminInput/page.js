'use client'

export default function AdminInput() {

    const handleSubmit = () => {
        const type = document.querySelector('input[name="type"]:checked').id;
        const entryDate = document.getElementById('entryDate').value;
        const sensor = document.getElementById('sensor').value;
        const value = Number(document.getElementById('value').value);

        fetch(`/api/${type}Data`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dataPoints:{
                    sensor,
                    value,
                    date: entryDate
                }
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Fetch error:', error)); 
    }

    return (
        <div className="h-screen w-sceen flex flex-col justify-center items-center">
            <h1>Select Data Entry Type</h1>
            <div>
                <input type="radio" id="pH" name="type" value="PH" defaultChecked/>
                <label htmlFor="pH">pH</label>
                <input type="radio" id="nutrition" name="type" value="Nutrition"/>
                <label htmlFor="nutrition">Nutrition</label>
            </div>
            <label htmlFor="entryDate">Entry (date and time)</label>
            <input type="datetime-local" id="entryDate" name="entryDate" required/>
            <label htmlFor="sensor">Sensor</label>
            <input type="text" id="sensor" name="sensor" required/>
            <label htmlFor="value">Value</label>
            <input type="number" id="value" name="value" required/>
            <button onClick={() => handleSubmit()}>Submit</button>
        </div>
    )
}