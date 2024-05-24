import React from "react";

const Quote = ({ quote, author }) => (
  <div style={{textAlign:"center"}}>
    <div>"{quote}"</div>
    <div style={{fontWeight:"bold"}}>Author - {author}</div>
  </div>
);

export default Quote;
