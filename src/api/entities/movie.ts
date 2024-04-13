import {
  MovieByIdResponse,
  MoviesResponse,
  PossibleValuesByFieldResponse,
} from '../types/movies'
import { api } from '../instance'

const movieService = {
  getMovie(requestConfig?: AxiosRequestConfig) {
    return api.get<MoviesResponse>('v1.4/movie', requestConfig?.config)
  },
  getMovieById({
    params,
    config,
  }: AxiosRequestConfig<{
    id: string
  }>) {
    return api.get<MovieByIdResponse>(`v1.4/movie/${params.id}`, config)
  },
  getMovieSearch(requestConfig?: AxiosRequestConfig) {
    return api.get<MoviesResponse>(`v1.4/movie/search`, requestConfig?.config)
  },
  getMoviePossibleValuesByField(requestConfig?: AxiosRequestConfig) {
    return api.get<PossibleValuesByFieldResponse>(
      `v1/movie/possible-values-by-field`,
      requestConfig?.config
    )
  },
}

export default movieService
