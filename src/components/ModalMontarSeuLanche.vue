<template>
    <div :class="{ 'is-active': isActive }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head vermelho" style="background-color: var(--cor-primaria);">
                <h1 class="modal-card-title" style="color: white;">Monte seu próprio lanche</h1>
                <button class="delete" aria-label="close" @click="fecharModal()"></button>
            </header>
            <section class="modal-card-body">
                <p>
                    Aqui no HotDog Gourmet, você tem o poder de personalizar o seu próprio lanche!
                    Escolha os ingredientes à sua preferência e descubra o preço exato do seu delicioso
                    hot dog personalizado!
                </p>


                <h2>Selecione seus ingredientes:</h2>
                <div class="lista-de-ingredientes">
                    <div class="ingrediente" v-for="ingrediente in this.ingredientes">
                        <span>{{ ingrediente.nome }}</span>
                        <AdicionarRemover :idDoSpan="ingrediente.id" @diminuirPreco="diminuirPreco(ingrediente.preco)"
                            @aumentarPreco="aumentarPreco(ingrediente.preco)"/>
                    </div>

                </div>
            </section>
            <footer class="modal-card-foot" style="display: flex; flex-direction: row; justify-content: space-between;">
                <span class="preco">{{ converterPreco(this.precoTotal) }}</span>
                <button style="width: 100px;" @click="fecharModal()">Concluir</button>
            </footer>
        </div>
    </div>
</template>

<script>

import API_URL from '@/service/API_URL';
import convertePreco from '../utils/convertePreco.js'
import AdicionarRemover from '@/components/AdicionarRemover.vue';

export default {

    components: {
        AdicionarRemover
    },

    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            ingredientes: null,
            precoTotal: 0.00
        }
    },

    methods: {
        fecharModal() {
            this.precoTotal = 0.0
            this.$emit('close');
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

        aumentarPreco(preco) {
            this.precoTotal += preco
        },

        diminuirPreco(preco) {
            this.precoTotal -= preco
        }

    },

    created() {
        this.carregarIngredientes();
    }
}
</script>

<style scoped>
p,
span {
    font-style: italic;
    cursor: default;
}

h2 {
    font-size: large;
    margin-top: 10px;
    font-weight: 500;
    font-family: 'Lobster', sans-serif;
    cursor: default;
}

.lista-de-ingredientes {
    margin-top: 10px;
    gap: 20px;
    max-height: 200px;
    overflow-y: auto;
    padding-right: 10px;
}

.ingrediente {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.preco {
    font-size: x-large;
    font-family: 'Lobster', sans-serif;
}
</style>