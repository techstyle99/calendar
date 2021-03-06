
// document.addEventListener('DOMContentLoaded', () => {


const renderCalendar = () => { 


document.addEventListener('DOMContentLoaded', () => {

    const date = new Date(); 
    // date.setDate(1);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 

    // date.js library
    
    const cday = date.getDate();            //same as new Date().getDate(); 
    const wday = days[date.getDay()];   
    const premonth = date.getMonth();       //same as new Date().getMonth(); 
    const currMonth = date.getMonth()+1; 
    const nextMonth = date.getMonth()+2; 
    const monthletter = months[date.getMonth()]; 
    const year = date.getFullYear(); 
    const firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDate(); 
    const firstDayIdx = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDay(); //get index number of the day of the week i.e. Sun is index# 0
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();         //last day of the current month
    const lastDayIdx = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();   //sun=0, mon=1, tue=2 etc 
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();         // last day of the previous month
    const nextDays = 7 - lastDayIdx - 1; 
    console.log("its working!")
    console.log(cday, premonth); 


    // calendar top part with the month year date weekday names
    document.querySelector(".date h1").innerHTML = monthletter; 
    document.querySelector(".date p").innerHTML = date.toDateString(); 


    //start of the main body of calendar
    const calendar = document.querySelector("#app-calendar"); 
    

    /* function that takes a monthday and returns a weekday */
    const getdayOfweek = (dayOfMonth) => {
        // factor time zone with: new Date(Date.UTC(year, month, dayIdx)); 
        const date = new Date(year, currMonth, dayOfMonth); 
        return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date); 
    }


    const isWeekend = cday => {
        return getdayOfweek(cday) === "Sat" || getdayOfweek(cday) === "Sun"; 
        // return cday % 7 === 6 || cday % 7 === 0;
    }


    /* dynamically make divs for days in the first row that are from the previous month */
    for (let x = firstDayIdx; x > 0; x--){
        let prevDays = ""; 
        const greyfdays = prevLastDay - x + 1; 
        const dateInput = "'" + year + "," + premonth + "," + greyfdays + "'"; 
        const date = new Date(dateInput); 
        const dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);

        nameOfWeek = `<div class="nameOfWeek">${dayName}</div>`; 
        
        calendar.insertAdjacentHTML("beforeend", 
        `<div class="prevDays">
        ${nameOfWeek}${greyfdays}</div>`); 
    }
    
    
    /* dynamically make divs for days of a month */
    for (let day = 1; day <= lastDay; day++){
        const weekend = isWeekend(day); 
        let nameOfWeek = ""; 
       

        if (day === cday){
            nameOfWeek += `<div class="today">today</div>`; 
        }

        else if (day <= 7-firstDayIdx){
            const dayName = getdayOfweek(day); 
            console.log("day name: " + dayName); 
            nameOfWeek = `<div class="nameOfWeek">${dayName}</div>`; 
        }
        

        calendar.insertAdjacentHTML("beforeend", 
        `<div class="dayOfMonth ${weekend ? "weekendDays" : ""}">
        ${nameOfWeek}${day}</div>`); 
        
    }


    /* dynamically make divs for days in the last row that are from the next month */
    for (let j = 1; j<=nextDays; j++){
        calendar.insertAdjacentHTML("beforeend", 
        `<div class="next-days">
        ${j}</div>`); 
    }



    /* classList toggle() method: add or remove css classes whether exist or not 
       add event listener to all day divs of the month when select or unselected */ 

    document.querySelectorAll("#app-calendar .dayOfMonth").forEach
    (dayOfMonth => {
        dayOfMonth.addEventListener("click", event => {
            event.currentTarget.classList.toggle("selectedDays"); 
        })

    })

}); 


}

    renderCalendar(); 

    document.querySelector('.prev-Days').addEventListener('click', () => {
        calendar.innerHTML = ""; 
        date.setMonth(date.getMonth()-1); 
        renderCalendar(); 
     
    })
    
    
    document.querySelector('.next-days').addEventListener('click', () => {
        calendar.innerHTML = ""; 
        date.setMonth(date.getMonth()+1); 
        renderCalendar(); 
                
    })





    





