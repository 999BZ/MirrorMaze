export default {
  parse_to_grid: function (str) {
    var grid_lines = str.split("\n");
    var grid = [];
    for (var i = 0; i < grid_lines.length; i++) {
      var grid_line_split = grid_lines[i].split("");
      grid.push(grid_line_split);
    }
    return grid;
  },

  is_mirror: function (chr) {
    return chr == "/" || chr == "\\" || chr == "O";
  },

  get_start_coords: function (grid, startChar) {
    for (var i = 0; i < grid.length; i++) {
      if (grid[i].includes(startChar)) {
        return [i, grid[i].indexOf(startChar)];
      }
    }
  },

  get_next_coords: function (coords, motion) {
    let c = false;
    switch (motion) {
      case "UP":
        c = [coords[0] - 1, coords[1]];
        break;
      case "DOWN":
        c = [coords[0] + 1, coords[1]];
        break;
      case "LEFT":
        c = [coords[0], coords[1] - 1];
        break;
      case "RIGHT":
        c = [coords[0], coords[1] + 1];
        break;
      default:
        break;
    }
    if (c) return c;
  },

  get_next_dir: function (coords, curr_motion, chr) {
    let c = false;
    if (chr == "/") {
      switch (curr_motion) {
        case "UP":
          c = "RIGHT";
          break;
        case "DOWN":
          c = "LEFT";
          break;
        case "LEFT":
          c = "DOWN";
          break;
        case "RIGHT":
          c = "UP";
          break;
        default:
          break;
      }
    } else if (chr == "\\") {
      switch (curr_motion) {
        case "UP":
          c = "LEFT";
          break;
        case "DOWN":
          c = "RIGHT";
          break;
        case "LEFT":
          c = "UP";
          break;
        case "RIGHT":
          c = "DOWN";
          break;
        default:
          break;
      }
    } else if (chr == "O") {
      switch (curr_motion) {
        case "UP":
          c = "DOWN";
          break;
        case "DOWN":
          c = "UP";
          break;
        case "LEFT":
          c = "RIGHT";
          break;
        case "RIGHT":
          c = "LEFT";
          break;
        default:
          break;
      }
    }

    if (c) return c;
  },
};
