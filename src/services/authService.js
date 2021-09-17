import http from './httpService'
import { apiUrl } from '../config.json'
import jwtDeocode from 'jwt-decode'

const apiEndpoint = apiUrl + '/auth'
const tokenKey = 'rq-token'

http.setJwt(getJwt())

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndpoint, { email, password })
  localStorage.setItem(tokenKey, jwt)
}

export const loginWithJwt = jwt => {
  localStorage.setItem(tokenKey, jwt)
}

export const logout = () => {
  localStorage.removeItem(tokenKey)
}

export const getJwt = () => {
  return localStorage.getItem(tokenKey)
}

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey)
    return jwtDeocode(jwt)
  } catch (error) {
    return null
  }
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
}

export default auth
