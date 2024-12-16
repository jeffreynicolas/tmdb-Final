<script setup>
import { ref, onMounted } from 'vue';
import { useGenreStore } from '@/stores/genre.js';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';

const series = ref([]);
const carregando = ref(false);
const categoriaSelecionada = ref(null);
const armazemGeneros = useGenreStore();
const router = useRouter();

onMounted(async () => {
    carregando.value = true;
    await armazemGeneros.obterTodosGeneros('tv'); // Carrega os gêneros
    carregando.value = false;
});

const listarSeries = async (generoId) => {
    if (!generoId) return;
    carregando.value = true;
    try {
        const resposta = await api.get('discover/tv', {
            params: {
                with_genres: generoId,
                language: 'pt-BR',
            },
        });
        series.value = resposta.data.results;
    } catch (erro) {
        console.error('Erro ao carregar séries:', erro);
    } finally {
        carregando.value = false;
    }
};

const formatarData = (data) => new Date(data).toLocaleDateString('pt-BR');


const abrirSerie = (serieId) => {
    router.push({ name: 'DetalhesSerie', params: { serieId } });
};
</script>

<template>
  <h1>Séries</h1>

  <!-- Exibe indicador de carregamento enquanto os gêneros estão sendo carregados -->
  <div v-if="carregando">Carregando categorias...</div>
  
  <select v-model="categoriaSelecionada" @change="listarSeries(categoriaSelecionada)" class="seletor-categoria">
    <option value="" disabled selected>Selecione uma categoria</option>
    <!-- Verifique se armazemGeneros.generos está preenchido -->
    <option v-for="genero in armazemGeneros.generos" :key="genero.id" :value="genero.id">
      {{ genero.name }}
    </option>
  </select>

  <!-- Exibe indicador de carregamento enquanto as séries estão sendo carregadas -->
  <loading v-if="carregando" is-full-page />

  <div class="lista-series">
    <div v-for="serie in series" :key="serie.id" class="cartao-serie">
      <img 
        :src="`https://image.tmdb.org/t/p/w500${serie.poster_path}`" 
        :alt="serie.original_name" 
        @click="abrirSerie(serie.id)" 
      />
      <div class="detalhes-serie">
        <p class="titulo-serie">{{ serie.original_name }}</p>
        <p class="data-lancamento">{{ formatarData(serie.first_air_date) }}</p>
        <p class="generos-serie">
          <span 
            v-for="genero_id in serie.genre_ids" 
            :key="genero_id" 
            @click="listarSeries(genero_id)"
            :class="{ ativo: genero_id === armazemGeneros.generoAtualId }"
          >
            {{ armazemGeneros.obterNomeGenero(genero_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Adicione estilos conforme necessário */
.seletor-categoria {
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.lista-series {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.cartao-serie {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}

.cartao-serie img {
  cursor: pointer;
  max-width: 100%;
}

.detalhes-serie {
  margin-top: 0.5rem;
}

.generos-serie {
  margin-top: 0.5rem;
}

.generos-serie .ativo {
  color: red;
  font-weight: bold;
}

</style>
