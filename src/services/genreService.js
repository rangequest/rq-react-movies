import http from './httpService'
import { apiUrl } from '../config.json'
export const getGenres = () => {
  return http.get(apiUrl + '/genres')
}
