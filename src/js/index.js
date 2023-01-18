let locationName = document.querySelector(".location-name")
let tempText = document.querySelector(".temp-text")
let humidText = document.querySelector(".humid-text")
let speedText = document.querySelector(".speed-text")
let feelsText = document.querySelector(".feels-text")
let stateText = document.querySelector(".state-text")
let addiStateTexts = Array.from(document.querySelectorAll(".addi-state"))
let timeTexts = Array.from(document.querySelectorAll(".time-text")) 
let addiTempTexts = Array.from(document.querySelectorAll(".addi-temp")) 
let allImg = Array.from(document.querySelectorAll(".w-14"))
let currentLocation;



async function getWeatherData(location = "haifa",system,){
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${system}&appid=571b06f4d00d62b66717a5e08b78e8bb`)
        let data = await response.json()
    
        return data
    }catch(err){
        console.log('err');
    }
   
}


let system = "metric"

//event listeners
let input = document.querySelector('input')
let searchBtn = document.querySelector('.search-btn')
let systemBtn = document.querySelector('.system-btn')
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
        locationName.textContent = data.city.name + ", " + data.city.country
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

displayData("haifa",system)