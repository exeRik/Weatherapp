import { data } from "autoprefixer";


export const getFacts = async () => {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m",{
            method: "GET",
        })
          return await response.json();
        
       }