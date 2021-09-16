import React, { Component } from 'react'
import { getMovies, deleteMovie } from '../services/movieService'
import { getGenres } from '../services/genreService'
import Pagination from './common/pagination'
import { paginate } from '../utils/paginate'
import ListGroup from './common/listGroup'
import MoviesTable from './moviesTable'
import { Link } from 'react-router-dom'
import SearchBox from './common/searchBox'
import _ from 'lodash'
import { toast } from 'react-toastify'
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    searchQuery: '',
    selectedGenre: null,
    currentPage: 1,
    sortColumn: {
      path: 'title',
      order: 'asc',
    },
  }

  componentDidMount = async () => {
    const { data } = await getGenres()
    const genres = [{ _id: '', name: 'All Genres' }, ...data]
    const { data: movies } = await getMovies()
    this.setState({ movies, genres })
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies
    const movies = originalMovies.filter(m => m._id !== movie._id)
    this.setState({ movies })

    try {
      await deleteMovie(movie._id)
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted.')

      this.setState({ movies: originalMovies })
    }
  }

  handleLike = movie => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index] = { ...movies[index] }
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
  }

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: '' })
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
      movies: allMovies,
      selectedGenre,
    } = this.state

    let filtered = allMovies

    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      )
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const movies = paginate(sorted, currentPage, pageSize)

    return { totalCount: filtered.length, data: movies }
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
  }

  render() {
    const { length: count } = this.state.movies
    const { currentPage, pageSize, sortColumn, genres, selectedGenre, searchQuery } = this.state
    if (count === 0) return <p>There are no movies in the database.</p>

    const { totalCount, data: movies } = this.getPagedData()

    return (
      <div className="row">
        <div className="col-md-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link className="btn btn-primary mb-2" to="/movies/new">
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            onLike={this.handleLike}
          />
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }
}

export default Movies
