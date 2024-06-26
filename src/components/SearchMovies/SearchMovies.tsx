import { AutoComplete } from 'antd'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import movieService from '../../api/entities/movie'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../utils/hooks/useLocalStorage'
import {
  DEBOUNCE_DELAY,
  MAX_SEARCH_HISTORY_ELEMENTS,
} from '../../utils/consts/numberConsts'
import { useDebounce } from 'use-debounce'

interface SearchMoviesProps {
  className?: string
}

export const SearchMovies = ({ className }: SearchMoviesProps) => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue] = useDebounce(searchValue, DEBOUNCE_DELAY)

  const [searchHistory, setSearchHistory] = useLocalStorage<
    { value: number; label: string }[]
  >('searchHistory', [])

  const { data } = useQuery({
    queryKey: ['search', debouncedSearchValue],
    queryFn: ({ signal }) =>
      movieService.getMovieSearch({
        config: {
          params: {
            query: debouncedSearchValue,
          },
          signal,
        },
      }),
    enabled: !!debouncedSearchValue,
    select: (data) => data.data,
  })

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
      className={className}
      options={options}
    />
  )
}
