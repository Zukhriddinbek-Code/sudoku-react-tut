import React from "react";
import Tile from "./Tile";

const Board = ({ puzzle, grid, handleChange }) => {
  <div className="board">
    <Tile puzzle={puzzle} grid={grid} handleChange={handleChange} />
  </div>;
};

export default Board;
