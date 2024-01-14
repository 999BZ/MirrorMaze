<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-center gap-5">
      <div class="flex h-auto justify-center content-center flex-wrap w-1/4">
        <button class="px-5 py-2 text-lg border-2 border-black bg-black/10 h-min" :disabled="this.stop"
          @click="getMaze">New
          maze</button>
      </div>
      <div class="flex flex-wrap flex-col">
        <div v-for="(row, rowIndex) in maze" :key="`row${rowIndex}`" class="flex">
          <div v-for="(cell, colIndex) in row" :key="`col${colIndex}`"
            class="w-12 h-12 hover:border-2 cursor-pointer border-black" :disabled="this.stop"
            @click="setMirror(rowIndex, colIndex)" :class="{
              'bg-white': !cell.status,
              'bg-yellow-400': cell.status,
              'border-t-2': cell[0] == 'Wall',
              'border-r-2': cell[1] == 'Wall',
              'border-b-2': cell[2] == 'Wall',
              'border-l-2': cell[3] == 'Wall',
            }">
            <img :src="cell.mirror == 1 ? mirror1 : mirror2" class="w-full h-full" v-if="cell.mirror">
          </div>
        </div>
      </div>
      <div class="flex h-auto justify-center content-center flex-wrap w-1/4">
        <button class="px-5 py-2 text-lg border-2 border-black bg-black/10 h-min" :disabled="this.stop"
          @click="showSolution">Show
          solution</button>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <div class="w-auto flex gap-2">
        <img :src="mirror1" class="w-16 h-16 border-2 border-black cursor-pointer" :disabled="this.stop"
          @click="selectMirror(1)" :class="{ 'bg-gray-500': this.selectedMirror == 1 }">
        <img :src="mirror2" class="w-16 h-16 border-2 border-black cursor-pointer" :disabled="this.stop"
          @click="selectMirror(2)" :class="{ 'bg-gray-500': this.selectedMirror == 2 }">
        <button class="px-5 py-2 text-lg border-2 border-red-500" :disabled="this.stop" @click="selectRemove" :class="{
          'text-red-500 bg-white': !this.removeSelected,
          'bg-red-500 text-white': this.removeSelected
        }">Remove
          mirror</button>
      </div>
    </div>

    <div class="w-full flex justify-center">
      <div class="w-auto gap-2 flex">
        <button class="px-5 py-2 text-lg border-2 border-black" :disabled="this.stop" @click="start()">Start</button>
        <button class="px-5 py-2 text-lg border-2 border-black" :disabled="this.stop" @click="reset()">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../services/api.js';

export default {
  beforeMount() {
    this.getMaze();
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
      endPoint: 0,
      stop: false,
    };
  },
  methods: {
    async getMaze() {
      let a = await Api.getGeneratedMaze();
      if (this.startPoint == null) {
        this.startPoint = 9;
      }
      this.maze = a.data;
      this.resetMaze = a.data;
    },
    showSolution() {
      // Get the solution from backend using API
    },
    setMirror(rowIndex, colIndex) {
      if (this.removeSelected)
        this.maze[rowIndex][colIndex].mirror = 0;
      else if (this.selectedMirror != 0) {
        this.maze[rowIndex][colIndex].mirror = this.selectedMirror;
        if (!this.maze[rowIndex][colIndex].status) {
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
      this.stop = true;
      for (let i = 0; i < this.maze.length; i++) {
        for (let j = 0; j < this.maze[0].length; j++) {
          this.maze[i][j].status = false;
          this.maze[i][j].mirror = null;
        }
      }
      this.removeSelected = false;
      this.selectedMirror = 0;
      this.stop = false;
    },
    async start() {
      this.stop = true;
      let rowIndex = this.startPoint, colIndex = 0, dir = 'left';
      while (colIndex != this.maze[0].length || rowIndex != this.endPoint) {
        this.maze[rowIndex][colIndex].status = true;
        await new Promise(resolve => setTimeout(resolve, 200));
        if (dir == 'left') {
          if (this.maze[rowIndex][colIndex].mirror == 1) {
            if (this.maze[rowIndex][colIndex][2] == 'Wall') break;
            dir = 'up';
            rowIndex++;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            if (this.maze[rowIndex][colIndex][0] == 'Wall') break;
            dir = 'down';
            rowIndex--;
          } else {
            if (this.maze[rowIndex][colIndex][1] == 'Wall') break;
            colIndex++;
          }
        } else if (dir == 'right') {
          if (this.maze[rowIndex][colIndex].mirror == 1) {
            if (this.maze[rowIndex][colIndex][0] == 'Wall') break;
            dir = 'down';
            rowIndex--;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            if (this.maze[rowIndex][colIndex][2] == 'Wall') break;
            dir = 'up';
            rowIndex++;
          } else {
            if (this.maze[rowIndex][colIndex][3] == 'Wall') break;
            colIndex--;
          }
        } else if (dir == 'up') {
          if (this.maze[rowIndex][colIndex].mirror == 1) {
            if (this.maze[rowIndex][colIndex][1] == 'Wall') break;
            dir = 'left';
            colIndex++;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            if (this.maze[rowIndex][colIndex][3] == 'Wall') break;
            dir = 'right';
            colIndex--;
          } else {
            if (this.maze[rowIndex][colIndex][2] == 'Wall') break;
            rowIndex++;
          }
        } else if (dir == 'down') {
          if (this.maze[rowIndex][colIndex].mirror == 1) {
            if (this.maze[rowIndex][colIndex][3] == 'Wall') break;
            dir = 'right';
            colIndex--;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            if (this.maze[rowIndex][colIndex][1] == 'Wall') break;
            dir = 'left';
            colIndex++;
          } else {
            if (this.maze[rowIndex][colIndex][0] == 'Wall') break;
            rowIndex--;
          }
        } else {
          console.log('Error');
        }
      }
      if (colIndex == this.maze[0].length && rowIndex == this.endPoint) {
        alert('Well done. You have finished it.');
      } else {
        alert('You lost. Good luck next time!');
        for (let i = 0; i < this.maze.length; i++) {
          for (let j = 0; j < this.maze[0].length; j++) {
            this.maze[i][j].status = false;
          }
        }
      }
      this.stop = false;
    }
  }
};
</script>