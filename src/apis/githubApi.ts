import axios from "axios";

const tokenGitHub = import.meta.env.VITE_GITHUB_TOKEN;

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: tokenGitHub,
  },
});
