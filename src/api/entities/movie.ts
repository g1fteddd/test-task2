import { MoviesResponse } from '../../types/movies'
import { api } from '../instance'

const movieService = {
  getMovie(requestConfig?: AxiosRequestConfig) {
    return api.get<MoviesResponse>('/movie', requestConfig?.config)
  },

  getMovieById({
    params,
    config,
  }: AxiosRequestConfig<{
    id: string
  }>) {
    return api.get(`/movie/${params.id}`, config)
  },

  getMovieSearch(requestConfig?: AxiosRequestConfig) {
    return api.get(`/movie/search`, requestConfig?.config)
  },
}

export default movieService
