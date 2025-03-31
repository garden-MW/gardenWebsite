export default function computePHPercentage(data, actual = false, overview = false){
    if (typeof data[0] === 'number' && !overview){
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
        return +(average/data.length).toFixed(2);
    }

    let totalPerc = 0;
    if (typeof data[0] === 'number' && overview){
        if (data[0] < 6.2){
            totalPerc += data[0]/6.2 * 100;
        }else if(data[0] > 7.8){
            totalPerc += 100 - (data[0]/7.8 * 100);
        }else{
            totalPerc += 100;
        }
        return +(totalPerc/data.length).toFixed(2)
    }
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