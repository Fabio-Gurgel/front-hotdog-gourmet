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
                    <h3 class="novo" @click="abrirModalIngrediente()">+ Novo ingrediente</h3>
                </div>

                <div class="lista-de-cards">
                    <div class="card salmao" v-for="ingrediente in this.ingredientes" :key="ingrediente.id">
                        <div class="icone-e-nome">
                            <fa icon="bacon" />
                            <h4> {{ ingrediente.nome }}</h4>
                        </div>
                        <div class="card-footer-">
                            <div class="editar-excluir">
                                <fa class="icone" icon="pen-to-square" @click="abrirModalIngrediente(ingrediente.id)" />
                                <fa class="icone" icon="trash"
                                    @click="temCertezaDeQueDesejaExcluirIngrediente(ingrediente.id)" />
                            </div>
                            <span>{{ converterPreco(ingrediente.preco) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="column-header">
                    <h3>Lanches:</h3>
                </div>

                <div class="lista-de-cards">
                    <div class="card vermelho" v-for="lanche in this.lanches" :key="lanche.id">
                        <div class="icone-e-nome">
                            <fa icon="hotdog" />
                            <h4> {{ lanche.nome }}</h4>
                        </div>
                        <p>{{ formatarListaIngredientes(lanche.ingredientes) }}</p>
                        <div class="card-footer-">
                            <div class="editar-excluir">
                            </div>
                            <span>{{ converterPreco(lanche.preco) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="column-header">
                    <h3>Promoções:</h3>
                    <h3 class="novo" @click="abrirModalPromocao()">+ Nova promoção</h3>
                </div>

                <div class="lista-de-cards">
                    <div class="card preto" v-for="promocao in this.promocoes" :key="promocao.id">
                        <div class="icone-e-nome">
                            <fa icon="comment-dollar" />
                            <h4> {{ promocao.nome }}</h4>
                        </div>
                        <p> {{ promocao.descricao }}</p>
                        <div class="card-footer-">
                            <div class="editar-excluir">
                                <fa class="icone" icon="pen-to-square" @click="abrirModalPromocao(promocao.id)"/>
                                <fa class="icone" icon="trash" @click="temCertezaDeQueDesejaExcluirPromocao(promocao.id)" />
                            </div>
                            <span>{{ converterPreco(promocao.preco) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalCriarEditarIngrediente :is-active="this.exibindoModalIngrediente" @close="fecharModal()"
            @request="carregarIngredientes()" :idIngrediente="this.idDoIngredienteQueSeraEditado" />

        <ModalCriarEditarPromocao :is-active="this.exibindoModalPromocao" @close="fecharModal()"
            @request="carregarPromocoes()" :idPromocao="this.idDaPromocaoQueSeraEditada" />
    </div>
</template>

<script>

import API_URL from '../service/API_URL.js';
import convertePreco from '../utils/convertePreco.js';
import formataListaIngredientes from '../utils/formataListaIngredientes.js';
import ModalCriarEditarIngrediente from '../components/ModalCriarEditarIngrediente.vue';
import ModalCriarEditarPromocao from '@/components/ModalCriarEditarPromocao.vue';

export default {
    components: {
        ModalCriarEditarIngrediente,
        ModalCriarEditarPromocao
    },

    data() {
        return {
            lanches: null,
            promocoes: null,
            ingredientes: null,
            exibindoModalIngrediente: false,
            exibindoModalPromocao: false,
            idDoIngredienteQueSeraEditado: null,
            idDaPromocaoQueSeraEditada: null
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

        temCertezaDeQueDesejaExcluirIngrediente(id) {
            const confirmacao = window.confirm('Tem certeza que deseja excluir este ingrediente?');

            if (confirmacao) {
                this.deletarIngrediente(id);
            }
        },

        async deletarIngrediente(id) {
            try {
                const response = await fetch(`${API_URL}/ingredientes/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                });

                if (!response.ok) {
                    const erro = await response.json();
                    throw new Error(erro.mensagem);
                }

                this.carregarIngredientes();
                window.alert("Ingrediente excluído com sucesso!");

            } catch (error) {
                window.alert("Não é possível excluir excluir um ingrediente presente em um lanche.");
            }
        },

        temCertezaDeQueDesejaExcluirPromocao(id) {
            const confirmacao = window.confirm('Tem certeza que deseja excluir esta promoção?');

            if (confirmacao) {
                this.deletarPromocao(id);
            }
        },

        async deletarPromocao(id) {
            try {
                const response = await fetch(`${API_URL}/promocoes/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                });

                if (!response.ok) {
                    const erro = await response.json();
                    throw new Error(erro.mensagem);
                }

                this.carregarPromocoes();
                window.alert("Promoção excluída com sucesso!");

            } catch (error) {
                window.alert(error.message);
            }
        },

        converterPreco(preco) {
            return convertePreco(preco);
        },

        formatarListaIngredientes(ingredientes) {
            return formataListaIngredientes(ingredientes)
        },

        abrirModalIngrediente(id) {
            this.idDoIngredienteQueSeraEditado = id
            this.exibindoModalIngrediente = true
        },

        abrirModalPromocao(id) {
            this.idDaPromocaoQueSeraEditada = id
            this.exibindoModalPromocao = true
        },

        fecharModal() {
            this.exibindoModalIngrediente = false
            this.idDoIngredienteQueSeraEditado = null
            this.exibindoModalPromocao = false
            this.idDaPromocaoQueSeraEditada = null
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

.titulo-admin>h2 {
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

.card-footer- {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Lobster', sans-serif;
}

.editar-excluir {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40px;
}

.icone {
    cursor: pointer;
}

.area-admin {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.novo {
    cursor: pointer;
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
}
</style>