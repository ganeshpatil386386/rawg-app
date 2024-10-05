import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "c21f40fe6bc04b99be8e71304985194e",
  },
});
