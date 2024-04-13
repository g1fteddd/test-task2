export interface Review {
  id: number
  movieId: number
  title: string
  type: string
  review: string
  date: string
  author: string
  userRating: number
  authorId: number
  updatedAt: string
  createdAt: string
}

export interface ReviewsResponse {
  docs: Review[]
  limit: number
  page: number
  pages: number
  total: number
}
