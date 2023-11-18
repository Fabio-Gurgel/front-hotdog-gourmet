<template>
    <header>
        <div class="logo-e-nome">
            <img class="logo" src="../assets/logo.png" alt="logo">
            <h1>HotDog Gourmet</h1>
        </div>

        <fa class="icone" icon="right-from-bracket" @click="redirecionarParaTelaDeLogin()"/>
    </header>

</template>

<script>

export default {
  methods: {
    redirecionarParaTelaDeLogin() {
      this.$router.push('/');
    }
  }
}

</script>

<style scoped>

header {
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 50px;
    padding-right: 50px;
}

.logo {
    height: 70px;
    width: 70px;
    cursor: pointer;
}

.logo-e-nome {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: x-large;
    gap: 10px;
}

.icone {
    height: 30px;
    width: 30px;
    cursor: pointer;
    color: white;
}  

</style>