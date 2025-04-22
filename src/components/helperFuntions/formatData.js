import computeNutritionPercentage from './nutritionPerc';
import computePHPercentage from './nutritionPerc';

//IF NEW BLANK DATA TYPE IS ADDED/UPDATED, UPDATE THIS FUNCTION 
export default function formatData(input, type){
  if (!input || input.length === 0){
    return [];
  }
  const final = [];

  const formatDate = (date) =>{
    const day = date.split("T")[0].slice(5);
    const militaryTime = date.split("T")[1].split(":");
    const hours = +militaryTime[0] <= 12?  militaryTime[0] : +militaryTime[0] - 12;
    return `${day} \n ${hours}:${militaryTime[1]}${+militaryTime[0] <= 12? "AM" : "PM"}`;
  }

  input.forEach((element) => {
    final.push({x: formatDate(element.date), y: +element.value});
  })
  return final;
}