import axios from "axios";

const baseURL = "/api/notes"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseURL)
  const res = await request;
  return res.data;
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseURL, newObject, config)

  const res = await request;

  return res.data;
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject)
  const res = await request;
  return res.data;
}

const noteService = { getAll, create, update, setToken }

export default noteService