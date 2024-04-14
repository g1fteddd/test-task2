import styles from './MoviesFilters.module.scss'
import { Collapse, CollapseProps, Select } from 'antd'
import { useQuery } from '@tanstack/react-query'
import movieService from '../../api/entities/movie'
import { FilterMoviesKeys } from '../../pages/MoviesPage/MoviesPage'
import { genetateSegmentNumber } from '../../utils/lib/generateSegmentNumbers'
import { AGE_OPTIONS } from '../../utils/consts/otherConsts'

interface MoviesFiltersProps {
  filters: URLSearchParams
  onChangeFilter: (key: FilterMoviesKeys, value: string) => void
}

export const MoviesFilters = ({
  filters,
  onChangeFilter,
}: MoviesFiltersProps) => {
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

  const items: CollapseProps['items'] = [
    {
      key: FilterMoviesKeys.COUNTRIES,
      label: 'Страна',
      children: (
        <Select
          value={filters.get(FilterMoviesKeys.COUNTRIES) || null}
          onChange={(value) =>
            onChangeFilter(FilterMoviesKeys.COUNTRIES, value)
          }
          className={styles.filterSelect}
          placeholder="Выберите страну"
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
      key: FilterMoviesKeys.YEAR,
      label: 'Год производства',
      children: (
        <Select
          value={filters.get(FilterMoviesKeys.YEAR) || null}
          onChange={(value) => onChangeFilter(FilterMoviesKeys.YEAR, value)}
          className={styles.filterSelect}
          placeholder="Выберите год"
          allowClear
          options={genetateSegmentNumber(1900, 2040).map((year) => ({
            value: year,
            label: year,
          }))}
          showSearch
        />
      ),
    },
    {
      key: FilterMoviesKeys.AGE_RATING,
      label: 'Возрастной рейтинг',
      children: (
        <Select
          value={filters.get(FilterMoviesKeys.AGE_RATING) || null}
          onChange={(value) =>
            onChangeFilter(FilterMoviesKeys.AGE_RATING, value)
          }
          className={styles.filterSelect}
          placeholder="Выберите возраст"
          allowClear
          options={AGE_OPTIONS.map((age) => ({
            value: age,
            label: `${age}+`,
          }))}
        />
      ),
    },
  ]

  return <Collapse items={items} />
}
