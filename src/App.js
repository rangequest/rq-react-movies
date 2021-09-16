import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/navBar'
import Movies from './components/movies'
import MovieForm from './components/movieForm'
import Customers from './components/customers'
import Rentals from './components/rentals'
import NotFound from './components/notFound'
import LoginForm from './components/loginForm'
import RegisterForm from './components/registerForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <main role="main" className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  )
}

export default App
