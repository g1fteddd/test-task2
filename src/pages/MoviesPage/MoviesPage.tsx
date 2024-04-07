import { Col, Row } from 'antd'
import { useQuery } from '@tanstack/react-query'
import movieService from '../../api/entities/movie'
import { MoviesList } from '../../components/MoviesList'
import { PageLoader } from '../../components/PageLoader'
import { ERROR_MESSAGE } from '../../utils/consts/textConsts'

const MoviesPage = () => {
  //FIXME: вынести в отдельные хуки
  const { data, status } = useQuery({
    queryKey: ['movie'],
    queryFn: () => movieService.getMovie(),
  })

  console.log(data?.data)

  if (status === 'pending') {
    return <PageLoader />
  }
  //TODO: сделать отдельную страницу с ошибкой
  if (status === 'error') return <p>{ERROR_MESSAGE}</p>

  return (
    <>
      <Row>
        <Col span={24}>menu</Col>
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
