import { ReviewsResponse } from '../types/review'
import { api } from '../instance'

const reviewService = {
  getReview(requestConfig?: AxiosRequestConfig) {
    return api.get<ReviewsResponse>('v1.4/review', requestConfig?.config)
  },
}

export default reviewService
