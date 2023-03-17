import React from "react";
import NewMatchForm from "./NewMatchForm";
import NewGameForm from "./NewGameForm";
import NewPlayerForm from "./NewPlayerForm";

const AddButton = () => {
  return (
    <>
      <NewMatchForm />
      <NewPlayerForm />
      <NewGameForm />
    </>
  );
};

export default AddButton;
