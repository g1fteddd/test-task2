import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.kinopoisk.dev',
  headers: {
    'X-API-KEY': process.env.TOKEN,
  },
})
