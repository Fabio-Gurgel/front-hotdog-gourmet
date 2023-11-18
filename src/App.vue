<template>
  <div>
    <RouterView/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

:root {
  --cor-de-fundo: #F4F4F4;
  --cor-primaria: #ce2828;
  --cor-secundaria: #af2525;
}

* {
  margin: 0px;
  padding: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  background-color: var(--cor-de-fundo);
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


</style>
