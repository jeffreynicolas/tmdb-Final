import { createRouter, createWebHistory } from 'vue-router';
import MoviesView from '@/views/MoviesView.vue'; // Ensure this path is correct
import MovieDetails from '@/views/MovieDetailsView.vue';
import TvDetails from '@/views/TvDetailsView.vue';  // New import for TV details

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: MoviesView,
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('@/views/TvView.vue'),
  },
  {
    path: '/movie/:movieId',
    name: 'MovieDetails',
    component: MovieDetails,
    props: true,
  },
    {
      path: '/tv/:serieId', // Rota que espera o parâmetro 'serieId'
      name: 'DetalhesSerie',
      component: TvDetails,
      props: true, // Passa o parâmetro 'serieId' como prop para o componente
    },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
