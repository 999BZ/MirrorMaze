<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-center">
      <div class="flex flex-wrap flex-col border-2 border-black">
        <div v-for="(row, rowIndex) in maze" :key="`row${rowIndex}`" class="flex">
          <div v-for="(cell, colIndex) in row" :key="`col${colIndex}`" class="w-8 h-8 hover:border-2 cursor-pointer"
            @click="setMirror(rowIndex, colIndex)" :class="{
              'bg-black border-white': cell.status == 0,
              'bg-white border-black': cell.status == 1,
              'bg-green-400 border-black': cell.status == 2,
            }">
            <img :src="cell.mirror == 1 ? mirror1 : mirror2" class="w-full h-full" v-if="cell.mirror != 0">
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <div class="w-auto flex gap-2">
        <img :src="mirror1" class="w-16 h-16 border-2 border-black cursor-pointer" @click="selectMirror(1)"
          :class="{ 'bg-gray-500': this.selectedMirror == 1 }">
        <img :src="mirror2" class="w-16 h-16 border-2 border-black cursor-pointer" @click="selectMirror(2)"
          :class="{ 'bg-gray-500': this.selectedMirror == 2 }">
        <button class="px-3 py-2 rounded-lg border-2 border-red-500" @click="selectRemove" :class="{
          'text-red-500 bg-white': !this.removeSelected,
          'bg-red-500 text-white': this.removeSelected
        }">Remove
          mirror</button>
      </div>
    </div>

    <div class="w-full flex justify-center">
      <div class="w-auto gap-2 flex">
        <button class="px-3 py-2 rounded-lg border-2 border-green-500 text-green-500" @click="start()">Start</button>
        <button class="px-3 py-2 rounded-lg border-2 border-sky-500 text-sky-500" @click="reset()">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.generateMaze();
  },
  data() {
    return {
      maze: [],
      selectedMirror: 0,
      removeSelected: false,
      mirror1: require('../assets/1.png'),
      mirror2: require('../assets/2.png'),
      directionFrom: 'left',
      startPoint: null,
      endPoint: 5,
    };
  },
  methods: {
    generateMaze() {
      let matrix = [
        [{ status: 0, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 },
        { status: 0, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 }],
        [{ status: 1, mirror: 0 }, { status: 1, mirror: 0 }, { status: 1, mirror: 0 }, { status: 1, mirror: 0 },
        { status: 1, mirror: 0 }, { status: 1, mirror: 0 }, { status: 1, mirror: 0 }, { status: 0, mirror: 0 }],
        [{ status: 0, mirror: 0 }, { status: 1, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 },
        { status: 0, mirror: 0 }, { status: 0, mirror: 0 }, { status: 1, mirror: 0 }, { status: 0, mirror: 0 }],
        [{ status: 0, mirror: 0 }, { status: 1, mirror: 0 }, { status: 1, mirror: 0 }, { status: 1, mirror: 0 },
        { status: 1, mirror: 0 }, { status: 1, mirror: 0 }, { status: 1, mirror: 0 }, { status: 0, mirror: 0 }],
        [{ status: 0, mirror: 0 }, { status: 1, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 },
        { status: 0, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 }],
        [{ status: 0, mirror: 0 }, { status: 1, mirror: 0 }, { status: 1, mirror: 0 }, { status: 1, mirror: 0 },
        { status: 0, mirror: 0 }, { status: 1, mirror: 0 }, { status: 1, mirror: 0 }, { status: 1, mirror: 0 }],
        [{ status: 0, mirror: 0 }, { status: 1, mirror: 0 }, { status: 0, mirror: 0 }, { status: 1, mirror: 0 },
        { status: 1, mirror: 0 }, { status: 1, mirror: 0 }, { status: 1, mirror: 0 }, { status: 0, mirror: 0 }],
        [{ status: 0, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 },
        { status: 0, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 }, { status: 0, mirror: 0 }]
      ];
      // for (let i = 0; i < 8; i++) {
      //   const row = [];
      //   for (let j = 0; j < 8; j++) {
      //     const cell = {
      //       status: Math.floor(Math.random() * 2),
      //       mirror: false
      //     };
      //     row.push(cell);
      //   }
      //   matrix.push(row);
      // }

      for (let i = 0; i < 8; i++) {
        if (matrix[i][0].status == 1) {
          this.startPoint = i;
          break;
        }
      }

      if (this.startPoint == null) {
        this.startPoint = 3;
      }
      matrix[this.startPoint][0].status = 2;
      this.maze = matrix;
      this.resetMaze = matrix;
    },
    setMirror(rowIndex, colIndex) {
      if (this.removeSelected)
        this.maze[rowIndex][colIndex].mirror = 0;
      else if (this.selectedMirror != 0) {
        this.maze[rowIndex][colIndex].mirror = this.selectedMirror;
        if (this.maze[rowIndex][colIndex].status == 2) {
          if (this.directionFrom == 'left') {
            this.directionFrom = this.selectedMirror == 1 ? 'up' : 'down';
          } else if (this.directionFrom == 'right') {
            this.directionFrom = this.selectedMirror == 1 ? 'down' : 'up';
          } else if (this.directionFrom == 'up') {
            this.directionFrom = this.selectedMirror == 1 ? 'left' : 'right';
          } else if (this.directionFrom == 'down') {
            this.directionFrom = this.selectedMirror == 1 ? 'right' : 'left';
          }
        }
      }
    },
    selectMirror(num) {
      if (this.selectedMirror == num) this.selectedMirror = 0;
      else this.selectedMirror = num;
      this.removeSelected = false;
    },
    selectRemove() {
      this.removeSelected = !this.removeSelected;
      this.selectedMirror = 0;
    },
    reset() {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (this.maze[i][j].status == 2) this.maze[i][j].status = 1;
          this.maze[i][j].mirror = 0
        }
      }
      this.maze[this.startPoint][0].status = 2;
      this.removeSelected = false;
      this.selectedMirror = 0;
    },
    async start() {
      let rowIndex = this.startPoint, colIndex = 0, dir = 'left';
      while (rowIndex < 8 && colIndex < 8 && this.maze[rowIndex][colIndex].status != 0) {
        this.maze[rowIndex][colIndex].status = 2;
        await new Promise(resolve => setTimeout(resolve, 200));
        if (dir == 'left') {
          if (this.maze[rowIndex][colIndex].mirror == 1) {
            dir = 'up';
            rowIndex++;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            dir = 'down';
            rowIndex--;
          } else {
            colIndex++;
          }
        } else if (dir == 'right') {
          if (this.maze[rowIndex][colIndex].mirror == 1) {
            dir = 'down';
            rowIndex--;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            dir = 'up';
            rowIndex++;
          } else {
            colIndex--;
          }
        } else if (dir == 'up') {
          if (this.maze[rowIndex][colIndex].mirror == 1) {
            dir = 'left';
            colIndex++;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            dir = 'right';
            colIndex--;
          } else {
            rowIndex++;
          }
        } else if (dir == 'down') {
          if (this.maze[rowIndex][colIndex].mirror == 1) {
            dir = 'right';
            colIndex--;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            dir = 'left';
            colIndex++;
          } else {
            rowIndex--;
          }
        } else {
          console.log('Error');
        }
      }
      if (colIndex == this.maze[0].length && rowIndex == this.endPoint) {
        alert('Well done. You have finished it.');
      } else {
        alert('You lost. Good luck next time!')
      }
    }
  }
};
</script>