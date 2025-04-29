import { useState } from "react";

export default function TimeSelector({ setTime }) {
    const [prev, setPrev] = useState(1); // Track the previous value

    const handleChange = (e) => {
        const value = e.target.value;
        if (value !== prev) {
            setTime(value); // Call the parent function to update the time
            setPrev(value); // Update the previous value
        }
    };

    return (
        <div className="flex flex-row justify-center items-center w-full font-semibold space-x-1 bg-white p-2 rounded-md">
            <input
                type="radio"
                id="1day"
                name="timeline"
                value="1"
                defaultChecked
                onChange={handleChange} // Attach React's onChange handler
            />
            <label htmlFor="1day">1 Day</label>
            <input
                type="radio"
                id="3day"
                name="timeline"
                value="3"
                onChange={handleChange} // Attach React's onChange handler
            />
            <label htmlFor="3day">3 Days</label>
            <input
                type="radio"
                id="7day"
                name="timeline"
                value="7"
                onChange={handleChange} // Attach React's onChange handler
            />
            <label htmlFor="7day">7 Days</label>
            <input
                type="radio"
                id="30day"
                name="timeline"
                value="30"
                onChange={handleChange} // Attach React's onChange handler
            />
            <label htmlFor="30day">1 Month</label>
        </div>
    );
}