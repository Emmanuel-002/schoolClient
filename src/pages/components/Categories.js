import React from "react";
import Button from "./Button";
import { styled } from "@mui/material";

const Categories = ({ categories, onSelected, selected }) => (
  <ButtonGroup>
    <ListGroup>
    {categories.map((title, index) => (
      <Button title={title} key={index} onClicked={cat => onSelected(cat)} />
    ))}
    <Span>{selected.toUpperCase()}</Span>
    </ListGroup>
    {/* <ListGroup>
      
    </ListGroup> */}
  </ButtonGroup>
);

export default Categories;


const ButtonGroup = styled("div")`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const ListGroup = styled("ul")`
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
`;

const Span = styled("span")`
  color:  #7F00FF;
  padding: 10px;
  text-align: center;
  text-decoration: underline;
`;