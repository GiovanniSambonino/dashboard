import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';


function App() {
	/*const [count, setCount] = useState(0)*/

	/*return (
		<Grid container spacing={5}>
			<Grid xs={12} sm={4} md={3} lg={2}>1</Grid>
			<Grid xs={6} sm={4} md={3} lg={2}>2</Grid>
			<Grid xs={6} sm={4} md={3} lg={2}>3</Grid>
			<Grid xs={12} sm={4} md={3} lg={2}>4</Grid>
			<Grid xs={6} sm={4} md={6} lg={2}>5</Grid>
			<Grid xs={6} sm={4} md={6} lg={2}>6</Grid>
		  </Grid>
	  )*/
	/*return (
		
		<Grid xs={6} md={4} lg={2}>
			<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
		</Grid>       
		
	)*/
	/*return (
		
		<Grid xs={6} sm={4} md={3} lg={2}>
			<Summary></Summary>
		</Grid>        
		
	)*/

	{/* Variable de estado y función de actualización */ }

	let [indicators, setIndicators] = useState<JSX.Element[]>([]);

	{/* Hook: useEffect */ }

	{/* Función para el efecto secundario a ejecutar y Arreglo de dependencias */ }


	useEffect(() => {

		(async () => {

			{/* Request */ }

			// let API_KEY = "c454fc0cd4a51d6c133cacb90ae5e198"
			// let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
			// let savedTextXML = await response.text();

			{/* 2. Del LocalStorage, obtiene el valor de las claves openWeatherMap y expiringTime */ }

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

			{/* Arreglo para agregar los resultados */ }

			let dataToIndicators = new Array()

			{/* 
				Análisis, extracción y almacenamiento del contenido del XML 
				en el arreglo de resultados
			*/}

			let location0 = xml.getElementsByTagName("location")[0]

			let Name = location0.getElementsByTagName("name")[0].textContent
			dataToIndicators.push(["City", "name", Name])

			let Country = location0.getElementsByTagName("country")[0].textContent
			dataToIndicators.push(["Country", "Country", Country])

			let Timezone = location0.getElementsByTagName("timezone")[0].textContent
			dataToIndicators.push(["Timezone", "Timezone", Timezone])

			let location = xml.getElementsByTagName("location")[1]

			let geobaseid = location.getAttribute("geobaseid")
			dataToIndicators.push(["Location", "geobaseid", geobaseid])

			let latitude = location.getAttribute("latitude")
			dataToIndicators.push(["Location", "Latitude", latitude])

			let longitude = location.getAttribute("longitude")
			dataToIndicators.push(["Location", "Longitude", longitude])

			console.log(dataToIndicators)

			{/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */ }

			let indicatorsElements: JSX.Element[] = Array.from(dataToIndicators).map(
				(element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
			)

			{/* Modificación de la variable de estado mediante la función de actualización */ }

			setIndicators(indicatorsElements)

		})()


	}, [])

	return (
		<Grid container spacing={5}>
			<Grid xs={6} md={4} lg={2}>
				<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
			</Grid>
			<Grid xs={6} md={4} lg={2}>
				<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
			</Grid>
			<Grid xs={6} md={4} lg={2}>
				<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
			</Grid>
			<Grid xs={6} md={4} lg={2}>
				<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
			</Grid>
			<Grid xs={6} md={4} lg={2}>
				<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
			</Grid>
			<Grid xs={6} md={4} lg={2}>
				<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
			</Grid>
			<Grid xs={6} sm={4} md={3} lg={2}  >
				<Grid xs={6} lg={2} sx={{ paddingBottom: "5%" }}>
					{indicators[0]}
					{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
				</Grid>
				<Grid xs={6} lg={2} sx={{ paddingBottom: "5%" }}>
					{indicators[1]}
					{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
				</Grid>
				<Grid xs={6} lg={2} sx={{ paddingBottom: "5%" }}>
					{indicators[2]}
					{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
				</Grid>
				<Grid xs={6} lg={2} sx={{ paddingBottom: "5%" }}>
					{indicators[3]}
					{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
				</Grid>
				<Grid xs={6} lg={2} sx={{ paddingBottom: "5%" }}>
					{indicators[4]}
					{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
				</Grid>
				<Grid xs={6} lg={2} sx={{ paddingBottom: "5%" }}>
					{indicators[5]}
					{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
				</Grid>
				<Grid xs={6} md={4} lg={2} sx={{ paddingBottom: "5%" }}>
					<Summary></Summary>
				</Grid>
			</Grid>
			<Grid xs={12} md={6} lg={9} >
				<BasicTable />
			</Grid>
			<Grid xs={12} lg={2}>
				<ControlPanel />
			</Grid>
			<Grid xs={12} lg={10}>
				<WeatherChart></WeatherChart>
			</Grid>

		</Grid>

	)
}

export default App
