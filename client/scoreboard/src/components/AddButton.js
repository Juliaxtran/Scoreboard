import React from "react";
import NewMatchForm from "./NewMatchForm";
import NewGameForm from "./NewGameForm";
import NewPlayerForm from "./NewPlayerForm";
import { Box , useMediaQuery} from "@mui/material";




const AddButton = ({ setError }) => {
const isMobile = useMediaQuery("(max-width:450px)");

  return (
    <div className="add-buttons">
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column": "row",
          alignItems: isMobile ? 'center': null,
          justifyContent: "center",
          mt: isMobile ? 0 : 2,
        }}>
        <NewPlayerForm setError={setError} />
        <NewGameForm setError={setError} />
        <NewMatchForm setError={setError} />
      </Box>
    </div>
  );
};

export default AddButton;
