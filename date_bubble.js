//Delete
var dateFns = require('date-fns')

function paseDates(dateList){
    console.log(dateList)
let start = dateFns.parse(dateList[0])
let end = dateFns.parse(dateList[1])
let result = [start,end]
console.log(result)

return [start,end]
}


let testEvents = [["Nov 19, 2019 8:00 am","Nov 19, 2019 8:30 am"], ["Nov 20, 2019 9:00 am","Nov 20, 2019 9:30 am"], ["Dec 6, 2019 10:30 am","Dec 6, 2019 11:00 am"], ["Nov 19, 2019 7:00 pm","Nov 19, 2019 7:30 pm"], ["Nov 20, 2019 4:00 am","Nov 20, 2019 4:30 am"], ["Nov 20, 2019 4:30 am","Nov 20, 2019 5:00 am"], ["Nov 20, 2019 5:00 am","Nov 20, 2019 5:30 am"], ["Nov 19, 2019 7:30 pm","Nov 19, 2019 8:00 pm"], ["Nov 19, 2019 9:00 pm","Nov 19, 2019 9:30 pm"], ["Nov 25, 2019 2:00 am","Nov 25, 2019 2:30 am"], ["Nov 26, 2019 2:00 am","Nov 26, 2019 2:30 am"], ["Dec 5, 2019 5:00 am","Dec 5, 2019 5:30 am"], ["Nov 28, 2019 5:00 am","Nov 28, 2019 5:30 am"], ["Jan 10, 2020 1:30 pm","Jan 10, 2020 2:00 pm"], ["Jan 1, 2020 4:00 am","Jan 1, 2020 4:30 am"], ["Dec 3, 2019 2:00 am","Dec 3, 2019 2:30 am"], ["Dec 2, 2019 2:00 am","Dec 2, 2019 2:30 am"], ["Dec 5, 2019 5:30 am","Dec 5, 2019 6:00 am"], ["Dec 6, 2019 1:00 pm","Dec 6, 2019 1:30 pm"], ["Dec 4, 2019 5:30 am","Dec 4, 2019 6:00 am"], ["Dec 2, 2019 4:00 am","Dec 2, 2019 4:30 am"], ["Jan 2, 2020 5:00 am","Jan 2, 2020 5:30 am"], ["Jan 5, 2020 12:00 am","Jan 5, 2020 12:00 am"], ["Jan 5, 2020 4:30 pm","Jan 5, 2020 5:00 pm"], ["Jan 5, 2020 11:00 am","Jan 5, 2020 12:00 pm"], ["Jan 5, 2020 3:00 am","Jan 5, 2020 5:00 am"], ["Jan 5, 2020 3:00 am","Jan 5, 2020 5:00 am"], ["Jan 5, 2020 3:00 am","Jan 5, 2020 5:00 am"]]
let testTimeSettings = [["Nov 18, 2019 2:00 am","Nov 18, 2019 5:00 am"], ["Nov 20, 2019 4:00 am","Nov 20, 2019 6:00 am"], ["Nov 21, 2019 5:00 am","Nov 21, 2019 9:00 am"], ["Nov 19, 2019 2:00 am","Nov 19, 2019 7:00 am"], ["Nov 18, 2019 9:00 am","Nov 18, 2019 11:00 am"], ["Nov 22, 2019 1:00 pm","Nov 22, 2019 3:00 pm"], ["Nov 19, 2019 7:00 pm","Nov 19, 2019 10:00 pm"], ["Nov 23, 2019 8:45 am","Nov 23, 2019 1:00 pm"], ["Nov 24, 2019 3:15 am","Nov 24, 2019 7:45 am"]]

let testEventsMap = testEvents.map(element => {paseDates(element); return element})
let testSettingsMap = testTimeSettings.map(element => {paseDates(element); return element})


let properties = {
    interval: 30,
    buffertime: 15,
    events: testEventsMap,
    timesettings: testSettingsMap,
    customtimesettings: [],
    maxeventnumber: 5,
    calendarday: new Date()
}
console.log(properties.events)

