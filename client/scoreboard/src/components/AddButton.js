import React from "react";
import NewMatchForm from "./NewMatchForm";
import NewGameForm from "./NewGameForm";
import NewPlayerForm from "./NewPlayerForm";
import { Box } from "@mui/system";


const AddButton = ({setError, error}) => {


  return (
    <div className="add-buttons">
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2

      }}> <NewPlayerForm setError={setError} error={error}/>
      <NewGameForm setError={setError} error={error}/>
      <NewMatchForm  setError={setError} error={error}/>


    </Box>
    </div>
  );
};

export default AddButton;
