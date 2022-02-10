    
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 


    // date.js library
    const date = new Date(); 
    const cday = date.getDate(); 
    const wday = days[date.getDay()]; 
    const month = months[date.getMonth()]; 
    const year = date.getFullYear(); 
    

    console.log(date);
    console.log(cday); 
    console.log("weekday: " + wday); 
    console.log("calendar: " + month + "/" + cday + "/" + year); 
 
    document.querySelector(".date h1").innerHTML = month; 
    document.querySelector(".date p").innerHTML = date.toDateString(); 

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); 
    console.log("last day of the month: " + lastDay); 


    // calendar first day starts at what index ?
    // date.setDate(1); 
   
    // const firstDayIndex = date.getDay(); 
    // console.log(firstDayIndex); 






document.addEventListener('DOMContentLoaded', () => {

    const isWeekend = cday => {
        // highlight saturday & sunday
        // 6 when its saturday, 0 when its sunday
        return cday % 7 === 6 || cday % 7 === 0; 
    }
    
    
    const getDayName = cday => {
        const date = new Date(Date.UTC(2022, 1, cday)); 
        console.log(date);
        return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date); 
    
    }



    const calendar = document.querySelector("#app-calendar"); 
    for (let day = 1; day <= lastDay; day++){

        const weekend = isWeekend(day); 

        let name = ""; 
        if (day <= 7){
            const dayName = getDayName(day); 
            name = `<div class="name">${dayName}</div>`; 
        }


        // 31 days divs 
        // adding conditional class 'weekend'
        // conditional: if weekend = true, return string 'weekend'
        // after colon: if not, return empty string aka no class
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