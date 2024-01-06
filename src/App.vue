<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <MazePattern />
</template>

<script>
// import { useToast } from "vue-toastification";

import MazePattern from './components/MazePattern.vue'

export default {
  name: 'App',
  components: {
    MazePattern
  },
  // setup() {
  //   const toast = useToast();
  //   return { toast };
  // },
  methods: {
    makeNotification(a) {
      if (a == 'notification') {
        this.toast.info(this.notification(a), this.notificationObject());
      }
    }
  },

  notificationObject(a = '') {
    const obj = {
      position: "top-center",
      timeout: 3200,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false,
    }

    if (a == 'NewMessage') {
      obj.onClick = () => {
        this.$router.push("/messages");
      }
    }

    return obj;
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
