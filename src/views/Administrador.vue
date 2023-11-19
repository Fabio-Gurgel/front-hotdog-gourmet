<template>
    <div class="tela-de-admin p-6">
        <div class="titulo-admin">
            <h2>
                Área do administrador:
            </h2>
        </div>
        <div class="area-admin mt-5">
            <div class="column">
                <div class="column-header">
                    <h3>Ingredientes:</h3>
                    <h3 @click="abrirModal()">+ Novo ingrediente</h3>
                </div>

                <div class="lista-de-cards">
                    <div class="card salmao" v-for="ingrediente in this.ingredientes" :key="ingrediente.id">
                        <div class="icone-e-nome">
                            <fa icon="bacon" />
                            <h4> {{ ingrediente.nome }}</h4>
                        </div>
                        <div class="preco">
                            <span>{{ converterPreco(ingrediente.preco) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="column-header">
                    <h3>Lanches:</h3>
                    <h3 @click="abrirModal()">+ Novo lanche</h3>
                </div>

                <div class="lista-de-cards">
                    <div class="card vermelho" v-for="lanche in this.lanches" :key="lanche.id">
                        <div class="icone-e-nome">
                            <fa icon="hotdog" />
                            <h4> {{ lanche.nome }}</h4>
                        </div>
                        <p>{{ formatarListaIngredientes(lanche.ingredientes) }}</p>
                        <div class="preco">
                            <span>{{ converterPreco(lanche.preco) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="column-header">
                    <h3>Promoções:</h3>
                    <h3 @click="abrirModal()">+ Nova promoção</h3>
                </div>

                <div class="lista-de-cards">
                    <div class="card preto" v-for="promocao in this.promocoes" :key="promocao.id">
                        <div class="icone-e-nome">
                            <fa icon="comment-dollar" />
                            <h4> {{ promocao.nome }}</h4>
                        </div>
                        <p> {{ promocao.descricao }}</p>
                        <div class="preco">
                            <span>{{ converterPreco(promocao.preco) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalMontarSeuLanche :is-active="this.exibindoModal" @close="fecharModal()"/>
    </div>
</template>

<script>

import API_URL from '../service/API_URL.js';
import convertePreco from '../utils/convertePreco.js'
import formataListaIngredientes from '../utils/formataListaIngredientes.js'
import ModalMontarSeuLanche from '../components/ModalMontarSeuLanche.vue'

export default {
    components: {
        ModalMontarSeuLanche
    },

    data() {
        return {
            lanches: null,
            promocoes: null,
            ingredientes: null,
            exibindoModal: false
        };
    },

    methods: {
        async carregarLanches() {
            try {
                const response = await fetch(`${API_URL}/lanches`);
                const jsonData = await response.json();
                this.lanches = jsonData;
            } catch (error) {
                console.error('Erro ao obter dados do backend: ', error);
            }
        },

        async carregarPromocoes() {
            try {
                const response = await fetch(`${API_URL}/promocoes`);
                const jsonData = await response.json();
                this.promocoes = jsonData;
            } catch (error) {
                console.error('Erro ao obter dados do backend: ', error);
            }
        },

        async carregarIngredientes() {
            try {
                const response = await fetch(`${API_URL}/ingredientes`);
                const jsonData = await response.json();
                this.ingredientes = jsonData;
            } catch (error) {
                console.error('Erro ao obter dados do backend: ', error);
            }
        },

        converterPreco(preco) {
            return convertePreco(preco);
        },

        formatarListaIngredientes(ingredientes) {
            return formataListaIngredientes(ingredientes)
        },

        abrirModal() {
            this.exibindoModal = true
        },

        fecharModal() {
            this.exibindoModal = false
        }
    },

    created() {
        this.carregarLanches();
        this.carregarPromocoes();
        this.carregarIngredientes();
    }
}

</script>

<style scoped>

.tela-de-admin {
    height: 89vh;
}

.titulo-admin {
    border-radius: 8px;
    padding: 20px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.titulo-admin  > h2 {
    margin-bottom: 0px;
}

p {
    font-style: italic;
    cursor: default;
}

h2 {
    font-size: x-large;
    margin-bottom: 10px;
    font-weight: 500;
    font-family: 'Lobster', sans-serif;
    cursor: default;
    color: var(--cor-primaria);
}

h3 {
    font-size: larger;
    font-family: 'Lobster', sans-serif;
    color: var(--cor-primaria);
    margin-bottom: 15px;
}

h4 {
    font-size: large;
    font-family: 'Lobster', sans-serif;
}

.preco {
    display: flex;
    flex-direction: row-reverse;
    font-family: 'Lobster', sans-serif;
}


.area-admin {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.column-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.column {
    border-radius: 8px;
    padding: 30px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    height: 370px;
}

.lista-de-cards {
    max-height: 280px;
    overflow-y: auto;
    padding-right: 40px;
}

.card {
    padding: 15px;
    color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    margin-bottom: 10px;
}

.vermelho {
    background-color: var(--cor-primaria);
}

.salmao {
    background-color: rgb(221, 112, 112);
}

.preto {
    background-color: rgb(43, 43, 43);
}

.icone-e-nome {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}</style>