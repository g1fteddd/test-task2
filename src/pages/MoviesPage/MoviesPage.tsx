import { Col, Flex, Pagination, Row } from 'antd'
import { useQuery } from '@tanstack/react-query'
import movieService from '../../api/entities/movie'
import { MoviesList } from '../../components/MoviesList'
import { PageLoader } from '../../components/PageLoader'
import { ERROR_MESSAGE } from '../../utils/consts/textConsts'
import { useEffect, useState } from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { MoviesFilters } from '../../components/MoviesFilters'

export enum FilterMoviesKeys {
  COUNTRIES = 'countries.name',
  AGE_RATING = 'ageRating',
  YEAR = 'year',
}

export interface FilterMovies {
  [FilterMoviesKeys.COUNTRIES]: string
  [FilterMoviesKeys.AGE_RATING]: string
  [FilterMoviesKeys.YEAR]: string
}

interface SearchMoviesParams extends FilterMovies {
  page: string
  pageSize: string
}

const MoviesPage = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState<FilterMovies>({
    [FilterMoviesKeys.COUNTRIES]: '',
    [FilterMoviesKeys.AGE_RATING]: '',
    [FilterMoviesKeys.YEAR]: '',
  })

  //FIXME: вынести в отдельные хуки
  const { data, status } = useQuery({
    queryKey: ['movie', page, pageSize, filters],
    queryFn: () =>
      movieService.getMovie({
        config: {
          params: {
            page,
            limit: pageSize,
            ...filters,
          },
        },
      }),
  })

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const handleChangeFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  //FIXME: исправить баг с двумя запросами, если фильтры сохранены в url
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchMoviesParams

      setPage(parseInt(params.page, 10))
      setPageSize(parseInt(params.pageSize, 10))
    }
  }, [])

  useEffect(() => {
    const queryString = qs.stringify({
      page,
      pageSize,
      //TODO: добавить фильтры и подумать, как можно по другому вытягивать query параметры
    })

    navigate(`?${queryString}`)
  }, [navigate, page, pageSize])

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
          current={page}
          pageSize={pageSize}
          total={data.data.total}
          onChange={handleChangePage}
        />
      </Flex>
      <Row>
        <Col span={6}>
          <MoviesFilters
            filters={filters}
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
          current={page}
          pageSize={pageSize}
          total={data.data.total}
          onChange={handleChangePage}
        />
      </Flex>
    </Flex>
  )
}

export default MoviesPage
