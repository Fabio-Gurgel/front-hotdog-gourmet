<template>
    <div :class="{ 'is-active': isActive }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head vermelho" style="background-color: var(--cor-primaria);">
                <h1 v-if="this.idPromocao == null" class="modal-card-title" style="color: white;">Nova promoção:</h1>
                <h1 v-else class="modal-card-title" style="color: white;">Editar promoção:</h1>
                <button class="delete" aria-label="close" @click="fecharModal()"></button>
            </header>
            <section class="modal-card-body">

                <div class="inserir-dados">
                    <label>Nome:
                        <input type="text" placeholder="nome" v-model="nomePromocao" maxlength="20" />
                    </label>
                </div>

                <h2>Selecione os lanches:</h2>
                <div class="lista-de-ingredientes">
                    <div class="adicionar-remover-ingredientes" v-for="lanche in this.lanches">
                        <div class="ingrediente-e-preco">
                            <h4>{{ lanche.nome }}</h4>
                            <span>{{ converterPreco(lanche.preco) }}</span>
                        </div>
                        <AdicionarRemover :idDoSpan="lanche.id"
                            @diminuirPreco="diminuirPreco(lanche.preco, lanche.id)"
                            @aumentarPreco="aumentarPreco(lanche.preco, lanche.id)" :fechou="this.fechouModal" />
                    </div>

                </div>
            </section>
            <footer class="modal-card-foot"
                style="display: flex; flex-direction: row-reverse; justify-content: space-between;">
                <div style="width: 220px; display: flex; justify-content: space-between;">
                    <button style="width: 100px; background-color: white; color: black;"
                        @click="fecharModal()">Cancelar</button>
                    <button style="width: 100px;" @click="salvarPromocao()">Salvar</button>
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
        idPromocao: {
            type: Number,
            default: null
        }
    },

    data() {
        return {
            nomePromocao: "",
            ingredientes: null,
            promocaoAntiga: {},
            precoTotal: 0.0,
            fechouModal: false,
            lanchesNaPromocao: []
        }
    },

    methods: {
        fecharModal() {
            this.precoTotal = 0.0;
            this.nomePromocao = "";
            this.$emit('close');
            this.fechouModal = !this.fechouModal;
        },

        async salvarPromocao() {


                if (this.promocaoAntiga.nome == this.nomePromocao && this.promocaoAntiga.preco == this.precoPromocao) {
                    this.fecharModal();
                } else {


                    if (this.idPromocao != null) {
                        try {
                            let promocao = {
                                nome: this.nomePromocao,
                                preco: this.precoPromocao
                            }

                            const response = await fetch(`${API_URL}/promocoes/${this.idPromocao}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(promocao)
                            });

                            if (!response.ok) {
                                const erro = await response.json();
                                throw new Error(erro.mensagem);
                            }

                            this.$emit('request');
                            window.alert("Promoção editada com sucesso!")
                            this.fecharModal();

                        } catch (error) {
                            window.alert(error.message)
                        }
                    } else {
                        try {
                            let promocao = {
                                nome: this.nomePromocao,
                                preco: this.precoPromocao
                            }

                            const response = await fetch(`${API_URL}/promocoes`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(promocao)
                            });

                            if (!response.ok) {
                                const erro = await response.json();
                                throw new Error(erro.mensagem);
                            }

                            this.$emit('request');
                            window.alert("Promoção criada com sucesso!")
                            this.fecharModal();

                        } catch (error) {
                            window.alert(error.message)
                        }
                    }
                }
        },

        async carregarPromocao() {
            try {
                const response = await fetch(`${API_URL}/promocoes/${this.idPromocao}`);
                const jsonData = await response.json();
                this.promocaoAntiga = jsonData
                this.nomePromocao = jsonData.nome;
                this.precoPromocao = jsonData.preco;
            } catch (error) {
                console.error('Erro ao obter dados do backend: ', error);
            }
        },

        async carregarLanches() {
            try {
                const response = await fetch(`${API_URL}/lanches`);
                const jsonData = await response.json();
                this.lanches = jsonData;
            } catch (error) {
                console.error('Erro ao obter dados do backend: ', error);
            }
        },


        formatarPrecoInput() {
            let valor = this.precoPromocao;

            valor = valor.replace(/\D/g, '');

            valor = (valor / 100).toFixed(2);

            this.precoPromocao = valor;
        },

        converterPreco(preco) {
            return convertePreco(preco);
        },

        aumentarPreco(preco, id) {
            this.precoTotal += preco
        },

        diminuirPreco(preco, id) {

        }

    },

    created() {
        this.carregarLanches();
    },

    watch: {
        idPromocao() {
            if (this.idPromocao != null) {
                this.carregarPromocao();
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