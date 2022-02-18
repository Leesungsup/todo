const schedule = require('node-schedule');
let schedulework = null;
var set=(s)=>{
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek=s.dayOfWeek;
    rule.hour = s.hour;
    rule.minute = s.minute;
    const job = schedule.scheduleJob(rule, function(){
        console.log('Today');
    });
    schedulework=job;
}
var cancel=()=>{
    if(schedulework!=null){
        schedulework.cancel();
    }
}
var setScheduler=(s)=>{
    cancel();
    set(s);
}
var scheduleData={
    dayOfWeek:[6,0],
    hour:0,
    minute:24
};
setScheduler(scheduleData);