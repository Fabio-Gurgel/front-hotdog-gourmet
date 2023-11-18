<template>
  <div>
    <HeaderComponent v-if="!$route.meta.esconderHeader"/>
    <RouterView/>
  </div>
</template>

<script>

import HeaderComponent from '../src/components/Header.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

:root {
  --cor-de-fundo: #fafafa;
  --cor-primaria: #c22d2d;
  --cor-secundaria: #af2525;
  --cor-terciaria: #c9c9c9;
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
  background-color: var(--cor-primaria);
  cursor: pointer;
  border-radius: 10px;
  min-height: 40px;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

button:hover {
  background-color: var(--cor-secundaria);
}

header {
  background-color: var(--cor-primaria);
}

</style>
