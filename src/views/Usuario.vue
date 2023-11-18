<template>
    <div class="tela-de-usuario p-6">
        <div class="bem-vindo-container">
            <h2>
                Bem-vindo ao HotDog Gourmet de Teresópolis!
            </h2>
            <p>
                Descubra sabores extraordinários em cada mordida. Conheça nossos lanches exclusivos, preparados com
                ingredientes frescos e receitas secretas. Aproveite as promoções especiais que preparamos para você. No
                HotDog Gourmet, tradição e inovação se encontram para proporcionar uma experiência única. Estamos ansiosos
                para servir você!
            </p>
        </div>
        <div class="lanche-e-promocao mt-5">
            <div class="column">
                <h3>Nossos lanches:</h3>

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
            <div class="column">
                <h3>Nossas promoções:</h3>

                <div class="card preto">
                    <div class="icone-e-nome">
                        <fa icon="comment-dollar" />
                        <h4>Completo + Refri 300ml</h4>
                    </div>
                    <p>Lanche completo com salsicha ou linguiça com refrigerante de 300ml à escolha do cliente. </p>
                    <div class="preco">
                        <span>R$ 13,00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import API_URL from '../service/API_URL.js';
import convertePreco from '../utils/convertePreco.js'
import formataListaIngredientes from '../utils/formataListaIngredientes.js'

export default {
    data() {
        return {
            lanches: null,
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

        converterPreco(preco) {
           return convertePreco(preco);
        },

        formatarListaIngredientes(ingredientes) {
            return formataListaIngredientes(ingredientes)
        }
    },

    created() {
        this.carregarLanches();
    }
}

</script>

<style scoped>
.tela-de-usuario {
    height: 100vh;
}

.bem-vindo-container {
    border-radius: 8px;
    padding: 30px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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


.lanche-e-promocao {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.column {
    border-radius: 8px;
    padding: 30px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    height: 370px;
}

.card {
    padding: 15px;
    color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.vermelho {
    background-color: var(--cor-primaria);
}

.preto {
    background-color: rgb(43, 43, 43);
}

.lanche-card>h2 {
    font-size: larger;
    font-family: 'Lobster', sans-serif;
    cursor: default;
}

.icone-e-nome {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}
</style>