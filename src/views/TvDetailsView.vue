<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/plugins/axios';

const serieId = ref(null);
const serie = ref(null);
const carregando = ref(false);

const route = useRoute(); // Acessa os parâmetros da rota

onMounted(async () => {
    serieId.value = route.params.serieId; // Obtém o 'serieId' da URL
    carregando.value = true;
    try {
        const resposta = await api.get(`tv/${serieId.value}`, { 
            params: { language: 'pt-BR' } 
        });
        serie.value = resposta.data;
    } catch (erro) {
        console.error('Erro ao carregar detalhes da série:', erro);
    } finally {
        carregando.value = false;
    }
});
</script>

<template>
  <div v-if="carregando">Carregando...</div>
  <div v-else>
    <h1>{{ serie?.name }}</h1>
    <img :src="`https://image.tmdb.org/t/p/w500${serie?.poster_path}`" :alt="serie?.name" />
    <p>{{ serie?.overview }}</p>
    <p>Data de lançamento: {{ serie?.first_air_date }}</p>
    <p>Nota: {{ serie?.vote_average }}</p>
  </div>
</template>
