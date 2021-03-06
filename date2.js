//delete
//var dateFns = require('date-fns')
let deleteTimeSettings = [
    [
      'Sun Jan 26 2020 02:30:00 GMT+0200 (Eastern European Standard Time)',
      'Sun Jan 26 2020 03:00:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Sun Jan 26 2020 03:00:00 GMT+0200 (Eastern European Standard Time)',
      'Sun Jan 26 2020 03:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Sun Jan 26 2020 03:30:00 GMT+0200 (Eastern European Standard Time)',
      'Sun Jan 26 2020 04:00:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Sun Jan 26 2020 04:00:00 GMT+0200 (Eastern European Standard Time)',
      'Sun Jan 26 2020 04:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Mon Jan 27 2020 03:00:00 GMT+0200 (Eastern European Standard Time)',
      'Mon Jan 27 2020 03:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Mon Jan 27 2020 03:30:00 GMT+0200 (Eastern European Standard Time)',
      'Mon Jan 27 2020 04:00:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Mon Jan 27 2020 04:00:00 GMT+0200 (Eastern European Standard Time)',
      'Mon Jan 27 2020 04:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Mon Jan 27 2020 04:30:00 GMT+0200 (Eastern European Standard Time)',
      'Mon Jan 27 2020 05:00:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Tue Jan 28 2020 03:30:00 GMT+0200 (Eastern European Standard Time)',
      'Tue Jan 28 2020 04:00:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Tue Jan 28 2020 04:00:00 GMT+0200 (Eastern European Standard Time)',
      'Tue Jan 28 2020 04:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Tue Jan 28 2020 04:30:00 GMT+0200 (Eastern European Standard Time)',
      'Tue Jan 28 2020 05:00:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Tue Jan 28 2020 05:00:00 GMT+0200 (Eastern European Standard Time)',
      'Tue Jan 28 2020 05:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Wed Jan 29 2020 04:00:00 GMT+0200 (Eastern European Standard Time)',
      'Wed Jan 29 2020 04:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Wed Jan 29 2020 04:30:00 GMT+0200 (Eastern European Standard Time)',
      'Wed Jan 29 2020 05:00:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Wed Jan 29 2020 05:00:00 GMT+0200 (Eastern European Standard Time)',
      'Wed Jan 29 2020 05:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Wed Jan 29 2020 05:30:00 GMT+0200 (Eastern European Standard Time)',
      'Wed Jan 29 2020 06:00:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Thu Jan 30 2020 04:30:00 GMT+0200 (Eastern European Standard Time)',
      'Thu Jan 30 2020 05:00:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Thu Jan 30 2020 05:00:00 GMT+0200 (Eastern European Standard Time)',
      'Thu Jan 30 2020 05:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Thu Jan 30 2020 05:30:00 GMT+0200 (Eastern European Standard Time)',
      'Thu Jan 30 2020 06:00:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Thu Jan 30 2020 06:00:00 GMT+0200 (Eastern European Standard Time)',
      'Thu Jan 30 2020 06:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Fri Jan 31 2020 05:00:00 GMT+0200 (Eastern European Standard Time)',
      'Fri Jan 31 2020 05:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Fri Jan 31 2020 05:30:00 GMT+0200 (Eastern European Standard Time)',
      'Fri Jan 31 2020 06:00:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Fri Jan 31 2020 06:00:00 GMT+0200 (Eastern European Standard Time)',
      'Fri Jan 31 2020 06:30:00 GMT+0200 (Eastern European Standard Time)'
    ],
    [
      'Fri Jan 31 2020 06:30:00 GMT+0200 (Eastern European Standard Time)',
      'Fri Jan 31 2020 07:00:00 GMT+0200 (Eastern European Standard Time)'
    ]
  ]
let delTimeSettings = deleteTimeSettings.map(x=>{
let start = dateFns.parse(x[0])
let end = dateFns.parse(x[1])
return [start,end]

})
//delete

//Settings

var optStep = {
    calendarDays:[new Date(2020,1,26),new Date(2020,1,27),new Date(2020,1,28)],
    currentDate:new Date(2020,0,26,1,15),
    events:[
        [new Date(2020,0,26,5,30),new Date(2020,0,26,6,30)],
        [new Date(2020,0,26,8,30),new Date(2020,0,26,9,0)],
        [new Date(2020,0,27,5,30),new Date(2020,0,27,11,30)],
        [new Date(2020,0,27,3,30),new Date(2020,0,27,22,30)],
        [new Date(2020,0,28,14,30),new Date(2020,0,28,15,30)],
        [new Date(2020,0,28,16,30),new Date(2020,0,28,17,30)]  
    
    ],
    timeSettings:delTimeSettings,
    customTimeSettings:[ [new Date(2020,0,26,5,30),new Date(2020,0,26,6,30)]],
    interval:30,
    buffer:15,
    maxEventNumver: 4
}
//Settings

