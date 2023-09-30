const util = {
  print2DArray: function (grid) {
    for (let i = 0; i < grid.length; i++) {
      console.log(...grid[i]);
    }
  },
  copyGrid: function (from, to) {
    for (let i = 0; i < from.length; i++) {
      to[i] = [...from[i]];
    }
  },
};

export { util };
