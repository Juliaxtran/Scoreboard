import React from 'react'
import { Paper, Box } from '@mui/material';

const MatchBoard = () => {
  return (
    <>
   
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

             <h1>Previous Matches</h1>     
        <Paper sx={{display:'flex', justifyContent: 'center', flexDirection:'column'}}>
                <h1>Catan</h1>
                <h3>Winner: Patrice</h3>
                <h3>Players: Julia, Tyler, Pat, Rebecca</h3>
                <h3>Date Played: Feb. 3, 2023</h3>
            </Paper>
            <Paper sx={{display:'flex', justifyContent: 'center', flexDirection:'column'}}>
                <h1>Jenga</h1>
                <h3>Winner: Patrice</h3>
                <h3>Players: Julia, Tyler, Pat, Rebecca</h3>
                <h3>Date Played: Feb. 3, 2023</h3>
            </Paper>
            <Paper sx={{display:'flex', justifyContent: 'center', flexDirection:'column'}}>
                <h1>Chess</h1>
                <h3>Winner: Patrice</h3>
                <h3>Players: Julia, Tyler, Pat, Rebecca</h3>
                <h3>Date Played: Feb. 3, 2023</h3>
            </Paper>
            
      </Paper>
    </Box>
  </>
  )
}

export default MatchBoard; 