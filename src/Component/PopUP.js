import React from "react";

export default function PopUP({ visible, content, bgRed }) {
  return (
    <div
      style={
        bgRed
          ? { backgroundColor: "rgb(201, 62, 62)" }
          : { backgroundColor: "rgb(70, 193, 70)" }
      }
      className={visible ? "pop-up visible" : "pop-up"}
    >
      {content}
    </div>
  );
}
