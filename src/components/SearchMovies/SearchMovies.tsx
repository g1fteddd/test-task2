import { AutoComplete } from 'antd'
import { useState } from 'react'
import styles from './SearchMovies.module.scss'
import { useQuery } from '@tanstack/react-query'
import movieService from '../../api/entities/movie'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../utils/hooks/useLocalStorage'
import { MAX_SEARCH_HISTORY_ELEMENTS } from '../../utils/consts/numberConsts'

export const SearchMovies = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [searchHistory, setSearchHistory] = useLocalStorage<
    { value: number; label: string }[]
  >('searchHistory', [])

  const { data } = useQuery({
    queryKey: ['search', searchValue],
    queryFn: () =>
      movieService.getMovieSearch({
        config: {
          params: {
            query: searchValue,
          },
        },
      }),
    enabled: !!searchValue,
    select: (data) => data.data,
  })

  console.log('data', data)
  console.log('searchValue', searchValue)

  const handleChange = (value: string) => {
    setSearchValue(value)
  }

  const handleSelect = (
    value: string,
    option: { value: number; label: string }
  ) => {
    setSearchHistory([...searchHistory, option])
    navigate(`film/${value}`)
  }

  const options = [
    ...searchHistory.toReversed().slice(0, MAX_SEARCH_HISTORY_ELEMENTS),
    ...(data?.docs.map((movie) => {
      return {
        value: movie.id,
        label: movie.name,
      }
    }) || []),
  ]

  return (
    <AutoComplete
      placeholder="Введите название фильма"
      value={searchValue}
      onSearch={handleChange}
      onSelect={handleSelect}
      showSearch
      className={styles.AutoComplete}
      options={options}
    />
  )
}