import React from "react";
import "./Divider.styles.css";

interface DividerProps {
  color?: "purple" | "yellow";
}

function Divider({ color = "purple" }: DividerProps) {
  return <hr className={`divider divider-${color}`} />;
}

export default Divider;
