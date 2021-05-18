import axios from 'axios';

const list = () => axios.get("/polls");
const create = payload => axios.post("/polls/", payload);
const show = slug => axios.get(`/polls/${slug}`);

const pollsApi = {
  list,
  create,
  show,
};

export default pollsApi;