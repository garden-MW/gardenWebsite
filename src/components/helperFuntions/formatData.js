export default function formatData(input){
  if (!input || input.length === 0){
    return [];
  }
  const final = [];

  const formatDate = (date) =>{
    const day = date.split("T")[0].slice(5);
    const militaryTime = date.split("T")[1].split(":");
    const hours = +militaryTime[0] <= 12?  militaryTime[0] : +militaryTime[0] - 12;
    let ending = "AM";
    switch (militaryTime[0]){
      case "00":
        ending = "AM";
        break;
      default:
        if (+militaryTime[0] >= 12){
          ending = "PM";
        }
    }
    return `${day} \n ${hours}:${militaryTime[1]}${ending}`;
  }

  input.forEach((element) => {
    final.push({x: formatDate(element.date), y: +element.value});
  }) 
  return final;
}