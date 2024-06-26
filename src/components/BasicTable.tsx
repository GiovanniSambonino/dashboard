// src/components/BasicTable.tsx

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Tablehead from '@mui/material/Tablehead';
import Tablerow from '@mui/material/Tablerow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
//   image: string,
// ) {
//   return { name, calories, fat, carbs, protein, image };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jpVGhsCffJLP5zwHKbBswWEPAuX0y-uEpQ&s'),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3,'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IceCreamSandwich.jpg/1200px-IceCreamSandwich.jpg'),
//   createData('Eclair', 262, 16.0, 24, 6.0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_Nt-jSSTsnpjcsR7RxEhJzX6f3YhdwouDA&s'),
//   createData('Cupcake', 305, 3.7, 67, 4.3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiKEyEdBYYiOZQlcJwDs7bOVNn3WtjCMzfxg&s'),
//   createData('Gingerbread', 356, 16.0, 49, 3.9,'https://www.skinnytaste.com/wp-content/uploads/2011/12/low-fat-gingerbread-men-500x425.jpg'),
// ];
{/* 3. Declare la interfaz del prop de entrada */ }

interface Config {
  rows: Array<object>;
}

export default function BasicTable(data: Config) {
  {/* 
         4. Declare la variable de estado (rows) y la función de actualización (setRows).
         Use el mismo identificador de la variable con valores fijos (rows)
     */}

  let [rows, setRows] = useState([])
  {/* 
         5. Agregue el hook useEffect, controlado por el prop del componente (data), y
         Dentro del hook, invoque al métdo de actualización con el valor del prop (data.rows).
     */}

  useEffect(() => {

    (() => {

      setRows(data.rows)

    })()

  }, [data])


  {/* JSX */ }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minwidth: 650 }} aria-label="simple Table">
        <Tablehead>
          <Tablerow>
            <TableCell>dessert (100g serving)</TableCell>
            <TableCell align="right">calories</TableCell>
            <TableCell align="right">fat&nbsp;(g)</TableCell>
            <TableCell align="right">carbs&nbsp;(g)</TableCell>
            <TableCell align="right">protein&nbsp;(g)</TableCell>
            <TableCell align="center">example</TableCell>
          </Tablerow>
        </Tablehead>
        <TableBody>
          {rows.map((row) => (
            <Tablerow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="center">
                <img src={row.image} alt={row.name} style={{ maxwidth: '50%', height: 'auto' }} />
              </TableCell>
            </Tablerow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}
