import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css'
import Indicator from './components/Indicator';
import CityIndicator from './components/CityIndicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import Navbar from './components/Navbar';
import TimeNow from './components/TimeNow';
import { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";



function App() {

    const [rowsTable, setRowsTable] = useState([])
    const [cityData, setCityData] = useState([])
    const [indicators, setIndicators] = useState([])
    const [summaries, setSummaries] = useState([])
    const [chartData, setChartData] = useState([["Hora", "Precipitación", "Humedad", "Nubosidad"]]);
    const [originalChartData, setOriginalChartData] = useState([]);
    const [selectedVariable, setSelectedVariable] = useState('all');

    {/* Hook: useEffect */ }

    {/* Función para el efecto secundario a ejecutar y Arreglo de dependencias */ }


    useEffect(() => {

        (async () => {

            let savedTextXML = localStorage.getItem("openWeatherMap")
            let expiringTime = localStorage.getItem("expiringTime")

            {/* 3. Obtenga la estampa de tiempo actual */ }

            let nowTime = (new Date()).getTime();

            {/* 4. Realiza la petición asicrónica cuando: 
				(1) La estampa de tiempo de expiración (expiringTime) es nula, o  
				(2) La estampa de tiempo actual es mayor al tiempo de expiración */}

            if (expiringTime === null || nowTime > parseInt(expiringTime)) {

                {/* 5. Request */ }

                let API_KEY = "c454fc0cd4a51d6c133cacb90ae5e198"
                let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
                savedTextXML = await response.text();


                {/* 6. Diferencia de tiempo */ }

                let hours = 1
                let delay = hours * 3600000


                {/* 7. En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */ }

                localStorage.setItem("openWeatherMap", savedTextXML)
                localStorage.setItem("expiringTime", (nowTime + delay).toString())

            }
            {/* XML Parser */ }

            const parser = new DOMParser();
            const xml = parser.parseFromString(savedTextXML, "application/xml");

            let dataToCityIndicator = new Array()

            {/* 
				Análisis, extracción y almacenamiento del contenido del XML 
				en el arreglo de resultados
			*/}

            let location = xml.getElementsByTagName("location")[0];
            let locationNode = location.getElementsByTagName("location")[0];
            let cityName = location.getElementsByTagName("name")[0].textContent;
            dataToCityIndicator.push(cityName);
            let country = location.getElementsByTagName("country")[0].textContent;
            dataToCityIndicator.push(country);
            let timezone = location.getElementsByTagName("timezone")[0].textContent;
            dataToCityIndicator.push(timezone);
            let latitude = locationNode.getAttribute("latitude");
            dataToCityIndicator.push(latitude);
            let longitude = locationNode.getAttribute("longitude");
            dataToCityIndicator.push(longitude);

            setCityData(dataToCityIndicator)

            let dataToIndicators = [];

            let forecastElement = xml.getElementsByTagName("forecast")[0].getElementsByTagName("time")[0];

            let temperature = forecastElement.getElementsByTagName("temperature")[0].getAttribute("value");
            let temperatureMin = forecastElement.getElementsByTagName("temperature")[0].getAttribute("min");
            let temperatureMax = forecastElement.getElementsByTagName("temperature")[0].getAttribute("max");
            let humidity = forecastElement.getElementsByTagName("humidity")[0].getAttribute("value");
            let probability = forecastElement.getElementsByTagName("precipitation")[0]?.getAttribute("probability");

            dataToIndicators.push(
                {
                    title: 'Temperatura (Kelvin)',
                    min: parseFloat(temperatureMin),
                    avg: parseFloat(temperature),
                    max: parseFloat(temperatureMax)
                },
                {
                    title: 'Humedad',
                    min: parseFloat(humidity),
                    avg: parseFloat(humidity),
                    max: parseFloat(humidity)
                },
                {
                    title: 'Precipitación',
                    probability: parseFloat(probability)
                }
            );

            setIndicators(dataToIndicators);

            let forecastElements = Array.from(xml.getElementsByTagName("forecast")[0].getElementsByTagName("time"));
            let summaryData = [];
            let chartDataArray = [];
            let daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

            // Variables para controlar los días ya agregados
            let currentDay = new Date().getDate();
            let addedDays = [];
            for (let i = 0; i < forecastElements.length; i++) {
                let forecast = forecastElements[i];
                let date = new Date(forecast.getAttribute("from"));
                let day = daysOfWeek[date.getDay()];
                let temperature = forecast.getElementsByTagName("temperature")[0].getAttribute("value");
                let icon = forecast.getElementsByTagName("symbol")[0].getAttribute("var");
                let formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;
                let time = date.toTimeString().split(" ")[0].slice(0, 5);
                let precipitation = forecast.getElementsByTagName("precipitation")[0]?.getAttribute("probability");
                let humidity = forecast.getElementsByTagName("humidity")[0].getAttribute("value");
                let clouds = forecast.getElementsByTagName("clouds")[0].getAttribute("all");

                chartDataArray.push([time, parseFloat(precipitation), parseFloat(humidity), parseFloat(clouds)]);

                // Añadir solo un pronóstico por día y saltar el día actual
                if (date.getDate() !== currentDay && !addedDays.includes(date.getDate())) {
                    summaryData.push({
                        day: day,
                        temperature: `${(parseFloat(temperature) - 273.15).toFixed(1)}°C`, // Convertir de Kelvin a Celsius
                        date: formattedDate,
                        icon: icon
                    });
                    addedDays.push(date.getDate());
                }

                let arrayObjects = Array.from(xml.getElementsByTagName("time")).map(
                    (timeElement) => {
                        let fromTime = timeElement.getAttribute("from").split("T");
                        let toTime = timeElement.getAttribute("to").split("T");

                        let date = fromTime[0];
                        let time = fromTime[1] + " - " + toTime[1];

                        let windSpeed =
                            timeElement
                                .getElementsByTagName("windSpeed")[0]
                                .getAttribute("mps") + " m/s";
                        let windDirection =
                            timeElement
                                .getElementsByTagName("windDirection")[0]
                                .getAttribute("deg") +
                            " " +
                            timeElement
                                .getElementsByTagName("windDirection")[0]
                                .getAttribute("code");
                        let temperatureKelvin = parseFloat(
                            timeElement
                                .getElementsByTagName("temperature")[0]
                                .getAttribute("value")
                        );
                        let temperatureCelsius =
                            (temperatureKelvin - 273.15).toFixed(2) + "°C";

                        let humidity = parseFloat(
                            timeElement
                                .getElementsByTagName("humidity")[0]
                                .getAttribute("value")
                        );

                        let cloudiness = parseFloat(
                            timeElement.getElementsByTagName("clouds")[0].getAttribute("all")
                        );

                        return {
                            date: date,
                            time: time,
                            windSpeed: windSpeed,
                            windDirection: windDirection,
                            temperature: temperatureCelsius,
                            humidity: humidity,
                            cloudiness: cloudiness,
                        };
                    }
                );

                arrayObjects = arrayObjects.slice(0, 8);
                setRowsTable(arrayObjects);


                // Parar cuando tengamos 6 días de pronóstico
                if (summaryData.length >= 6) {
                    break;
                }
            }
            chartDataArray.unshift(["Hora", "Precipitación", "Humedad", "Nubosidad"]);
            setSummaries(summaryData);
            setChartData(chartDataArray);
            setOriginalChartData(chartDataArray);


        })()


    }, [])

    useEffect(() => {
        let newChartData = [["Hora", "Variable"]];
        switch (selectedVariable) {
            case 'precipitation':
                newChartData = originalChartData.map((row, index) => index === 0 ? ["Hora", "Precipitación"] : [row[0], row[1]]);
                break;
            case 'humidity':
                newChartData = originalChartData.map((row, index) => index === 0 ? ["Hora", "Humedad"] : [row[0], row[2]]);
                break;
            case 'clouds':
                newChartData = originalChartData.map((row, index) => index === 0 ? ["Hora", "Nubosidad"] : [row[0], row[3]]);
                break;
            default:
                newChartData = originalChartData;
        }
        setChartData(newChartData);
    }, [selectedVariable, originalChartData]);

    return (
        <>
            <Navbar />
            <Grid xs={12} sm={12} md={12} lg={12}>
                    <TimeNow />
                </Grid>
            <Grid container spacing={5} sx={{ mt: 10 }}>
                <Grid xs={12} md={12} lg={12} id="indicadores">
                    <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                        Informacion General
                    </Typography>
                </Grid>
                <Grid xs={6} md={4} lg={2}>
                    <CityIndicator
                        cityName={cityData[0]}
                        country={cityData[1]}
                        timezone={parseInt(cityData[2])}
                        latitude={parseFloat(cityData[3])}
                        longitude={parseFloat(cityData[4])}
                    />
                </Grid>
                
                {indicators.map((indicator, index) => (
                    <Grid key={index} xs={6} md={4} lg={2}>
                        <Indicator {...indicator} />
                    </Grid>
                ))}

                <Grid xs={12} md={12} lg={12} id="pronosticos">
                    <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                        Pronósticos de la Semana
                    </Typography>
                </Grid>

                {summaries.map((summary, index) => (
                    <Grid key={index} xs={6} sm={4} md={3} lg={2}>
                        <Summary
                            day={summary.day}
                            temperature={summary.temperature}
                            date={summary.date}
                            icon={summary.icon}
                        />
                    </Grid>
                ))}

                <Grid xs={12} md={12} lg={12} id="tendencias">
                    <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                        Tendencias climáticas
                    </Typography>
                </Grid>
                <Grid xs={12} lg={10}>
                    <ControlPanel onChange={setSelectedVariable} />
                </Grid>
                <Grid xs={12} lg={10}>
                    <WeatherChart data={chartData} />
                </Grid>
                <Grid xs={12} md={12} lg={12} id="prodet">
                    <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                        Pronosticos Detallados
                    </Typography>
                </Grid>
                <Grid xs={12} md={12} lg={12}>

                    <BasicTable rows={rowsTable}></BasicTable>

                </Grid>
            </Grid>
        </>
    )
}

export default App