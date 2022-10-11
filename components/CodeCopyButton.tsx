import React from "react";

const CodeCopyButton = () => {
  return (
    <div className="btn">
      <div className="btn_squares">
        <div className="btn_square"></div>
        <div className="btn_square"></div>
      </div>
      <span className="btn_text">Copy</span>
    </div>
  );
};

export default CodeCopyButton;
