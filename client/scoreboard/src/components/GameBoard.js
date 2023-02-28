import React from 'react'
import { Paper, Box } from '@mui/material';

const GameBoard = () => {
  return (

    <Box
      sx={{
     
    
        textAlign: "center",
        "& > :not(style)": {
          m: 1,
          width:  850,
          height: 400,
        },
      }}
    >     
      <Paper sx={{ backgroundColor: "#cdcdcdf5",    "& > :not(style)": {
          m: 1,
          width:  390,
          height: 300,
        }, display:'flex', justifyContent: 'center',
        textAlign: "center" }} 
        elevation={2}>

             <h1>Games</h1>     
        <Paper sx={{display:'flex', justifyContent: 'center', flexDirection:'column'}}>
                <h1>Catan</h1>
                <h3>Most Wins: Patrice</h3>
                <h3>Description:</h3> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <h3>Most Losses: Ryan</h3>
            </Paper>
            <Paper sx={{display:'flex', justifyContent: 'center', flexDirection:'column'}}>
                <h1>Jenga</h1>
                <h3>Most Wins: Patrice</h3>
                <h3>Description:</h3> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <h3>Most Losses: Ryan</h3>
            </Paper>
            <Paper sx={{display:'flex', justifyContent: 'center', flexDirection:'column'}}>
                <h1>Chess</h1>
                <h3>Most Wins: Patrice</h3>
                <h3>Description:</h3> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <h3>Most Losses: Ryan</h3>
            </Paper>
            
      </Paper>
    </Box>
  
  )
}

export default GameBoard; 