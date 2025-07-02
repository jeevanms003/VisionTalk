import React from "react";

function DescriptionBox({ text, loading }) {
  return (
    <div className={`desc-box ${loading ? "loading" : ""}`}>
      <p>{loading ? "Thinking..." : text}</p>
    </div>
  );
}

export default DescriptionBox;