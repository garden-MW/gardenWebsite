import {useState} from "react";
import axios from "axios";



// const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/plants", {
//         name,
//         type,
//         water_frequency: waterFrequency, // Matches backend field name
//       });

//       onPlantAdded(response.data); // Update parent state
//       setName("");
//       setType("");
//       setWaterFrequency("");
//     } catch (error) {
//       console.error("Error adding plant:", error);
//     }
//   };


//in the pages do this


// const fetchPlants = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/plants");
//       setPlants(response.data);
//     } catch (error) {
//       console.error("Error fetching plants:", error);
//     }
//   };

//   const handlePlantAdded = (newPlant) => {
//     setPlants([...plants, newPlant]);
//   };



//running backend

// cd backend
// node server.js