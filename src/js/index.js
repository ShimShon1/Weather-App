async function extraWeather(){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Cairo&units=metric&appid=571b06f4d00d62b66717a5e08b78e8bb`)
    let data = await response.json()

    console.log(Math.round(data.list[3].main.temp),data.list[3].main.temp);
    console.log(data);
}

extraWeather()