var sdokCalendar = {}
//-Check events and add buffer time to a calendar day 
 sdokCalendar.timelist = function (calendarDay,events,maxEventNumver,bufferTime,timeSettings,customTimeSettings,interval){

  let temp = {
    events: events.filter(x=>dateFns.isSameDay(x[0],calendarDay)),
    generatedTimes:[],
    isAvailable:false,
    timeSettings:[],
    customTimeSettings:[],    
  }
  if (temp.events.length<maxEventNumver){temp.isAvailable = true}

//Is Available
if (temp.isAvailable == true){


temp.customTimeSettings = customTimeSettings.filter(x=>dateFns.isSameDay(x[0],calendarDay))
temp.generatedTimes = sdokCalendar.generateMinutes(dateFns.startOfDay(calendarDay),interval)
// add bufferTime
if (bufferTime>0 && temp.isAvailable==true){temp.events = temp.events.map(x=>sdokCalendar.addBuffer(x,bufferTime)) }  
// add bufferTime
  //CustomTime or WeekDayTime
if (temp.customTimeSettings.length>0){
  temp.timeSettings = customTimeSettings
} else {
  temp.timeSettings = timeSettings.filter(x=>{let filter = calendarDay.getDay()==x[0].getDay(); return filter}).map(x=>{let start = sdokCalendar.setDateToCurrentDate(x[0],calendarDay);let end = sdokCalendar.setDateToCurrentDate(x[1],calendarDay); return [start,end]})
}
//CustomTime or WeekDayTime
//OverLap
console.log(temp.timeSettings)
temp.overlap = sdokCalendar.overlapsList(temp.generatedTimes,temp.timeSettings).overlapTimes
console.log(temp.overlap)
temp.overlap= sdokCalendar.overlapsList(temp.overlap,temp.events).noOverlapTimes
   
//Overlap

console.log(temp)


let result = {
  events:temp.events,
  timeSettings:[],
  isAvailable:false
}
return temp
}//

}

//---helper = add Buffer Time
sdokCalendar.addBuffer = function (event,bufferTime){    
    let start = dateFns.addMinutes(event[0],-bufferTime)
    let end = dateFns.addMinutes(event[1],bufferTime)
    let result = [start,end]
return result
}
//-Check events and add buffer time to a calendar day 


// create timelist for current day
sdokCalendar.filterDays = function (timeSettings,currentDate){
  let result = []
  let len = timeSettings.length
  let cDay = currentDate.getDay()
  for (i=1;i<len;i++){  
  let tDay = timeSettings[i][0].getDay(); 
  if (tDay == cDay){
    console.log(timeSettings[i])
    timeSettings[i][0] = sdokCalendar.setDateToCurrentDate(timeSettings[i][0],currentDate)
    timeSettings[i][1] = sdokCalendar.setDateToCurrentDate(timeSettings[i][1],currentDate)
    result.push([timeSettings[i][0],timeSettings[i][1]])
  }
  
  }
  return result
  }
  //create timelist for current day



  sdokCalendar.overlapsSingle = function (time,overlapList){
    var overlapTimes =[]
    var noOverlapTimes = []          
    var startA = time[0]
    var endA = time[1]
              for (j=0;j<overlapList.length;j++){
              var startB = overlapList[j][0]
              var endB = overlapList[j][1]
             let over =  dateFns.areRangesOverlapping(startA,endA,startB,endB)

             if(over==true){overlapTimes.push([startA,endA])}
             else {noOverlapTimes.push([startA,endA])}   
                
               }//for j 
    
   
    let result = {overlapTimes:overlapTimes,noOverlapTimes:noOverlapTimes}
    return result
   }
//-------------------
sdokCalendar.overlapsList = function (dateList,overlapList){
    var overlapTimes =[]
    var noOverlapTimes = [] 
   
   
   for (i=0;i<dateList.length;i++){  
         
     var startA = dateList[i][0]
     var endA = dateList[i][1]
              for (j=0;j<overlapList.length;j++){
              var startB = overlapList[j][0]
              var endB = overlapList[j][1]
             let over =  dateFns.areRangesOverlapping(startA,endA,startB,endB)
             
             if(over==true){overlapTimes.push([startA,endA])}
             else {noOverlapTimes.push([startA,endA])}   
                
               }//for j 
    
   }
    let result = {overlapTimes:overlapTimes,noOverlapTimes:noOverlapTimes}
    return result
   }


//generate minutes 
sdokCalendar.generateMinutes = function  (date,interval){
    let result = []
    let minutes = 1440
    for (i=0;i<minutes;i+=interval){ let start = dateFns.addMinutes(date,i); let end = dateFns.addMinutes(date,interval+i); 
    //console.log(format(start,"HH:mm")+" - "+format(end,"HH:mm"))
     result.push([start,end]);                                
                                    
    }return result} 
 //generate minutes 



 sdokCalendar.setDateToCurrentDate = function (date,fn_currentDate){
  // console.log("---setDateStart = ",date,"----",fn_fn_currentDate)
 let result = fn_currentDate
 let year = fn_currentDate.getFullYear()
 let month = fn_currentDate.getMonth()
 let day = fn_currentDate.getDay()
 let hour = date.getHours()
 let sec = date.getSeconds()
 let min = date.getMinutes()
 let mil = date.getMilliseconds()
 
 result = dateFns.setHours(result,hour)
 result= dateFns.setMinutes(result,min)
 //console.log("setMinutes = ",fn_fn_currentDate)
 result=dateFns.setSeconds(result,sec)
 result=dateFns.setMilliseconds(result,mil)
 
 
 //console.log("setDateEnd = ",date,"-",fn_fn_currentDate)
 return result
 }

//delete
sdokCalendar.result = sdokCalendar.timelist(optStep.currentDate,optStep.events,optStep.maxEventNumver,optStep.buffer,optStep.timeSettings,optStep.customTimeSettings,optStep.interval)
//delete
