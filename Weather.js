let input = document.querySelector(".input");
let card = document.querySelector(".card");
let button = document.querySelector("button");
let form = document.querySelector("form");
const apikey = "6c6b5a418d4924b0116ede388a10afda";

form.addEventListener("submit",async (event)=>{
    event.preventDefault();

    let city = input.value;
    if(city){
        try{
            let apidata = await apidataf(city);
            displayweather(apidata);
        }catch(err){
            console.log(err);
            error(err);
        }

    }else{
        error("Please Enter a city");
    }
});

async function apidataf(city){
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    try{
        let response = await axios.get(apiurl);
        // console.log(response);
        return response.data;
    }catch(err){
        throw new Error("Could not fetch data");
        // console.log(err);
    }
    // if(!response.ok){
    //     throw new Error("Could not fetch data");
    // }
}

function displayweather(apidata){
     console.log(apidata);
    let {name : city,
         main : {humidity,temp},
         weather : [{description,id}]} = apidata;

    card.innerText = "";
    card.style.display = "block";

    let cityname = document.createElement("h1");
    let temperature = document.createElement("p");
    let humid = document.createElement("p");
    let sky = document.createElement("p");
    let symbol = document.createElement("p");

    cityname.innerText = city;
    temperature.innerText = `${(temp - 273.15).toFixed(1)}°C`;
    humid.innerText = `Humidity: ${humidity}%`;
    sky.innerText = description;
    symbol.innerText = getemoji(id);

    cityname.classList.add("city");
    temperature.classList.add("temp");
    humid.classList.add("humidity");
    sky.classList.add("sky");
    symbol.classList.add("symbol");

    card.appendChild(cityname);
    card.appendChild(temperature);
    card.appendChild(humid);
    card.appendChild(sky);
    card.appendChild(symbol);
}

function getemoji(id){
    switch(true){
        case(id>=200 && id<600):  return "🌧️";
        case(id>=600 && id<700):  return "❄️";
        case(id>=700 && id<800):  return "🌫️";
        case(id==800):  return "☀️";
        case(id>=801 && id<810):  return "☁️";
        default: return "☠️";
    }

}

function error(msg){
    let err = document.createElement("p");
    err.innerText = msg;
    card.innerText = "";
    err.classList.add("error");
    err.classList.add("p");
    card.style.display = "flex"
    card.appendChild(err);

}
 