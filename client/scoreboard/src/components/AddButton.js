import React from "react";
import NewMatchForm from "./NewMatchForm";
import NewGameForm from "./NewGameForm";
import NewPlayerForm from "./NewPlayerForm";
import { Box } from "@mui/system";


const AddButton = ({ setError }) => {


  return (
    <div className="add-buttons">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2

        }}> <NewPlayerForm setError={setError} />
        <NewGameForm setError={setError} />
        <NewMatchForm setError={setError} />
      </Box>
    </div>
  );
};

export default AddButton;
