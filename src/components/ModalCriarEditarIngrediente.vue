<template>
    <div :class="{ 'is-active': isActive }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head vermelho" style="background-color: var(--cor-primaria);">
                <h1 v-if="this.idIngrediente == null" class="modal-card-title" style="color: white;">Novo ingrediente:</h1>
                <h1 v-else class="modal-card-title" style="color: white;">Editar ingrediente:</h1>
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
        },
        idIngrediente: {
            type: Number,
            default: null
        }
    },

    data() {
        return {
            nomeIngrediente: "",
            precoIngrediente: "",
            ingredienteAntigo: {}
        }
    },

    methods: {
        fecharModal() {
            this.nomeIngrediente = "";
            this.precoIngrediente = "";
            this.$emit('close');
        },

        async salvarIngrediente() {
            if (this.nomeIngrediente != "" && this.precoIngrediente != "") {

                if (this.ingredienteAntigo.nome == this.nomeIngrediente && this.ingredienteAntigo.preco == this.precoIngrediente) {
                    this.fecharModal();
                } else {

                    
                    if (this.idIngrediente != null) {
                        try {
                            let ingrediente = {
                                nome: this.nomeIngrediente,
                                preco: this.precoIngrediente
                            }
                            
                            const response = await fetch(`${API_URL}/ingredientes/${this.idIngrediente}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(ingrediente)
                            });
                            
                            if (!response.ok) {
                            const erro = await response.json();
                            throw new Error(erro.mensagem);
                        }
                        
                        this.$emit('request');
                        window.alert("Ingrediente editado com sucesso!")
                        this.fecharModal();
                        
                    } catch (error) {
                        window.alert(error.message)
                    }
                } else {
                    try {
                        let ingrediente = {
                            nome: this.nomeIngrediente,
                            preco: this.precoIngrediente
                        }
                        
                        const response = await fetch(`${API_URL}/ingredientes`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(ingrediente)
                        });
                        
                        if (!response.ok) {
                            const erro = await response.json();
                            throw new Error(erro.mensagem);
                        }
                        
                        this.$emit('request');
                        window.alert("Ingrediente criado com sucesso!")
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

        async carregarIngrediente() {
            try {
                const response = await fetch(`${API_URL}/ingredientes/${this.idIngrediente}`);
                const jsonData = await response.json();
                this.ingredienteAntigo = jsonData
                this.nomeIngrediente = jsonData.nome;
                this.precoIngrediente = jsonData.preco;
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

    watch: {
        idIngrediente() {
            if (this.idIngrediente != null) {
                this.carregarIngrediente();
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