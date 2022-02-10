

document.addEventListener('DOMContentLoaded', () => {

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 


    // date.js library
    const date = new Date(); 
    const cday = date.getDate(); 
    const wday = days[date.getDay()]; 
    const month = months[date.getMonth()]; 
    const monthIdx = date.getMonth()+1; 
    const year = date.getFullYear(); 
    const firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDate();    //month's first day
    const firstDayIdx = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDay();    
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();     //0: last indexed month day minus 1, which is last month's last day
    const lastDayIdx = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); 
    const nextDays = 7 - lastDayIdx -1; 

    console.log("first day and its index: " + firstDay, firstDayIdx); 
    console.log("last day and its index: " + lastDay, lastDayIdx); 
    console.log("calendar date: " + year, monthIdx, cday); 
    console.log("this month's first day index start at: " + firstDay); 
    console.log("last day of the month: " + lastDay); 
    

    console.log(date);
    console.log(date.toDateString()); 
    console.log(cday); 
    console.log("weekday: " + wday); 
    console.log("calendar: " + month + "/" + cday + "/" + year); 
 
    document.querySelector(".date h1").innerHTML = month; 
    document.querySelector(".date p").innerHTML = date.toDateString(); 


    // calendar first day starts at what index ?
    // date.setDate(1); 
   
    // const firstDayIndex = date.getDay(); 
    // console.log(firstDayIndex); 



    const isWeekend = cday => {
        // highlight saturday & sunday
        // 6 when its saturday, 0 when its sunday
        return cday % 7 === 6 || cday % 7 === 0; 
    }
    
    
    const getDayName = (cday) => {
        const date = new Date(Date.UTC(year, monthIdx, cday)); 
        return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date); 
    
    }



    const calendar = document.querySelector("#app-calendar"); 


    let name = ""; 
    for (let x=firstDayIdx; x>0; x--){
        name += `<div class="prev-date">${prevLastDay-x+1}</div>`; 
    }


    for (let day = 1; day <= lastDay; day++){
        const weekend = isWeekend(day); 
        if (day <= 7){
            const dayName = getDayName(day); 
            name = `<div class="name">${dayName}</div>`; 
        }

    for (let j=1; j<=nextDays; j++){
        name += `<div class="next-date">${j}</div>`; 
    }

    calendar.insertAdjacentHTML("beforeend", 
    `<div class="day ${weekend ? "weekend" : ""}">
    ${name}${day}</div>`);
    
     
    }

    




    document.querySelectorAll("#app-calendar .day").forEach
    (day => {
        day.addEventListener("click", event => {
            event.currentTarget.classList.toggle("selected"); 
        })
    })

})