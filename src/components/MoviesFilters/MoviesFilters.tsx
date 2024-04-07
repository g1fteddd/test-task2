import styles from './MoviesFilters.module.scss'
import { Collapse, CollapseProps, Select } from 'antd'
import { useQuery } from '@tanstack/react-query'
import movieService from '../../api/entities/movie'
import { FC } from 'react'
import {
  FilterMovies,
  FilterMoviesKeys,
} from '../../pages/MoviesPage/MoviesPage'

interface MoviesFiltersProps {
  filters: FilterMovies
  onChangeFilter: (key: FilterMoviesKeys, value: string) => void
}

// TODO: подумать как разместить все типы по файлам
export const MoviesFilters: FC<MoviesFiltersProps> = ({
  filters,
  onChangeFilter,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: () =>
      movieService.getMoviePossibleValuesByField({
        config: {
          params: {
            field: 'countries.name',
          },
        },
      }),
  })

  console.log(data)

  const items: CollapseProps['items'] = [
    {
      //FIXME: исправить key
      key: '1',
      label: 'Страна',
      children: (
        <Select
          value={filters[FilterMoviesKeys.COUNTRIES]}
          onChange={(value) =>
            onChangeFilter(FilterMoviesKeys.COUNTRIES, value)
          }
          className={styles.filterSelect}
          placeholder="Выберите страну"
          //TODO: добавить поиск по странам
          loading={isLoading}
          disabled={isLoading}
          allowClear
          options={data?.data.map((item) => ({
            value: item.name,
            label: item.name,
          }))}
        />
      ),
    },
    {
      key: '2',
      label: 'Год производства',
      children: <Select />,
    },
    {
      key: '3',
      label: 'Возрастной рейтинг',
      children: <Select />,
    },
  ]

  return <Collapse items={items} />
}
