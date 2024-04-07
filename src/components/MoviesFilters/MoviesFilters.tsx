import styles from './MoviesFilters.module.scss'
import { Collapse, CollapseProps, Select } from 'antd'
import { useQuery } from '@tanstack/react-query'
import movieService from '../../api/entities/movie'

export const MoviesFilters = () => {
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
          className={styles.filterSelect}
          placeholder="Выберите страну"
          //TODO: добавить поиск по странам
          loading={isLoading}
          disabled={isLoading}
          allowClear
          options={data?.data.map((item) => ({
            value: item.slug,
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
