import React from "react";
import NewMatchForm from "./NewMatchForm";
import NewGameForm from "./NewGameForm";
import NewPlayerForm from "./NewPlayerForm";
import { Box } from "@mui/system";


const AddButton = () => {


  return (
    <div className="add-buttons">
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2

      }}> <NewPlayerForm />
      <NewGameForm />
      <NewMatchForm />


    </Box>
    </div>
  );
};

export default AddButton;
