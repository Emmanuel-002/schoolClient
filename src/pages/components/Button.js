import React from "react";
import { styled } from "@mui/material";

const Button = ({ title, onClicked }) => (
  <List onClick={() => onClicked(title)}>
    {title.toUpperCase()}
  </List>
);

export default Button;

const List = styled("li")`
  margin: 5px;
  padding: 6px;
  border-radius: 3px;
  background-color: #2c2c2c;
  color: whitesmoke;
  cursor: pointer;
`