export interface Poster {
  url: string
}

export interface Сountry {
  name: string
}

export interface Movie {
  id: number
  name: string
  poster: Poster
  countries: Сountry[]
  year: number
  ageRating: number
}

export interface MoviesResponse {
  docs: Movie[]
  limit: number
  page: number
  pages: number
  total: number
}

export type PossibleValuesByFieldResponse = {
  name: string | number
  slug: string
}[]
