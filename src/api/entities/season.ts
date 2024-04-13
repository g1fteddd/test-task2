import { api } from '../instance'
import { SeasonsResponse } from '../types/season'

const seasonService = {
  getSeason(requestConfig?: AxiosRequestConfig) {
    return api.get<SeasonsResponse>('v1.4/season', requestConfig?.config)
  },
}

export default seasonService
