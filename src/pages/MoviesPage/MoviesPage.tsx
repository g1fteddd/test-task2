import { Pagination } from 'antd'
import { useQuery } from '@tanstack/react-query'
import movieService from '../../api/entities/movie'
import { MoviesList } from '../../components/MoviesList'
import { PageLoader } from '../../components/PageLoader'
import { ERROR_MESSAGE } from '../../utils/consts/textConsts'
import { useSearchParams } from 'react-router-dom'
import { MoviesFilters } from '../../components/MoviesFilters'
import { SearchMovies } from '../../components/SearchMovies'
import styles from './MoviesPage.module.scss'
export enum FilterMoviesKeys {
  PAGE = 'page',
  LIMIT = 'limit',
  COUNTRIES = 'countries.name',
  AGE_RATING = 'ageRating',
  YEAR = 'year',
}

export interface FilterMovies {
  [FilterMoviesKeys.PAGE]: string
  [FilterMoviesKeys.LIMIT]: string
  [FilterMoviesKeys.COUNTRIES]: string
  [FilterMoviesKeys.AGE_RATING]: string
  [FilterMoviesKeys.YEAR]: string
}

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { data, status } = useQuery({
    queryKey: ['movie', ...searchParams.entries()],
    queryFn: ({ signal }) =>
      movieService.getMovie({
        config: {
          params: {
            [FilterMoviesKeys.PAGE]: searchParams.get(FilterMoviesKeys.PAGE),
            [FilterMoviesKeys.LIMIT]: searchParams.get(FilterMoviesKeys.LIMIT),
            [FilterMoviesKeys.COUNTRIES]: searchParams.get(
              FilterMoviesKeys.COUNTRIES
            ),
            [FilterMoviesKeys.YEAR]: searchParams.get(FilterMoviesKeys.YEAR),
            [FilterMoviesKeys.AGE_RATING]: searchParams.get(
              FilterMoviesKeys.AGE_RATING
            ),
          },
          signal,
        },
      }),
  })

  const updateSearchParams = (key: FilterMoviesKeys, value: string) => {
    setSearchParams((searchParams) => {
      searchParams.set(key, value)
      return searchParams
    })
  }

  const handleChangePage = (page: number, pageSize: number) => {
    updateSearchParams(FilterMoviesKeys.PAGE, `${page}`)
    updateSearchParams(FilterMoviesKeys.LIMIT, `${pageSize}`)
  }

  const handleChangeFilter = (key: FilterMoviesKeys, value: string) => {
    updateSearchParams(key, value ? value : '')
  }

  if (status === 'pending') {
    return <PageLoader />
  }

  if (status === 'error') return <p>{ERROR_MESSAGE}</p>

  return (
    <div className={styles.MoviesPage}>
      <div className={styles.searchContainer}>
        <SearchMovies className={styles.search} />
      </div>

      <div className={styles.mainContainer}>
        <MoviesFilters
          filters={searchParams}
          onChangeFilter={handleChangeFilter}
        />
        <MoviesList className={styles.movieList} movies={data.data.docs} />
      </div>
      <div className={styles.pagination}>
        <Pagination
          showQuickJumper
          current={parseInt(searchParams.get(FilterMoviesKeys.PAGE) || '1', 10)}
          pageSize={parseInt(
            searchParams.get(FilterMoviesKeys.LIMIT) || '10',
            10
          )}
          total={data.data.total}
          onChange={handleChangePage}
        />
      </div>
    </div>
  )
}

export default MoviesPage
