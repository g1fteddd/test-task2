import { Col, Flex, Pagination, Row } from 'antd'
import { useQuery } from '@tanstack/react-query'
import movieService from '../../api/entities/movie'
import { MoviesList } from '../../components/MoviesList'
import { PageLoader } from '../../components/PageLoader'
import { ERROR_MESSAGE } from '../../utils/consts/textConsts'
import { useSearchParams } from 'react-router-dom'
import { MoviesFilters } from '../../components/MoviesFilters'

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

  //FIXME: вынести в отдельные хуки
  const { data, status } = useQuery({
    queryKey: ['movie', ...searchParams.entries()],
    queryFn: () =>
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

  //FIXME: сделать скелетоны
  if (status === 'pending') {
    return <PageLoader />
  }
  //FIXME: сделать отдельную страницу с ошибкой
  if (status === 'error') return <p>{ERROR_MESSAGE}</p>

  return (
    <Flex gap="large" vertical>
      <Flex justify="flex-end">
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
      </Flex>
      <Row>
        <Col span={6}>
          <MoviesFilters
            filters={searchParams}
            onChangeFilter={handleChangeFilter}
          />
        </Col>
        <Col span={16} offset={2}>
          <MoviesList movies={data.data.docs} />
        </Col>
      </Row>
      <Flex justify="flex-end">
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
      </Flex>
    </Flex>
  )
}

export default MoviesPage
