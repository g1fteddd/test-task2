export interface Poster {
  url: string
}

export interface Сountry {
  name: string
}

export interface Rating {
  kp: number
}

export interface Person {
  id: number
  name: string
  photo: string
  profession: string
  description: string
  enProfession: string
}

export interface SimularMovie {
  id: number
  name: string
  poster: Poster
  type: string
}

export interface Movie {
  id: number
  name: string
  poster: Poster
  countries: Сountry[]
  year: number
  ageRating: number
  rating: Rating
  description: string
  shortDescription: string
  persons: Person[]
  isSeries: boolean
  similarMovies: SimularMovie[]
}

export interface MoviesResponse {
  docs: Movie[]
  limit: number
  page: number
  pages: number
  total: number
}

export interface MovieByIdResponse extends Movie {}

export type PossibleValuesByFieldResponse = {
  name: string | number
  slug: string
}[]
