import { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';


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
				<Grid xs={6} md={4} lg={2}sx={{ paddingBottom: "5%" }}>
					<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
				</Grid>
				<Grid xs={6} md={4} lg={2}sx={{ paddingBottom: "5%" }}>
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
