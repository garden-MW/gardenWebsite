export default function computePHPercentage(data, actual = false){
    if (actual){
        let average = 0
        data.forEach(element => {
            average += +element.value;  
        });
        return +(average/data.length).toFixed(2);
    }
    let totalPerc = 0;
    data.forEach(element => {
        if (element.value < 6.2){
            totalPerc += element.value/6.2 * 100;
        }else if(element.value > 7.8){
            totalPerc += 100 - (element.value/7.8 * 100);
        }else{
            totalPerc += 100;
        }
    });
    return +(totalPerc/data.length).toFixed(2);
  }