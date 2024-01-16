<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-center gap-5">
      <div class="flex h-auto justify-center content-center flex-wrap w-1/2">
        <custom-button text="New Maze" @do-action="this.chooseDifficulty = true" :disabled="this.stop"></custom-button>
      </div>
      <div class="flex justify-center" style="width: 32.5rem; height: 32.5rem;" v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <div class="flex h-auto justify-center" v-else>
        <div class="h-full flex flex-col justify-end">
          <img src="./assets/light.png" class="bg-white border-y" :style="{ height: `${100 / this.maze.length}%` }" />
        </div>
        <div class="flex flex-wrap flex-col" style="height: 32.5rem; width: 32.5rem;">
          <div v-for="(row, rowIndex) in maze" :key="`row${rowIndex}`" class="flex"
            :style="{ height: `${100 / this.maze.length}%` }">
            <div v-for="(cell, colIndex) in row" :key="`col${colIndex}`" :style="{ width: `${100 / this.maze.length}%` }"
              class="hover:border-2 cursor-pointer border-black" :disabled="this.stop"
              @click="setMirror(rowIndex, colIndex)" :class="{
                'bg-white': !cell.status,
                'bg-sky-400': cell.status,
                'border-t-2': cell[0] == 'Wall',
                'border-r-2': cell[1] == 'Wall',
                'border-b-2': cell[2] == 'Wall',
                'border-l-2': cell[3] == 'Wall',
              }">
              <img :src="cell.mirror == 1 ? mirror1 : mirror2" class="w-full h-full" v-if="cell.mirror"
                :class="{ 'rotate-180': cell.rotate }">
            </div>
          </div>
        </div>
        <div class="h-full flex flex-col justify-start">
          <img src="./assets/light.png" class="bg-white border-y" :style="{ height: `${100 / this.maze.length}%` }" />
        </div>
      </div>
      <div class="flex h-auto justify-center content-center flex-wrap w-1/2">
        <custom-button text="Show solution" @do-action="showSolution" :disabled="this.stop"></custom-button>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <div class="w-auto flex gap-2">
        <img src="./assets/p1.png" class="w-16 h-16 border-2 border-black cursor-pointer" :disabled="this.stop"
          @click="selectMirror(1)" :class="{ 'bg-black/50': this.selectedMirror == 1 }">
        <img src="./assets/p2.png" class="w-16 h-16 border-2 border-black cursor-pointer" :disabled="this.stop"
          @click="selectMirror(2)" :class="{ 'bg-black/50': this.selectedMirror == 2 }">
        <custom-button text="Remove mirror" @do-action="selectRemove" :disabled="this.stop" :class="{
          'text-red-500 bg-white': !this.removeSelected,
          'bg-red-500 text-white': this.removeSelected
        }"></custom-button>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <div class="w-auto gap-2 flex">
        <custom-button text="Start" @do-action="start" :disabled="this.stop"></custom-button>
        <custom-button text="Reset" @do-action="reset(true)" :disabled="this.stop"></custom-button>
      </div>
    </div>
  </div>
  <alert-box v-if="this.result" :result="result" @close-box="this.result = null" @try-again="reset"></alert-box>
  <difficulty-box v-if="this.chooseDifficulty" @close-box="this.chooseDifficulty = false"
    @choose-difficulty="getMaze"></difficulty-box>
</template>


<script>
import Api from './services/api.js';

import CustomButton from './components/CustomButton.vue';
import AlertBox from './components/AlertBox.vue';
import DifficultyBox from './components/DifficultyBox.vue';
import BaseSpinner from './components/BaseSpinner.vue';

export default {
  name: 'App',
  components: {
    CustomButton,
    AlertBox,
    BaseSpinner,
    DifficultyBox,
  },
  beforeMount() {
    this.getMaze();
  },
  data() {
    return {
      maze: [],
      selectedMirror: 0,
      removeSelected: false,
      mirror1: require('./assets/1.png'),
      mirror2: require('./assets/2.png'),
      directionFrom: 'left',
      startPoint: null,
      endPoint: 0,
      stop: false,
      result: null,
      isLoading: false,
      chooseDifficulty: false,
    };
  },
  methods: {
    async getMaze(difficulty) {
      this.isLoading = true;
      this.chooseDifficulty = false;
      let a = await Api.getGeneratedMaze(difficulty);
      if (this.startPoint == null) {
        this.startPoint = 9;
      }
      this.maze = a.data;
      this.resetMaze = a.data;
      this.isLoading = false;
    },
    showSolution() {
      // Get the solution from backend using API
    },
    setMirror(rowIndex, colIndex) {
      if (this.removeSelected)
        this.maze[rowIndex][colIndex].mirror = 0;
      else if (this.selectedMirror != 0)
        this.maze[rowIndex][colIndex].mirror = this.selectedMirror;

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
    reset(shouldRemoveMirrors = false) {
      this.stop = true;
      if (shouldRemoveMirrors) {
        for (let i = 0; i < this.maze.length; i++) {
          for (let j = 0; j < this.maze[0].length; j++) {
            this.maze[i][j].status = false;
            this.maze[i][j].mirror = null;
          }
        }
      } else {
        for (let i = 0; i < this.maze.length; i++) {
          for (let j = 0; j < this.maze[0].length; j++) {
            this.maze[i][j].status = false;
          }
        }
      }
      this.removeSelected = false;
      this.selectedMirror = 0;
      this.stop = false;
      this.result = null;
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
            this.maze[rowIndex][colIndex].rotate = true;
            dir = 'up';
            rowIndex++;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            if (this.maze[rowIndex][colIndex][0] == 'Wall') break;
            this.maze[rowIndex][colIndex].rotate = false;
            dir = 'down';
            rowIndex--;
          } else {
            if (this.maze[rowIndex][colIndex][1] == 'Wall') break;
            colIndex++;
          }
        } else if (dir == 'right') {
          if (this.maze[rowIndex][colIndex].mirror == 1) {
            if (this.maze[rowIndex][colIndex][0] == 'Wall') break;
            this.maze[rowIndex][colIndex].rotate = false;
            dir = 'down';
            rowIndex--;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            if (this.maze[rowIndex][colIndex][2] == 'Wall') break;
            this.maze[rowIndex][colIndex].rotate = true;
            dir = 'up';
            rowIndex++;
          } else {
            if (this.maze[rowIndex][colIndex][3] == 'Wall') break;
            colIndex--;
          }
        } else if (dir == 'up') {
          if (this.maze[rowIndex][colIndex].mirror == 1) {
            if (this.maze[rowIndex][colIndex][1] == 'Wall') break;
            this.maze[rowIndex][colIndex].rotate = false;
            dir = 'left';
            colIndex++;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            if (this.maze[rowIndex][colIndex][3] == 'Wall') break;
            this.maze[rowIndex][colIndex].rotate = false;
            dir = 'right';
            colIndex--;
          } else {
            if (this.maze[rowIndex][colIndex][2] == 'Wall') break;
            rowIndex++;
          }
        } else if (dir == 'down') {
          if (this.maze[rowIndex][colIndex].mirror == 1) {
            if (this.maze[rowIndex][colIndex][3] == 'Wall') break;
            this.maze[rowIndex][colIndex].rotate = true;
            dir = 'right';
            colIndex--;
          } else if (this.maze[rowIndex][colIndex].mirror == 2) {
            if (this.maze[rowIndex][colIndex][1] == 'Wall') break;
            this.maze[rowIndex][colIndex].rotate = true;
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
        this.result = 'success';
      } else {
        this.result = 'failure';
      }
      this.stop = false;
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
