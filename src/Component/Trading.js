import React from "react";
import { useParams } from "react-router-dom";
import TradingChild from "./TradingChild";

const Trading = () => {
  const { id } = useParams();
  return <TradingChild key={id} id={id} />;
};

export default Trading;
