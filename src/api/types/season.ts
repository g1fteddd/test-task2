export interface Episode {
  number: number
  name: string
  enName: string
  description: string
  still: {
    url: string
  }
  airDate: string
}

export interface Season {
  movieId: number
  number: number
  episodesCount: number
  episodes: Episode[]
  name: string
}

export interface SeasonsResponse {
  docs: Season[]
  limit: number
  page: number
  pages: number
  total: number
}
