<template>
    <div class="tela-de-login">
        <div class="login-container">
            <div>
                <img class="logo" src="../assets/logo.png" alt="logo">
            </div>
            Entrar como:

            <div class="botoes">
                <button class="botao-de-login" @click="redirecionarParaTelaDeUsuario()">
                    Usuário comum
                </button>
                <button class="botao-de-login" @click="redirecionarParaTelaDeAdmin()">
                    Administrador
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  methods: {
    redirecionarParaTelaDeUsuario() {
      this.$router.push('/usuario');
    },

    redirecionarParaTelaDeAdmin() {
      this.$router.push('/admin');
    }
  }
}

</script>

<style scoped>

.tela-de-login {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 450px;
    width: 400px;
    border-radius: 8px;
    padding: 10px;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    font-size: large;
}

.logo {
    height: 250px;
    width: 250px;
}

.botoes {
    margin-top: 40px;
    height: 90px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
}

.botao-de-login {
    width: 200px;
}

</style>