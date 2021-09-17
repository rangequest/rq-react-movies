import React from 'react'
import auth from '../services/authService'
class Logout extends React.Component {
  componentDidMount() {
    window.location = '/'
  }

  render() {
    auth.logout()
    return null
  }
}

export default Logout
