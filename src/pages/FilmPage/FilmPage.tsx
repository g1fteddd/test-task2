import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import movieService from '../../api/entities/movie'
import {
  Button,
  Carousel,
  Col,
  Flex,
  Image,
  Row,
  Tabs,
  TabsProps,
  Tag,
} from 'antd'
import { ERROR_MESSAGE } from '../../utils/consts/textConsts'
import { Actors } from '../../components/Actors'
import { Reviews } from '../../components/Reviews'
import { SeasonsAndEpisodes } from '../../components/SeasonsAndEpisodes'
import imageService from '../../api/entities/image'
import styles from './FilmPage.module.scss'

enum TabsMenu {
  ACTORS = 'actors',
  REVIEWS = 'reviews',
  SEASONS_AND_EPISODES = 'seasons_and_episodes',
  POSTERS = 'posters',
}

const FilmPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, status } = useQuery({
    queryKey: ['movieById', id],
    // Думаю здесь уместно использовать каст. Enabled гарантирует то, что id будет не undefined
    queryFn: ({ signal }) =>
      movieService.getMovieById({
        params: { id: id as string },
        config: {
          signal,
        },
      }),
    enabled: !!id,
    select: (data) => data.data,
  })

  const { data: imagesData, status: imagesStatus } = useQuery({
    queryKey: ['images', id],
    queryFn: () =>
      imageService.getImage({
        config: {
          params: {
            movieId: id,
          },
        },
      }),
    enabled: !!id,
    select: (data) => data.data,
  })

  const handleClick = () => {
    navigate(-1)
  }

  if (status === 'pending' || imagesStatus === 'pending') {
    return null
  }

  if (status === 'error' || imagesStatus === 'error')
    return <p>{ERROR_MESSAGE}</p>

  if (!id) return null

  const items: TabsProps['items'] = [
    {
      key: TabsMenu.ACTORS,
      label: 'Актёры',
      children: <Actors actors={data.persons} />,
    },
    {
      key: TabsMenu.REVIEWS,
      label: 'Отзывы',
      children: <Reviews movieId={parseInt(id, 10)} />,
    },
    {
      key: TabsMenu.SEASONS_AND_EPISODES,
      label: 'Сезоны и серии',
      children: <SeasonsAndEpisodes movieId={parseInt(id, 10)} />,
      disabled: !data.isSeries,
    },
  ]

  return (
    <>
      <Row gutter={16}>
        <Col span={18}>
          <Flex vertical gap="middle">
            <Button
              type="primary"
              className={styles.backBtn}
              onClick={handleClick}
            >
              Назад
            </Button>
            <h1>{data.name}</h1>
            <div>
              Рейтинг: <Tag>{data.rating.kp}</Tag>
            </div>
            <p>
              {!!data.description ? data.description : data.shortDescription}
            </p>
            <h3>Похожие фильмы:</h3>
            <Carousel
              dotPosition="top"
              autoplaySpeed={1000}
              autoplay
              className={styles.carousel}
            >
              {data.similarMovies.map((movie) => (
                <Link key={movie.id} to={{ pathname: `/film/${movie.id}` }}>
                  <Image src={movie.poster.url} preview={false} />
                </Link>
              ))}
            </Carousel>
            <h3>Постеры</h3>
            <Carousel
              autoplay
              dotPosition="top"
              autoplaySpeed={1000}
              className={styles.carousel}
            >
              {imagesData.docs.map((image) => (
                <Image key={image.id} src={image.url} />
              ))}
            </Carousel>
          </Flex>
        </Col>
      </Row>

      <Tabs defaultActiveKey={TabsMenu.ACTORS} items={items} />
    </>
  )
}

export default FilmPage
