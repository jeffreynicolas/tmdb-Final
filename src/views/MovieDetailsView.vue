<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/plugins/axios';

const filme = ref(null);
const carregando = ref(false);
const erro = ref(null);
const route = useRoute(); // Acessa os parâmetros da rota

onMounted(async () => {
    const filmeId = route.params.movieId;  // Corrigido para usar movieId
    carregando.value = true;
    erro.value = null;  // Reseta o erro em cada nova requisição

    try {
        const resposta = await api.get(`movie/${filmeId}`, {
            params: { language: 'pt-BR' },
        });
        filme.value = resposta.data;
        console.log('Detalhes do filme:', filme.value); // Debugging
    } catch (erroApi) {
        erro.value = 'Erro ao carregar os detalhes do filme. Tente novamente mais tarde.';
        console.error('Erro ao carregar detalhes do filme:', erroApi);
    } finally {
        carregando.value = false;
    }
});
</script>

<template>
    <div v-if="carregando">Carregando...</div>
    <div v-else-if="erro">{{ erro }}</div>
    <div v-else>
        <h1>{{ filme?.title }}</h1>
        <img :src="`https://image.tmdb.org/t/p/w500${filme?.poster_path}`" :alt="filme?.title" />
        <p>{{ filme?.overview }}</p>
        <p>Data de lançamento: {{ filme?.release_date }}</p>
        <p>Nota: {{ filme?.vote_average }}</p>
        <!-- Outras informações conforme necessário -->
    </div>
</template>
