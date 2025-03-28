

export default function computeNutritionPercentage(data){
    let totalPerc = 0;
    data.forEach(element => {
        if (element.value < 2100){
            totalPerc += element.value/2100 * 100;
        }else if(element.value > 2500){
            totalPerc += 100 - (element.value/2500 * 100);
        }else{
            totalPerc += 100;
        }
    });
    return +(totalPerc/data.length).toFixed(2);
  }