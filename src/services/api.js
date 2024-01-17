import axios from "axios";

export default {
  async getGeneratedMaze(difficulty) {
    let config = {
      method: "get",
      url: `https://fiek.mirrormaze.rf.gd/generateMaze/${difficulty}`,
    };

    try {
      const response = await axios.request(config);
      return response;
    } catch (error) {
      console.log("🚀 ~ getGeneratedMaze ~ error:", error);
      return false;
    }
  },
  async getSolution(solutionType, maze) {
    let config = {
      method: "post",
      url: `https://fiek.mirrormaze.rf.gd/solution/${solutionType}`,
      data: { data: maze },
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    };

    try {
      const response = await axios.request(config);
      return response;
    } catch (error) {
      console.log("🚀 ~ getSolution ~ error:", error);
      return false;
    }
  },
};
