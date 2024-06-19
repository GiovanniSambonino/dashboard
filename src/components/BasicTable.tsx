// src/components/BasicTable.tsx

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  image: string,
) {
  return { name, calories, fat, carbs, protein, image };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jpVGhsCffJLP5zwHKbBswWEPAuX0y-uEpQ&s'),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3,'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IceCreamSandwich.jpg/1200px-IceCreamSandwich.jpg'),
  createData('Eclair', 262, 16.0, 24, 6.0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_Nt-jSSTsnpjcsR7RxEhJzX6f3YhdwouDA&s'),
  createData('Cupcake', 305, 3.7, 67, 4.3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiKEyEdBYYiOZQlcJwDs7bOVNn3WtjCMzfxg&s'),
  createData('Gingerbread', 356, 16.0, 49, 3.9,'https://www.skinnytaste.com/wp-content/uploads/2011/12/low-fat-gingerbread-men-500x425.jpg'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="center">Example</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="center">
              <img src={row.image} alt={row.name} style={{ maxWidth: '50%', height: 'auto' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
