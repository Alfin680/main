import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './Donarlist.css';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  
const Donarlist = () => {

  const [donors, setDonors] = useState([]);
  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await axios.get('http://localhost:15000/acc/donors'); // Make API request to fetch donors
      setDonors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Donation'>
        <TableContainer style={{margin: "15px", borderRadius: "10px" }} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">NAME</StyledTableCell>
                <StyledTableCell align="center">BLOOD GROUP</StyledTableCell>
                <StyledTableCell align="center">EMAIL</StyledTableCell>
                <StyledTableCell align="center">MOBILE NUMBER</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donors.map((donor,index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {donor.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{donor.bloodGroup}</StyledTableCell>
                  <StyledTableCell align="center">{donor.email}</StyledTableCell>
                  <StyledTableCell align="center">{donor.phone}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
    </div>
  )
}

export default Donarlist