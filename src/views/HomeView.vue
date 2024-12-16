<script setup>
import { ref } from 'vue';
import MoviesView from '@/views/MoviesView.vue';
import TvView from '@/views/TvView.vue';

const tipoSelecionado = ref('filmes'); 
const categoriaSelecionada = ref(null); 

const alterarTipo = (tipo) => {
    tipoSelecionado.value = tipo;
};
</script>

<template>
    <div>
        <h1>Início</h1>
        <div class="menu-filtro">
            <button @click="alterarTipo('filmes')">Filmes</button>
            <button @click="alterarTipo('tv')">Séries</button>
        </div>

        <div v-if="tipoSelecionado === 'filmes'">
            <MoviesView :categoriaSelecionada="categoriaSelecionada" />
        </div>
        <div v-else>
            <TvView :categoriaSelecionada="categoriaSelecionada" />
        </div>
    </div>
</template>

<style scoped>
.menu-filtro {
    margin-bottom: 1rem;
}

.menu-filtro button {
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.menu-filtro button:hover {
    background-color: #f39c12; 
}
</style>