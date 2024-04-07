import { Col, Flex, Pagination, Row } from 'antd'
import { useQuery } from '@tanstack/react-query'
import movieService from '../../api/entities/movie'
import { MoviesList } from '../../components/MoviesList'
import { PageLoader } from '../../components/PageLoader'
import { ERROR_MESSAGE } from '../../utils/consts/textConsts'
import { useState } from 'react'

const MoviesPage = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  //FIXME: вынести в отдельные хуки
  const { data, status } = useQuery({
    queryKey: ['movie', page, pageSize],
    queryFn: () =>
      movieService.getMovie({
        config: {
          params: {
            page,
            limit: pageSize,
          },
        },
      }),
  })

  console.log(data?.data)

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
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
          current={page}
          pageSize={pageSize}
          total={data.data.total}
          onChange={handleChangePage}
        />
      </Flex>
      <Row>
        <Col span={6}>filters</Col>
        <Col span={18}>
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
