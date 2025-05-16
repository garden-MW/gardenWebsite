/*
 # This sample code is used to test the pH meter Pro V1.0.
 # Editor : YouYou
 # Ver    : 1.0
 # Product: analog pH meter Pro
 # SKU    : SEN0169
*/
// #include <OneWire.h>
// #include <DallasTemperature.h>
//Temperature 
// int temp_sensor = 2; //DS18S20 Signal pin on digital 2
// OneWire oneWirePin(temp_sensor);
// DallasTemperature sensors(&oneWirePin);
// float temperature = 0;

#define samplingInterval 20
#define printInterval 800
#define ArrayLength  40

//ph
#define phSensorPin A0            //pH meter Analog output to Arduino Analog Input 0
#define Offset -0.20            //deviation compensate
#define LED 13
int pHArray[ArrayLength];   //Store the average value of the sensor feedback
int pHArrayIndex = 0;

//ORP
#include "DFRobot_ORP_PRO.h"
#define orpSensorPin A1
#define ADC_BIT 1024.0
#define reference_voltage 5000
int orpArray[ArrayLength];
int orpArrayIndex = 0;
DFRobot_ORP_PRO ORP(235);

void setup(void)
{
  pinMode(LED,OUTPUT);
  Serial.begin(9600);
  Serial.println("pH meter experiment!");    //Test the serial monitor

  ORP.setCalibration(ORP.calibrate(3323));
  Serial.print("calibration is ：");
  Serial.print(ORP.getCalibration());
  Serial.println("mV");

  //sensors.begin();
}

void loop(void)
{
  static unsigned long samplingTime = millis();
  static unsigned long printTime = millis();
  static float pHValue, pHVoltage;
  static float orpValue, orpVoltage;

  if (millis() - samplingTime > samplingInterval)
  {
    pHArray[pHArrayIndex++] = analogRead(phSensorPin);
    orpArray[orpArrayIndex++] = analogRead(orpSensorPin) / ADC_BIT * reference_voltage;

    if (pHArrayIndex == ArrayLength) pHArrayIndex = 0;
    if (orpArrayIndex == ArrayLength) orpArrayIndex = 0;

    pHVoltage = avergearray(pHArray, ArrayLength) * 5.0 / 1024;
    pHValue = 3.5 * pHVoltage + Offset;
    orpVoltage = avergearray(orpArray, ArrayLength);
    orpValue = ORP.getORP(orpVoltage);

    samplingTime = millis();
  }

  if (millis() - printTime > printInterval) // Every 800 milliseconds
  {
    // Print data in JSON format
    Serial.print("{\"sensor\": \"Ph\", ");
    Serial.print("\"value\": ");
    Serial.print(pHValue, 2);
    Serial.println("}");
    Serial.print("{\"sensor\": \"ORP\", ");
    Serial.print("\"value\": ");
    Serial.print(orpValue, 2);
    Serial.println("}");
    
    digitalWrite(LED, digitalRead(LED) ^ 1);
    printTime = millis();
  }
}

double avergearray(int* arr, int number){
  int i;
  int max,min;
  double avg;
  long amount=0;
  if(number<=0){
    Serial.println("Error number for the array to avraging!/n");
    return 0;
  }
  if(number<5){   //less than 5, calculated directly statistics
    for(i=0;i<number;i++){
      amount+=arr[i];
    }
    avg = amount/number;
    return avg;
  }else{
    if(arr[0]<arr[1]){
      min = arr[0];max=arr[1];
    }
    else{
      min=arr[1];max=arr[0];
    }
    for(i=2;i<number;i++){
      if(arr[i]<min){
        amount+=min;        //arr<min
        min=arr[i];
      }else {
        if(arr[i]>max){
          amount+=max;    //arr>max
          max=arr[i];
        }else{
          amount+=arr[i]; //min<=arr<=max
        }
      }//if
    }//for
    avg = (double)amount/(number-2);
  }//if
  return avg;
}

