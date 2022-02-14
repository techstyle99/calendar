
document.addEventListener('DOMContentLoaded', () => {

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 

    // date.js library
    const date = new Date(); 
    const cday = date.getDate(); 
    const wday = days[date.getDay()]; 
    const premonth = date.getMonth(); 
    const monthnum = date.getMonth()+1; 
    const nextMonth = date.getMonth()+2; 
    const monthletter = months[date.getMonth()]; 
    const year = date.getFullYear(); 
    const firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDate(); 
    const firstDayIdx = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDay(); //get index number of the day of the week i.e. Sun is index# 0
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();         //last day of the current month
    const lastDayIdx = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();   //sun=0, mon=1, tue=2 etc 
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();         // last day of the previous month
    const nextDays = 7 - lastDayIdx - 1; 

    console.log(lastDayIdx); 



    document.querySelector(".date h1").innerHTML = monthletter; 
    document.querySelector(".date p").innerHTML = date.toDateString(); 


    const isWeekend = cday => {
        // highlight saturday & sunday
        // 6 when its saturday, 0 when its sunday
        return cday % 7 === 6 || cday % 7 === 0;
    }
    

    const getdayOfweek = (dayOfMonth) => {
        // factor time zone with: new Date(Date.UTC(year, month, dayIdx)); 
        const date = new Date(year, monthnum, dayOfMonth); 
        return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date); 
    }
    
    
    
    const calendar = document.querySelector("#app-calendar"); 

    for (let x = firstDayIdx; x>0; x--){
        let prevDays = ""; 
        const greyfdays = prevLastDay - x + 1; 
        console.log(greyfdays); 

        const date = new Date(year, premonth, greyfdays); 
        console.log(date); 
        const dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date); 
        console.log(dayName); 

        nameOfWeek = `<div class="nameOfWeek">${dayName}</div>`; 
        
        calendar.insertAdjacentHTML("beforeend", 
        `<div class="prevDays">
        ${nameOfWeek}${greyfdays}</div>`); 
    }
    
    

    for (let day = 1; day <= lastDay; day++){
        const weekend = isWeekend(day); 
        let nameOfWeek = ""; 
        if (day <= 7){
            const dayName = getdayOfweek(day); 
            nameOfWeek = `<div class="nameOfWeek">${dayName}</div>`; 
        }

        calendar.insertAdjacentHTML("beforeend", 
        `<div class="dayOfMonth ${weekend ? "weekendDays" : ""}">
        ${nameOfWeek}${day}</div>`); 
    }



    for (let j = 1; j<=nextDays; j++){
        calendar.insertAdjacentHTML("beforeend", 
        `<div class="next-days">
        ${j}</div>`); 
    }

    


    document.querySelectorAll("#app-calendar .dayOfMonth").forEach
    (dayOfMonth => {
        dayOfMonth.addEventListener("click", event => {
            event.currentTarget.classList.toggle("selectedDays"); 
        })

    })


    document.querySelector('.prev').addEventListener('click', () => {
        date.setMonth(date.getMonth()-1); 
        renderCalendar(); 
    })
    
    
    document.querySelector('.next').addEventListener('click', () => {
        date.setMonth(date.getMonth()+1); 
        renderCalendar(); 
        
    })


}); 

