import axios from "axios";

export default {
  async getGeneratedMaze(difficulty) {
    console.log("🚀 ~ getGeneratedMaze ~ difficulty:", difficulty);

    let config = {
      method: "get",
      url: "http://ec2-18-195-148-12.eu-central-1.compute.amazonaws.com/generateMaze",
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
