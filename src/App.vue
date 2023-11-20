<template>
  <div>
    <HeaderComponent v-if="!$route.meta.esconderHeader" />
    <RouterView />
  </div>
</template>

<script>

import HeaderComponent from '../src/components/Header.vue'
import API_URL from './service/API_URL';

export default {
  name: 'App',
  components: {
    HeaderComponent
  },

  methods: {
    async inserirDadosNoBack() {
      this.inserirIngredientes();
      this.inserirLanches();
      this.inserirPromocoes();
    },

    async inserirIngredientes() {

      try {
        let ingrediente = {
          nome: "Pão",
          preco: 2.00
        }

        let response = await fetch(`${API_URL}/ingredientes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ingrediente)
        });

        ingrediente = {
          nome: "Batata palha",
          preco: 0.40
        }

        response = await fetch(`${API_URL}/ingredientes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ingrediente)
        });

        ingrediente = {
          nome: "Linguiça",
          preco: 3.00
        }

        response = await fetch(`${API_URL}/ingredientes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ingrediente)
        });

        ingrediente = {
          nome: "Salsicha",
          preco: 2.00
        }

        response = await fetch(`${API_URL}/ingredientes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ingrediente)
        });

        ingrediente = {
          nome: "Ovo de codorna",
          preco: 0.30
        }

        response = await fetch(`${API_URL}/ingredientes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ingrediente)
        });

        ingrediente = {
          nome: "Purê de batata",
          preco: 1.00
        }

        response = await fetch(`${API_URL}/ingredientes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ingrediente)
        });

        ingrediente = {
          nome: "Milho",
          preco: 0.20
        }

        response = await fetch(`${API_URL}/ingredientes`, {
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
      } catch (error) {
        console.log(error.message)
      }
    },

    async inserirLanches() {

      try {
        let lanche = {
          nome: "Completo com Linguiça",
          ingredientes: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 5 },
            { id: 6 },
            { id: 7 }
          ]
        }

        let response = await fetch(`${API_URL}/lanches`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(lanche)
        });

        lanche = {
          nome: "Completo com Salsicha",
          ingredientes: [
            { id: 1 },
            { id: 2 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 }
          ]
        }

        response = await fetch(`${API_URL}/lanches`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(lanche)
        });

        lanche = {
          nome: "Low carb completo",
          ingredientes: [
            { id: 4 },
            { id: 2 },
            { id: 3 },
            { id: 5 },
            { id: 6 },
            { id: 7 }
          ]
        }

        response = await fetch(`${API_URL}/lanches`, {
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
      } catch (error) {
        console.log(error.message)
      }
    },

    async inserirPromocoes() {

      try {
        let promocao = {
          nome: "Completo + refrigerante 300ml",
          descricao: "Cachorro quente completo(qualquer um dos dois) + acréscimo de R$ 3,00 referente ao refrigerante.",
          preco: 9.90,
          percentualDesconto: null,
          lanches: [
            { id: 1 },
            { id: 2 }
          ]
        }

        let response = await fetch(`${API_URL}/promocoes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(promocao)
        });

        promocao = {
          nome: "Completo + cerveja longneck",
          descricao: "Cachorro quente completo(qualquer um dos dois) + acréscimo de R$ 6,00 referente a cerveja.",
          preco: 12.90,
          percentualDesconto: null,
          lanches: [
            { id: 1 },
            { id: 2 }
          ]
        }

        response = await fetch(`${API_URL}/promocoes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(promocao)
        });

        promocao = {
          nome: "2 Completos",
          descricao: "Dois cachorros quentes completos com descontos de 10%",
          preco: null,
          percentualDesconto: 10,
          lanches: [
            { id: 1 },
            { id: 2 }
          ]
        }

        response = await fetch(`${API_URL}/promocoes`, {
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
      } catch (error) {
        console.log(error.message)
      }
    },

    async inserirLanches() {

      try {
        let lanche = {
          nome: "Completo com Linguiça",
          ingredientes: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 5 },
            { id: 6 },
            { id: 7 }
          ]
        }

        let response = await fetch(`${API_URL}/lanches`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(lanche)
        });

        lanche = {
          nome: "Completo com Salsicha",
          ingredientes: [
            { id: 1 },
            { id: 2 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 }
          ]
        }

        response = await fetch(`${API_URL}/lanches`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(lanche)
        });

        lanche = {
          nome: "Low carb completo",
          ingredientes: [
            { id: 4 },
            { id: 2 },
            { id: 3 },
            { id: 5 },
            { id: 6 },
            { id: 7 }
          ]
        }

        response = await fetch(`${API_URL}/lanches`, {
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
      } catch (error) {
        console.log(error.message)
      }
    }
  },

  created() {
    this.inserirDadosNoBack();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

:root {
  --cor-de-fundo: #fafafa;
  --cor-primaria: #c22d2d;
  --cor-secundaria: #af2525;
  --cor-terciaria: #b4b4b4;
}

* {
  margin: 0px;
  padding: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: url('./assets/background.png') repeat;
  background-size: 70px;
}

body {
  background-color: var(--cor-de-fundo);
}

h1 {
  color: white;
  font-size: larger;
  font-family: 'Lobster', sans-serif;
  cursor: default;
}

button {
  text-align: center;
  background-color: var(--cor-primaria);
  cursor: pointer;
  border-radius: 10px;
  min-height: 40px;
  color: white;
  font-weight: bold;
  border: none;
  padding: 5px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

button:hover {
  background-color: var(--cor-secundaria);
}

header {
  background-color: var(--cor-primaria);
}
</style>
