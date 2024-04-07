import { Col, Row } from 'antd'
import { useQuery } from '@tanstack/react-query'
import movieService from '../../api/entities/movie'
import { MoviesList } from '../../components/MoviesList'
import { PageLoader } from '../../components/PageLoader'
import { ERROR_MESSAGE } from '../../utils/consts/textConsts'
import { PerPage } from '../../components/PerPage'
import { useState } from 'react'
import { PerPageValue } from '../../components/PerPage/PerPage'

const MoviesPage = () => {
  //FIXME: вынести в отдельные хуки
  const { data, status } = useQuery({
    queryKey: ['movie'],
    queryFn: () => movieService.getMovie(),
  })

  const [perPage, setPerPage] = useState<PerPageValue | null>(10)

  const handleChangePerPage = (value: PerPageValue) => {
    setPerPage(value)
  }

  console.log(data?.data)

  if (status === 'pending') {
    return <PageLoader />
  }
  //FIXME: сделать отдельную страницу с ошибкой
  if (status === 'error') return <p>{ERROR_MESSAGE}</p>

  return (
    <>
      <Row>
        <Col span={24}>
          <PerPage value={perPage} onChange={handleChangePerPage} />
        </Col>
      </Row>
      <Row>
        <Col span={6}>filters</Col>
        <Col span={18}>
          <MoviesList movies={data.data.docs} />
        </Col>
      </Row>
    </>
  )
}

export default MoviesPage
