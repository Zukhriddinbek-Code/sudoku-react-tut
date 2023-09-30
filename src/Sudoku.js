import React, { useState, useRef } from "react";
import Board from "./ui/Board";
import Interface from "./ui/Interface";
import { REST } from "./services/api";

function copy2DArray(from, to) {
  for (let i = 0; i < from.length; i++) {
    to[i] = [...from[i]];
  }
}

const getGrid = () => {
  let grid = [];

  for (let i = 0; i < 9; i++) {
    grid.push(Array(9).fill(0));
  }
  return grid;
};

const Sudoku = () => {
  const [grid, setGrid] = useState(getGrid);
  const [puzzleStatus, setPuzzeStatus] = useState("");
  const initialGrid = useRef(getGrid());

  // this function will render front end puzzle, it will return which we receive from backend
  async function handleCreate() {
    try {
      const response = await REST.getBoard();
      const data = await response.json();
      return data.game;
    } catch (error) {
      console.log(error);
    }
  }

  // this will validate our grid
  async function handleValidate() {
    try {
      const response = await REST.validateBoard(grid);
      const data = await response.json();
      return data.status;
    } catch (error) {
      console.log(error);
    }
  }

  //we will pass our grid that we have in frontend to the backend and we check whether the grid is solved or not
  async function handleSolve() {
    try {
      const response = await REST.solveBoard(grid);
      const data = await response.json();
      if (data.status) {
        setPuzzeStatus("-- SOLVED --");
        return data.solution;
      } else {
        setPuzzeStatus("-- UNSOLVABLE --");
        return grid;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleInterface(action) {
    let newGrid;
    switch (action) {
      case "create":
        newGrid = await handleCreate();
        setPuzzeStatus("");
        copy2DArray(newGrid, initialGrid.current);
        setGrid(newGrid);
        break;

      case "solve":
        newGrid = await handleSolve();
        setGrid(newGrid);
        break;

      case "validate":
        const status = await handleValidate();
        const puzzStats = status ? "-- SOLVED --" : "-- UNSOLVED --";
        setPuzzeStatus(puzzStats);
        break;
      default:
        throw new Error("Invalid action");
    }
  }

  function handleChange(row, col, e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (Number(e.target.value) < 10 && initialGrid.current[row][col] === 0) {
        const newGrid = [...grid];
        newGrid[row][col] = Number(e.target.value);
        setGrid(newGrid);
      }
    }
  }

  return (
    <div className="Sudoku">
      <Board
        puzzle={initialGrid.current}
        grid={grid}
        handleChange={handleChange}
      />
      <Interface handleInterface={handleInterface} status={puzzleStatus} />
    </div>
  );
};

export default Sudoku;
