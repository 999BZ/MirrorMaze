import axios from "axios";

export default {
  async getGeneratedMaze(difficulty) {
    console.log("🚀 ~ getGeneratedMaze ~ difficulty:", difficulty);
    let config = {
      method: "get",
      url: "//ec2-3-77-201-33.eu-central-1.compute.amazonaws.com/generateMaze",
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
