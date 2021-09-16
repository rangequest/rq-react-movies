import http from './httpService'
import { apiUrl } from '../config.json'

const apiEndpoint = apiUrl + '/movies'

const movieUrl = id => {
  return `${apiEndpoint}/${id}`
}

export const getMovies = () => {
  return http.get(apiEndpoint)
}

export const getMovie = movieId => {
  return http.get(movieUrl(movieId))
}

export const saveMovie = movie => {
  if (movie._id) {
    const body = { ...movie }
    delete body._id
    return http.put(movieUrl(movie._id), body)
  }

  return http.post(apiEndpoint, movie)
}

export const deleteMovie = movieId => {
  return http.delete(movieUrl(movieId))
}
