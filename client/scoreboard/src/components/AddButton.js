import React from "react";
import { Button, Modal, Typography, Box } from "@mui/material";
import NewMatchForm from "./NewMatchForm";
import NewGameForm from "./NewGameForm";
import NewPlayerForm from "./NewPlayerForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  bgcolor: "background.paper",
};

const AddButton = () => {


  return (
    <>
      <NewMatchForm
    
      />
      <NewPlayerForm
   
      />
      <NewGameForm
       
      />
      
    </>
  );
};

export default AddButton;
