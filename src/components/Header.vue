<template>
    <header>
        <div class="logo-e-nome">
            <img class="logo" src="../assets/logo.png" alt="logo">
            <h1>HotDog Gourmet</h1>
        </div>

        SAIR

    </header>

</template>

<script>

</script>

<style scoped>

header {
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

</style>