const locationName = document.querySelector(".location-name")
const tempText = document.querySelector(".temp-text")
const humidText = document.querySelector(".humid-text")
const speedText = document.querySelector(".speed-text")
const feelsText = document.querySelector(".feels-text")
const stateText = document.querySelector(".state-text")

const addiStateTexts = Array.from(document.querySelectorAll(".addi-state"))
const addiTempTexts = Array.from(document.querySelectorAll(".addi-temp")) 
const addiHumidTexts = Array.from(document.querySelectorAll(".addi-humid"))
const addiSpeedTexts = Array.from(document.querySelectorAll(".addi-speed")) 

const timeTexts = Array.from(document.querySelectorAll(".time-text")) 
const allImg = Array.from(document.querySelectorAll(".w-14"))
const errorMsg = document.querySelector(".error-msg")
let currentLocation;



async function getWeatherData(location = "haifa",system,){
    try{
        localStorage.setItem("lastLocation",location)
        console.log(localStorage.getItem("lastLocation"));
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${system}&appid=571b06f4d00d62b66717a5e08b78e8bb`)
        let data = await response.json()

        return data
    }catch(err){
        return err
    }

  

   
}


let system = "metric"

//event listeners
const input = document.querySelector('input')
const searchBtn = document.querySelector('.search-btn')
const systemBtn = document.querySelector('.system-btn')
input.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        displayData(input.value,system)
    }
})

searchBtn.addEventListener("click",function(){
    displayData(input.value,system)

})

systemBtn.addEventListener("click",function(){
    if(system == "metric"){

        system = "imperial"

    }else{
        system = "metric"
    }
    displayData(currentLocation,system)

})



function displayData(location,system ){


    let sign;
    currentLocation = location
    if(system == "metric"){
        sign = " °C"
    }else{
        sign = " °F"
    }
    getWeatherData(location,system).then((data) =>{

     
        //main section data
        try{
            locationName.textContent = data.city.name + ", " + data.city.country
            errorMsg.classList.add("hidden")
            input.classList.remove("border-red-500")
        }catch(err){
            errorMsg.classList.remove("hidden")
            input.classList.add("border-red-500")
            

        }

        tempText.textContent = Math.round(data.list[0].main.temp) + sign 
        humidText.textContent = data.list[0].main.humidity + "%" 
        feelsText.textContent = Math.round(data.list[0].main.feels_like) + sign 
        speedText.textContent = data.list[0].wind.speed 
        stateText.textContent = data.list[0].weather[0].main

        //additional hours 

        for (let i = 0; i < 8 ;i++) {
            let time = data.list[i + 1].dt_txt.split(" ")[1].split(":").splice(0,2)
            time = time[0] + ":" + time[1]
            
            timeTexts[i].textContent = time
            addiStateTexts[i].textContent = data.list[i + 1].weather[0].main
            
            addiTempTexts[i].textContent = Math.round(data.list[i+1].main.temp) + sign 
            

            addiHumidTexts[i].textContent = data.list[i+1].main.humidity + '%'
            addiSpeedTexts[i].textContent = Math.round(data.list[i+1].wind.speed * 10) / 10

        }

     
        for(let img of allImg){

            if(data.list[allImg.indexOf(img)].weather[0].main == "Clear"){
                img.src = "img/sun.png"
            }else if(data.list[allImg.indexOf(img)].weather[0].main == "Rain"){
                img.src = 'img/rain.png'
            }
            else{
                img.src = "img/clouds.png"
            }
        }
    } )
}


let lastLocation = localStorage.getItem("lastLocation")

if(lastLocation){
    displayData(lastLocation,system)

}else{
    displayData("Jerusalem",system)

}

console.log(lastLocation);