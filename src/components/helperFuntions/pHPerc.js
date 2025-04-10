export default function computePHPercentage(data, actual = false, overview = false, twoPerc = false){
    if (!data) return 0;
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

    if (twoPerc){
        let totalNeg = 0;
        let totalPos = 0;
        let negCount = 0;
        let posCount = 0;
        if (typeof data[0] === 'number' && overview){
            if (data[0] < 6.2){
                totalNeg += 100 - ((data[0] * 100)/ 6.2);
                negCount--;
            }else if(data[0] > 7.5){
                totalPos += ((data[0] * 100)/ 7.5) - 100
                posCount++;
            }else{
                //totalPerc += 100;
            }
            return {neg: +(totalNeg/negCount).toFixed(2), pos: +(totalPos/posCount).toFixed(2)};
        }
        data.forEach(element => {
            if (element.value < 6.2){
                totalNeg += 100 - ((element.value * 100)/ 6.2);
                negCount--;
            }else if(element.value > 7.5){
                totalPos += ((element.value * 100)/ 7.5) - 100
                posCount++;
            }else{
                //totalPerc += 100;
            }
        });
        console.log("totalNeg", totalNeg);
        console.log(negCount);
        return {neg: +(totalNeg/negCount).toFixed(2), pos: +(totalPos/posCount).toFixed(2)};
    }

    let totalPerc = 0;
    if (typeof data[0] === 'number' && overview){
        if (data[0] < 6.2){
            totalPerc += data[0]/6.2 * 100;
        }else if(data[0] > 7.8){
            totalPerc += 100 - (data[0]/7.8);
        }else{
            totalPerc += 100;
        }
        return +(totalPerc/data.length).toFixed(2)
    }
    data.forEach(element => {
        if (element.value < 6.2){
            totalPerc += element.value/6.2 * 100;
        }else if(element.value > 7.8){
            totalPerc += 100 - (element.value/7.8);
        }else{
            totalPerc += 100;
        }
    });
    return +(totalPerc/data.length).toFixed(2);
  }