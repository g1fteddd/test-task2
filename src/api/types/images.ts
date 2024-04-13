export interface Image {
  url: string
  createdAt: string
  height: number
  movieId: number
  previewUrl: string
  type: string
  updatedAt: string
  width: number
  id: string
}

export interface ImagesResponse {
  docs: Image[]
  limit: number
  page: number
  pages: number
  total: number
}
