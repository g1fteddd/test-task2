import { api } from '../instance'
import { ImagesResponse } from '../types/images'

const imageService = {
  getImage(requestConfig?: AxiosRequestConfig) {
    return api.get<ImagesResponse>('v1.4/image', requestConfig?.config)
  },
}

export default imageService
