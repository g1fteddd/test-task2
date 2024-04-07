import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.kinopoisk.dev',
  headers: {
    'X-API-KEY': process.env.TOKEN,
  },
})

api.interceptors.request.use((config) => {
  for (const key in config.params) {
    if (!config.params[key]) {
      delete config.params[key]
    }
  }

  return config
})
