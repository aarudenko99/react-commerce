import axios from 'axios'
import url from '../../api/api'

export const listProducts = (token) => {
  return axios.get(url.dev + '/products', {
    headers: {
      'Authorization': token
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data)
}