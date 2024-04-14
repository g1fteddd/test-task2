import { Card, Tag } from 'antd'
import { Movie } from '../../api/types/movies'
import { FC } from 'react'
import styles from './MoviesList.module.scss'
import { Link } from 'react-router-dom'
import { POSTER_EMPTY_URL } from '../../utils/consts/textConsts'
import classNames from 'classnames'

const { Meta } = Card

interface MoviesListProps {
  className?: string
  movies: Movie[]
}

export const MoviesList: FC<MoviesListProps> = ({ movies, className }) => {
  return (
    <div className={classNames(styles.MoviesList, className)}>
      {movies.map((movie) => (
        <Link key={movie.id} to={{ pathname: `/film/${movie.id}` }}>
          <Card
            hoverable
            className={styles.card}
            cover={
              <img
                alt={`Постер фильма '${movie.name}'`}
                src={movie.poster?.url || POSTER_EMPTY_URL}
              />
            }
          >
            <Meta
              title={movie.name || movie.alternativeName}
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
                  {!!movie.ageRating && (
                    <div>
                      Возраст: <Tag>{movie.ageRating}+</Tag>
                    </div>
                  )}
                </div>
              }
            />
          </Card>
        </Link>
      ))}
    </div>
  )
}
