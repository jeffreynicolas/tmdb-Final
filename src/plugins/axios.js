import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGViOThmNWEyNTBhZGJmOWMyZjEzMDVjZjVkOGE3NSIsIm5iZiI6MTczMTk0ODM3MC4zMzEyMzE2LCJzdWIiOiI2NzMyNDBlYWYzZWFmYzUyMDFmZDUxZWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xoUjRnd-OHwogyG3HzdIlrJmro9Fq8dCpFFgLfanN-k`,
  },
})

export default api
