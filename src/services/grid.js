var helpers = require("./helpers");

export default class Grid {
  constructor(start_coords, grid) {
    this.start_coords = start_coords;
    this.grid = grid;
    this.x_left_wall = 0;
    this.x_right_wall = grid[0].length - 1;
    this.y_up_wall = 0;
    this.y_down_wall = grid.length - 1;
    this.coords_examined = [];
  }

  //returns boolean
  has_seen_coords(coords) {
    for (var i = 0; i < this.coords_examined.length; i++) {
      if (JSON.stringify(this.coords_examined[i]) == JSON.stringify(coords)) {
        return true;
      }
    }
    return false;
  }

  //returns boolean
  hit_a_wall(coords) {
    var x = coords[1];
    var y = coords[0];
    if (x > this.x_right_wall || x < this.x_left_wall) {
      return true;
    } else if (y > this.y_down_wall || y < this.y_up_wall) {
      return true;
    } else {
      return false;
    }
  }

  //internal wrapper around get_distance, returns number
  get_total_distance() {
    return this.get_distance(this.start_coords, "RIGHT");
  }

  //number of steps from lazer to wall, returns number
  get_distance(coords, curr_motion) {
    let c = false,
      distance_seen,
      next_coords,
      next_dir;
    var coords_with_dir = coords.concat(curr_motion);
    if (this.has_seen_coords(coords_with_dir)) {
      return -1;
    }
    this.coords_examined.push(coords_with_dir);

    if (this.hit_a_wall(coords)) {
      return 0;
    } else {
      var chr = this.grid[coords[0]][coords[1]];
      if (helpers.is_mirror(chr)) {
        switch (chr) {
          case "/":
            next_dir = helpers.get_next_dir(coords, curr_motion, "/");
            next_coords = helpers.get_next_coords(coords, next_dir);
            distance_seen = this.get_distance(next_coords, next_dir);
            if (distance_seen === -1) {
              c = -1;
            } else {
              c = 1 + distance_seen;
            }
            break;
          case "\\":
            next_dir = helpers.get_next_dir(coords, curr_motion, "\\");
            next_coords = helpers.get_next_coords(coords, next_dir);
            distance_seen = this.get_distance(next_coords, next_dir);
            if (distance_seen === -1) {
              c = -1;
            } else {
              c = 1 + distance_seen;
            }
            break;
          case "O":
            next_dir = helpers.get_next_dir(coords, curr_motion, "O");
            next_coords = helpers.get_next_coords(coords, next_dir);
            distance_seen = this.get_distance(next_coords, next_dir);
            if (distance_seen === -1) {
              c = -1;
            } else {
              c = 1 + distance_seen;
            }
            break;
          default:
            break;
        }
      }

      switch (chr) {
        case "-":
          next_coords = helpers.get_next_coords(coords, curr_motion);
          distance_seen = this.get_distance(next_coords, curr_motion);
          if (distance_seen === -1) {
            c = -1;
          } else {
            c = 1 + distance_seen;
          }
          break;
        case "@":
          next_coords = helpers.get_next_coords(coords, curr_motion);
          distance_seen = this.get_distance(next_coords, curr_motion);
          if (distance_seen === -1) {
            c = -1;
          } else {
            c = 1 + distance_seen;
          }
          break;
        case "^":
          next_coords = helpers.get_next_coords(coords, "UP");
          distance_seen = this.get_distance(next_coords, "UP");
          if (distance_seen === -1) {
            c = -1;
          } else {
            c = 1 + distance_seen;
          }
          break;
        case "v":
          next_coords = helpers.get_next_coords(coords, "DOWN");
          distance_seen = this.get_distance(next_coords, "DOWN");
          if (distance_seen === -1) {
            c = -1;
          } else {
            c = 1 + distance_seen;
          }
          break;
        case ">":
          next_coords = helpers.get_next_coords(coords, "RIGHT");
          distance_seen = this.get_distance(next_coords, "RIGHT");
          if (distance_seen === -1) {
            c = -1;
          } else {
            c = 1 + distance_seen;
          }
          break;
        case "<":
          next_coords = helpers.get_next_coords(coords, "LEFT");
          distance_seen = this.get_distance(next_coords, "LEFT");
          if (distance_seen === -1) {
            c = -1;
          } else {
            c = 1 + distance_seen;
          }
          break;
        default:
          break;
      }
      if (c) return c;
    }
  }
}
