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
                    <label>Preço:
                        <input type="text" placeholder="0.00" @input="formatarPrecoInput" v-model="precoPromocao"
                            maxlength="5" />
                    </label>
                    <label>Percentual de desconto:
                        <input type="number" placeholder="0" v-model="descontoPromocao" @input="validarDesconto()" />
                    </label>
                </div>

                <label>Descrição:
                    <textarea v-model="descricaoPromocao">

                    </textarea>
                </label>
                <h2>Selecione os lanches:</h2>
                <div class="lista-de-ingredientes">
                    <div class="adicionar-remover-ingredientes" v-for="lanche in this.lanches">
                        <div class="ingrediente-e-preco">
                            <h4>{{ lanche.nome }}</h4>
                            <span>{{ converterPreco(lanche.preco) }}</span>
                        </div>
                        <AdicionarRemover :idDoSpan="lanche.id" :numeroMaximo="1" @diminuirPreco="diminuirPreco(lanche.id)"
                            @aumentarPreco="aumentarPreco(lanche.id)" :fechou="this.fechouModal" />
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
            precoPromocao: null,
            descontoPromocao: null,
            descricaoPromocao: "",
            ingredientes: null,
            promocaoAntiga: {},
            precoTotal: 0.0,
            fechouModal: false,
            lanchesNaPromocao: [],
        }
    },

    methods: {
        fecharModal() {
            this.nomePromocao = "";
            this.precoPromocao = null;
            this.descontoPromocao = null;
            this.descricaoPromocao = "";
            this.lanchesNaPromocao = [];
            this.$emit('close');
            this.fechouModal = !this.fechouModal;
        },

        async salvarPromocao() {

            if (this.promocaoAntiga.nome == this.nomePromocao &&
                this.promocaoAntiga.preco == this.precoPromocao &&
                this.promocaoAntiga.percentualDesconto == this.descontoPromocao &&
                this.promocaoAntiga.lanches == this.lanchesNaPromocao) {
                this.fecharModal();
            } else {

                if (this.idPromocao != null) {
                    try {
                        let promocao = {
                            nome: this.nomePromocao,
                            descricao: this.descricaoPromocao,
                            preco: this.precoPromocao,
                            percentualDesconto: this.descontoPromocao,
                            lanches: this.lanchesNaPromocao.map(lancheId => ({ id: lancheId }))
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
                            descricao: this.descricaoPromocao,
                            preco: this.precoPromocao,
                            percentualDesconto: this.descontoPromocao,
                            lanches: this.lanchesNaPromocao.map(lancheId => ({ id: lancheId }))
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
                this.descricaoPromocao = jsonData.descricao;
                this.descontoPromocao = jsonData.percentualDesconto;
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

        validarDesconto() {
            if (this.descontoPromocao < 0) {
                this.descontoPromocao = 0;
            } else if (this.descontoPromocao > 100) {
                this.descontoPromocao = 100;
            }
        },

        converterPreco(preco) {
            return convertePreco(preco);
        },

        aumentarPreco(id) {
            this.lanchesNaPromocao.push(id)
        },

        diminuirPreco(id) {
            for (var idDeLanche of this.lanchesNaPromocao) {
                if (idDeLanche == id) {
                    var index = this.lanchesNaPromocao.indexOf(idDeLanche);
                    this.lanchesNaPromocao.splice(index, 1)
                }
            }
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

textarea {
    resize: none;
    outline: none;
    height: 70px;
    padding: 5px;
}

.inserir-dados {
    display: flex;
    flex-direction: row;
    gap: 15%;
    margin-bottom: 10px;
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