<template>
    <div :class="{ 'is-active': isActive }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head vermelho" style="background-color: var(--cor-primaria);">
                <h1 v-if="this.idLanche == null" class="modal-card-title" style="color: white;">Novo lanche:</h1>
                <h1 v-else class="modal-card-title" style="color: white;">Editar lanche:</h1>
                <button class="delete" aria-label="close" @click="fecharModal()"></button>
            </header>
            <section class="modal-card-body">

                <div class="inserir-dados">
                    <label>Nome:
                        <input type="text" placeholder="nome" v-model="nomelanche" maxlength="20" />
                    </label>
                </div>

                <h2>Selecione os ingredientes:</h2>
                <div class="lista-de-ingredientes">
                    <div class="adicionar-remover-ingredientes" v-for="ingrediente in this.ingredientes">
                        <div class="ingrediente-e-preco">
                            <h4>{{ ingrediente.nome }}</h4>
                            <span>{{ converterPreco(ingrediente.preco) }}</span>
                        </div>
                        <AdicionarRemover :idDoSpan="ingrediente.id"
                            @diminuirPreco="diminuirPreco(ingrediente.preco, ingrediente.id)"
                            @aumentarPreco="aumentarPreco(ingrediente.preco, ingrediente.id)" :fechou="this.fechouModal" />
                    </div>

                </div>
            </section>
            <footer class="modal-card-foot"
                style="display: flex; flex-direction: row-reverse; justify-content: space-between;">
                <div style="width: 220px; display: flex; justify-content: space-between;">
                    <button style="width: 100px; background-color: white; color: black;"
                        @click="fecharModal()">Cancelar</button>
                    <button style="width: 100px;" @click="salvarLanche()">Salvar</button>
                </div>
                <span class="preco">{{ converterPreco(this.precoTotal) }}</span>
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
        },
        idLanche: {
            type: Number,
            default: null
        }
    },

    data() {
        return {
            nomeLanche: "",
            ingredientes: null,
            LancheAntigo: {},
            precoTotal: 0.0,
            fechouModal: false,
            ingredientesNoLanche: []
        }
    },

    methods: {
        fecharModal() {
            this.precoTotal = 0.0;
            this.nomeLanche = "";
            this.$emit('close');
            this.fechouModal = !this.fechouModal;
        },

        async salvarLanche() {
            if (this.nomeLanche != "" && this.precoLanche != "") {

                if (this.LancheAntigo.nome == this.nomeLanche && this.LancheAntigo.preco == this.precoLanche) {
                    this.fecharModal();
                } else {


                    if (this.idLanche != null) {
                        try {
                            let lanche = {
                                nome: this.nomeLanche,
                                preco: this.precoLanche
                            }

                            const response = await fetch(`${API_URL}/Lanches/${this.idLanche}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(lanche)
                            });

                            if (!response.ok) {
                                const erro = await response.json();
                                throw new Error(erro.mensagem);
                            }

                            this.$emit('request');
                            window.alert("Lanche editado com sucesso!")
                            this.fecharModal();

                        } catch (error) {
                            window.alert(error.message)
                        }
                    } else {
                        try {
                            let lanche = {
                                nome: this.nomeLanche,
                                preco: this.precoLanche
                            }

                            const response = await fetch(`${API_URL}/Lanches`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(lanche)
                            });

                            if (!response.ok) {
                                const erro = await response.json();
                                throw new Error(erro.mensagem);
                            }

                            this.$emit('request');
                            window.alert("Lanche criado com sucesso!")
                            this.fecharModal();

                        } catch (error) {
                            window.alert(error.message)
                        }
                    }
                }
            } else {
                window.alert("Preencha todos os campos.")
            }
        },

        async carregarLanche() {
            try {
                const response = await fetch(`${API_URL}/lanches/${this.idLanche}`);
                const jsonData = await response.json();
                this.LancheAntigo = jsonData
                this.nomeLanche = jsonData.nome;
                this.precoLanche = jsonData.preco;
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
            let valor = this.precoLanche;

            valor = valor.replace(/\D/g, '');

            valor = (valor / 100).toFixed(2);

            this.precoLanche = valor;
        },

        converterPreco(preco) {
            return convertePreco(preco);
        },

        aumentarPreco(preco, id) {
            this.precoTotal += preco
            this.ingredientesNoLanche.push(id);
        },

        diminuirPreco(preco, id) {
            var elemento = document.getElementById(id);
            var quantidade = elemento.textContent
            this.precoTotal = preco * quantidade

            this.ingredientesNoLanche = []

            for (var i = 0; i < quantidade; i++) {
                this.ingredientesNoLanche.push(id);
            }
        }

    },

    created() {
        this.carregarIngredientes();
    },

    watch: {
        idLanche() {
            if (this.idLanche != null) {
                this.carregarLanche();
            }
        }
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

.lista-de-ingredientes {
    margin-top: 10px;
    gap: 20px;
    max-height: 200px;
    overflow-y: auto;
    padding-right: 10px;
}

.adicionar-remover-ingredientes {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.ingrediente-e-preco {
    display: flex;
    flex-direction: column;
}

.ingrediente-e-preco>span {
    color: var(--cor-terciaria);
    font-size: smaller;
}

.preco {
    font-size: x-large;
    font-family: 'Lobster', sans-serif;
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