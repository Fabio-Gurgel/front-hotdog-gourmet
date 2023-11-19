<template>
    <div :class="{ 'is-active': isActive }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head vermelho" style="background-color: var(--cor-primaria);">
                <h1 class="modal-card-title" style="color: white;">Novo ingrediente:</h1>
                <button class="delete" aria-label="close" @click="fecharModal()"></button>
            </header>
            <section class="modal-card-body">
                <div class="inserir-dados">
                    <label>Nome:
                        <input type="text" placeholder="nome" v-model="nomeIngrediente" maxlength="20" />
                    </label>
                    <label>Preço:
                        <input type="text" placeholder="0.00" @input="formatarPrecoInput" v-model="precoIngrediente"
                            maxlength="5" />
                    </label>
                </div>
            </section>
            <footer class="modal-card-foot" style="display: flex; flex-direction: row-reverse;">
                <div style="width: 220px; display: flex; justify-content: space-between;">
                    <button style="width: 100px; background-color: white; color: black;"
                        @click="fecharModal()">Cancelar</button>
                    <button style="width: 100px;" @click="salvarIngrediente()">Salvar</button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>

import API_URL from '@/service/API_URL';

export default {

    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            nomeIngrediente: "",
            precoIngrediente: ""
        }
    },

    methods: {
        fecharModal() {
            this.nomeIngrediente = "";
            this.precoIngrediente = "";
            this.$emit('close');
        },

        async salvarIngrediente() {
            try {
                let ingrediente = {
                    nome: this.nomeIngrediente,
                    preco: this.precoIngrediente
                }

                await fetch(`${API_URL}/ingredientes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ingrediente)
                });

                this.$emit('request');
                this.fecharModal();
                
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


        formatarPrecoInput() {
            let valor = this.precoIngrediente;

            valor = valor.replace(/\D/g, '');

            valor = (valor / 100).toFixed(2);

            this.precoIngrediente = valor;
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

.inserir-dados {
    display: flex;
    flex-direction: row;
    gap: 40%;
}

label {
    font-weight: bold;
    display: flex;
    flex-direction: column;
}

input {
    width: 100px;
    padding: 3px;
    outline: none;
}
</style>