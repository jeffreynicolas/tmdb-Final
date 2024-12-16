<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia'; // Necessário para garantir reatividade
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre.js';
import { useRouter } from 'vue-router';

const filmes = ref([]);
const carregando = ref(false);
const categoriaSelecionada = ref(null);

// Utiliza storeToRefs para garantir reatividade
const armazemGeneros = useGenreStore();
const { generos } = storeToRefs(armazemGeneros);
const router = useRouter();

onMounted(async () => {
    carregando.value = true;
    try {
        await armazemGeneros.obterTodosGeneros('movie');
        console.log(generos.value)
        console.log('Gêneros carregados:', generos.value); // Log para debugging
    } catch (erro) {
        console.error('Erro ao carregar gêneros:', erro);
    } finally {
        carregando.value = false;
    }
});

const listarFilmes = async () => {
    if (!categoriaSelecionada.value) return;
    armazemGeneros.definirGeneroAtualId(categoriaSelecionada.value);
    carregando.value = true;
    try {
        const resposta = await api.get('discover/movie', {
            params: {
                with_genres: categoriaSelecionada.value,
                language: 'pt-BR',
            },
        });
        filmes.value = resposta.data.results;
    } catch (erro) {
        console.error('Erro ao listar filmes:', erro);
    } finally {
        carregando.value = false;
    }
};

const formatarData = (data) => new Date(data).toLocaleDateString('pt-BR');

const abrirFilme = (filmeId) => {
    router.push({ name: 'MovieDetails', params: { movieId: filmeId } });
};

</script>

<template>
    <h1>Filmes</h1>
    <select v-model="categoriaSelecionada" @change="listarFilmes" class="seletor-categoria">
        <option value="" disabled>Selecione uma categoria</option>
        <option v-for="genero in generos" :key="genero.id" :value="genero.id">
            {{ genero.name }}
        </option>
    </select>
    <loading v-model:active="carregando" is-full-page />
    <div class="lista-filmes">
        <div v-for="filme in filmes" :key="filme.id" class="cartao-filme">
            <img :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`" :alt="filme.original_title" @click="abrirFilme(filme.id)" />
            <div class="detalhes-filme">
                <p class="titulo-filme">{{ filme.original_title }}</p>
                <p class="data-lancamento">{{ formatarData(filme.release_date) }}</p>
                <p class="generos-filme">
                    <span v-for="genero_id in filme.genre_ids" :key="genero_id">
                        {{ armazemGeneros.obterNomeGenero(genero_id) }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.seletor-categoria {
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.lista-filmes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.cartao-filme {
    border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}

.titulo-filme {
    font-weight: bold;
}

.data-lancamento {
    color: gray;
}

.generos-filme {
    display: flex;
    flex-wrap: wrap;
}

.generos-filme .ativo {
    font-weight: bold;
    color: #f39c12; 
}


</style>
