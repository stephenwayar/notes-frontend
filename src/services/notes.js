import axios from "axios";

const baseURL = "https://hidden-cove-28467.herokuapp.com/api/notes"

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(res => {
    return res.data
  })
}

const create = newObject => {
  const request = axios.post(baseURL, newObject)
  return request.then(res => {
    return res.data
  } )
}

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject)
  return request.then(res => {
    return res.data
  })
}

export default { getAll, create, update }