// store/genre.js
import { defineStore } from 'pinia'; // Se estiver usando Pinia
import api from '@/plugins/axios';

export const useGenreStore = defineStore('genre', {
  state: () => ({
    generos: [],
    generoAtualId: null,
  }),
  actions: {
    async obterTodosGeneros(tipo) {
      try {
        const resposta = await api.get(`/genre/${tipo}/list`, {
          params: { language: 'pt-BR' },
        });
        this.generos = resposta.data.genres;
      } catch (erro) {
        console.error('Erro ao carregar gêneros:', erro);
      }
    },
    definirGeneroAtualId(id) {
      this.generoAtualId = id;
    },
    obterNomeGenero(id) {
      const genero = this.generos.find((g) => g.id === id);
      return genero ? genero.name : '';
    },
  },
});
