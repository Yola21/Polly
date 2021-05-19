import axios from 'axios';

const list = () => axios.get("/polls");
const create = payload => axios.post("/polls/", payload);
const show = slug => axios.get(`/polls/${slug}`);
const update = ({ slug, payload }) => axios.put(`/polls/${slug}`, payload);
const destroy = slug => axios.delete(`/polls/${slug}`);

const pollsApi = {
  list,
  create,
  show,
  update,
  destroy,
};

export default pollsApi;