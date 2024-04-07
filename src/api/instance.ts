import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.kinopoisk.dev/v1.4',
  headers: {
    'X-API-KEY': process.env.TOKEN,
  },
})
