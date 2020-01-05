//delete
//var dateFns = require('date-fns')


var sdokCalendar = {}

//-Check events and add buffer time to a calendar day 
 sdokCalendar.timelist = function (opt){
var calendarDay = opt.calendarDay
console.log(opt)
  let temp = {
    events: opt.events.filter(x=>dateFns.isSameDay(x[0],calendarDay)),
    generatedTimes:[],
    isAvailable:false,
    timeSettings:[],
    customTimeSettings:[],
  }
  if (temp.events.length<opt.maxEventNumber){temp.isAvailable = true}

//Is Available
if (temp.isAvailable == true){


temp.customTimeSettings = opt.customTimeSettings.filter(x=>dateFns.isSameDay(x[0],calendarDay))
temp.generatedTimes = sdokCalendar.generateMinutes(dateFns.startOfDay(calendarDay),opt.interval)
// add bufferTime
if (opt.bufferTime>0 && temp.isAvailable==true){temp.events = temp.events.map(x=>sdokCalendar.addBuffer(x,opt.bufferTime)) }  
// add bufferTime
  //CustomTime or WeekDayTime
if (temp.customTimeSettings.length>0){
  temp.timeSettings = opt.customTimeSettings
} else {
  temp.timeSettings = opt.timeSettings.filter(x=>{let filter = calendarDay.getDay()==x[0].getDay(); return filter}).map(x=>{let start = sdokCalendar.setDateToCurrentDate(x[0],calendarDay);let end = sdokCalendar.setDateToCurrentDate(x[1],calendarDay); return [start,end]})
}
//CustomTime or WeekDayTime
//OverLap
temp.overlap = sdokCalendar.overlapsList(temp.generatedTimes,temp.timeSettings).overlapTimes
temp.overlap= sdokCalendar.overlapsList(temp.overlap,temp.events).noOverlapTimes
   
//Overlap



let result = {
  events:temp.events,
  timeSettings:temp.timeSettings,
  isAvailable:temp.isAvailable,
  customTimeSettings:temp.customTimeSettings,
  timeList:temp.overlap,
  bufferTime:opt.bufferTime,
  interval:opt.interval,
  calendarDay:opt.calendarDay
}
return result
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


sdokCalendar.options = {
  calendarDay:optStep.currentDate,
  events:optStep.events,
  maxEventNumber:optStep.maxEventNumver,
  bufferTime:15,
  timeSettings:optStep.timeSettings,
  customTimeSettings:optStep.customTimeSettings,
  interval:30
}

