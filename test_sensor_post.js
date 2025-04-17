//test fetch for data incoming from raspberry-pi

fetch("/api/remoteDataInput", {
   method: "POST",
   body: JSON.stringify({
        id: "1",
        date: "2025-04-16",
        sensor_type: "Nutrition",
        value: 2200,
    }),
   headers: new Headers({
     Accept: "application/json",
     "Content-type": "application/json",
   }),
 })
