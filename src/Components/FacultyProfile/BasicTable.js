import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable({rows, rowHead}) {
	console.log(rows);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Qualifications</TableCell>
            <TableCell >Stream</TableCell>
            <TableCell >Course</TableCell>
            <TableCell >Institute</TableCell>
            <TableCell >BoardUniversity</TableCell>
			<TableCell >AdmissionYear</TableCell>
			<TableCell >PassingYear</TableCell>
			<TableCell >Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.Qualifications}</TableCell>
              <TableCell >{row.Stream}</TableCell>
              <TableCell >{row.Course}</TableCell>
              <TableCell >{row.Institute}</TableCell>
			  <TableCell >{row.BoardUniversity}</TableCell>
			  <TableCell >{row.AdmissionYear}</TableCell>
			  <TableCell>{row.PassingYear}</TableCell>
			  <TableCell >{row.Percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
