import React from 'react'
import Like from './common/like'
import Table from './common/table'
import { Link } from 'react-router-dom'
import auth from '../services/authService'
class MoviesTable extends React.Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />,
    },
  ]

  deleteColumn = {
    key: 'delete',
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        type="button"
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  }

  constructor() {
    super()
    const user = auth.getCurrentUser()
    user && user.isAdmin && this.columns.push(this.deleteColumn)
  }

  render() {
    const { movies, sortColumn, onSort } = this.props

    return <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort} />
  }
}

export default MoviesTable
