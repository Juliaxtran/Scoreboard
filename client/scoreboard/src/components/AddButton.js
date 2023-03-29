import React from "react";
import NewMatchForm from "./NewMatchForm";
import NewGameForm from "./NewGameForm";
import NewPlayerForm from "./NewPlayerForm";
import { Box } from "@mui/system";


const AddButton = ({setPromise}) => {


  return (
    <div className="add-buttons">
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2

      }}> <NewPlayerForm setPromise={setPromise}/>
      <NewGameForm setPromise={setPromise}/>
      <NewMatchForm />


    </Box>
    </div>
  );
};

export default AddButton;
