import computeNutritionPercentage from './nutritionPerc';
import computePHPercentage from './nutritionPerc';

//IF NEW BLANK DATA TYPE IS ADDED/UPDATED, UPDATE THIS FUNCTION 
export default function formatData(input, type){
  if (!input || input.length === 0){
    return [
      {x: "Sun", y: 0},
      {x: "Mon", y: 0},
      {x: "Tues", y: 0},
      {x: "Wed", y: 0},
      {x: "Thurs", y: 0},
      {x: "Fri", y: 0},
      {x: "Sat", y: 0}
    ]
  }
  const final = [];
  const Sun = [];
  const Mon = [];
  const Tues = [];
  const Wed = [];
  const Thurs = [];
  const Fri = [];
  const Sat = [];

  input.forEach((element) => {
    const day = new Date(element.date).getDay();
    if (day === 0){
      Sun.push(element.value);
    }else if(day === 1){
      Mon.push(element.value);
    }else if(day === 2){
      Tues.push(element.value);
    }
    else if(day === 3){
      Wed.push(element.value);
    }
    else if(day === 4){
      Thurs.push(element.value);
    }
    else if(day === 5){
      Fri.push(element.value);
    }
    else if(day === 6){
      Sat.push(element.value);
    }
  })

  const days = [{"Sun" : Sun}, {"Mon": Mon}, {"Tues": Tues}, {"Wed": Wed}, {"Thurs": Thurs}, {"Fri" : Fri}, {"Sat": Sat}];

  days.forEach((day) => {
    let sum = 0;
    const dayArray = Object.keys(day);
    if (day[dayArray[0]].length === 0){
      final.push({x: dayArray[0], y: 0});
    }else{
      day[dayArray[0]].forEach((value) => {
        sum += +value;
      })
      if (type === 'Nutrition'){ //THIS IS WHERE UPDATE WOULD BE NEEDED: If statements for each data type with appropriate percent function
        final.push({x: dayArray[0], y: computeNutritionPercentage([sum/(day[dayArray[0]].length)], true)});
      }else{
        final.push({x: dayArray[0], y: computePHPercentage([sum/(day[dayArray[0]].length)], true)});
      }
      
    }
  })
  return final;
}