//delete
    
    var sdokCalendar = {}
  
  //-Check events and add buffer time to a calendar day 
   sdokCalendar.timelist = function (opt){
  var calendarDay = opt.calendarDay
  console.log('options = ',opt)
    let temp = {
      events: opt.events.filter(x=>dateFns.isSameDay(x[0],calendarDay)),
      generatedTimes:[],
      isAvailable:false,
      timeSettings:[],
      customTimeSettings:[],
    }
    if (temp.events.length<opt.maxEventNumber){temp.isAvailable = true}
  
       console.log('IsAvailable_1 = ',temp.isAvailable)
  
  //Is Available
  if (temp.isAvailable == true){
  
  
  temp.customTimeSettings = opt.customTimeSettings.filter(x=>dateFns.isSameDay(x[0],calendarDay))
  console.log('CustomtimeSettings = ',temp.customTimeSettings)
      
  temp.generatedTimes = sdokCalendar.generateMinutes(dateFns.startOfDay(calendarDay),opt.interval)
  console.log('GeneratedTimes = ',temp.generatedTimes)
      
  // add bufferTime
      console.log('AddBufferStart = ',temp.events)
  
  if (opt.bufferTime>0 && temp.isAvailable==true){temp.events = temp.events.map(x=>sdokCalendar.addBuffer(x,opt.bufferTime)) }  
       console.log('AddBufferEnd = ',temp.events)
  // add bufferTime
    //CustomTime or WeekDayTime  
           console.log(' temp.timeSettings Start = ', temp.timeSettings)
  
  if (temp.customTimeSettings.length>0){
    temp.timeSettings = opt.customTimeSettings
      console.log(' TimeSettings = CUstomTimesSettings')
  } else {
      
    //Start WeekDayTimeSettings
      temp.timeSettings = opt.timeSettings.filter(x=>{
          let filter = calendarDay.getDay()==x[0].getDay(); 
          console.log(' WeekdayTimeSettingsFilter = ',filter);
      console.log(' CalendarDay',calendarDay)
      console.log(' GetDayCalendarDay',calendarDay.getDay())
      console.log(' GetDayTimeSettingsDay',calendarDay.getDay())
  
  
          return filter
      }).map(x=>{
          let start = sdokCalendar.setDateToCurrentDate(x[0],calendarDay);
          let end = sdokCalendar.setDateToCurrentDate(x[1],calendarDay); 
          console.log(' WeekdayTimeSettingsMap = ',[start,end]);
          return [start,end]
      })
      console.log(' TimeSettings = WeekDayTimesSettings')
            //End  WeekDayTimeSettings
  
  }
      console.log(' temp.timeSettings End = ', temp.timeSettings)
  //CustomTime or WeekDayTime
  //OverLap
  temp.overlap = sdokCalendar.overlapsList(temp.generatedTimes,temp.timeSettings).overlapTimes
      console.log(' temp.overlap_1 = ', temp.overlap)
      // check Generated Times with events Start
  //temp.overlap= sdokCalendar.overlapsList(temp.overlap,temp.events).noOverlapTimes
  
          temp.overlap= temp.overlap.filter(x=>{let result = sdokCalendar.overlapsSingle(x,temp.events); if (result==false){return true}})
             console.log(' temp.overlap_2 = ', temp.overlap)
     
          // check Generated Times with events Start
  
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
  console.log('result = ',result)
  
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
  
  
  //Single Time Overlap
    sdokCalendar.overlapsSingle = function (time,overlapList){
      var over = false       
      var startA = time[0]
      var endA = time[1]
                for (j=0;j<overlapList.length;j++){
                var startB = overlapList[j][0]
                var endB = overlapList[j][1]
               over =  dateFns.areRangesOverlapping(startA,endA,startB,endB) 
                  if (over=true){break}
                 }//for j 
      
     let result = false
      return result
     }
  //single Time Overlap  
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
  
  /*
  sdokCalendar.options = {
    calendarDay:optStep.currentDate,
    events:optStep.events,
    maxEventNumber:optStep.maxEventNumver,
    bufferTime:15,
    timeSettings:optStep.timeSettings,
    customTimeSettings:optStep.customTimeSettings,
    interval:30
  }
  */
    
      
      
      
      
   let customTimeSettings = []   
      
  var options = {
    calendarDay:properties.calendarday,
    events: properties.events,//.get(0,99),
    maxEventNumber:properties.maxeventnumber,
    bufferTime:properties.buffertime,
    timeSettings:properties.timesettings,//.get(0,99),
    customTimeSettings:customTimeSettings,
    interval:properties.interval
  }
  
      
  //instance.publishState('timelist',sdokCalendar.timelist(options).timeList)
  //instance.publishState('timelist',properties.events.get(0,99))
      
      //delete 
var result = sdokCalendar.timeList(options)
console.log(result)
      //delete
  