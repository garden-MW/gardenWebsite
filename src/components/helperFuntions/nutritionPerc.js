

export default function computeNutritionPercentage(data, actual = false){
    if (typeof data[0] === 'number'){
        let average = 0
        data.forEach(element => {
            average += element;  
        });
        return +(average/data.length).toFixed(2);
    }
    if (actual){
        let average = 0
        data.forEach(element => {
            average += +element.value;  
        });
        console.log("real", +(average/data.length).toFixed(2))
        return +(average/data.length).toFixed(2);
    }
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