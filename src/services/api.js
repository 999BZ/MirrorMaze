import axios from "axios";

export default {
  async getGeneratedMaze(difficulty) {
    console.log("🚀 ~ getGeneratedMaze ~ difficulty:", difficulty);

    let config = {
      method: "get",
      url: "https://fiek.mirrormaze.rf.gd/generateMaze/",
      // data: { difficulty },
    };

    try {
      const response = await axios.request(config);
      return response;
    } catch (error) {
      console.log("🚀 ~ getGeneratedMaze ~ error:", error);
      return false;
    }
  },
};
