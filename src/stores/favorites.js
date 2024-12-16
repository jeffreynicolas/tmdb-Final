import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    movies: [],
  }),
  actions: {
    toggleFavorite(movie) {
      const exists = this.movies.find((m) => m.id === movie.id)
      if (exists) {
        this.movies = this.movies.filter((m) => m.id !== movie.id)
      } else {
        this.movies.push(movie)
      }
    },
    isFavorite(movieId) {
      return this.movies.some((movie) => movie.id === movieId)
    },
  },
})
