const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: false,
    historyApiFallback: true,
    proxy: {
      '/generateMaze': {
        target: 'http://ec2-3-77-201-33.eu-central-1.compute.amazonaws.com',
        changeOrigin: true,
      },
    },
  },
});
