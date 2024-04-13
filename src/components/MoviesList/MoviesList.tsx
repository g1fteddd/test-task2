import { Card, Flex, Tag } from 'antd'
import { Movie } from '../../api/types/movies'
import { FC } from 'react'
import styles from './MoviesList.module.scss'

const { Meta } = Card

interface MoviesListProps {
  movies: Movie[]
}
//FIXME: обработать моменты, когда нету постера, названия, стран и тд
export const MoviesList: FC<MoviesListProps> = ({ movies }) => {
  return (
    <Flex wrap="wrap" gap="small">
      {movies.map((movie) => (
        <Card
          key={movie.id}
          hoverable
          className={styles.card}
          cover={
            <img
              alt={`Постер фильма '${movie.name}'`}
              src={movie.poster?.url}
            />
          }
        >
          <Meta
            title={movie.name}
            description={
              <div>
                <div>
                  Страна:{' '}
                  {movie.countries.map((country) => (
                    <Tag key={country.name} color="purple">
                      {country.name}
                    </Tag>
                  ))}
                </div>
                <div>
                  Год производства: <Tag color="purple">{movie.year}</Tag>
                </div>
                <div>
                  Возраст: <Tag>{movie.ageRating}+</Tag>
                </div>
              </div>
            }
          />
        </Card>
      ))}
    </Flex>
  )
}
