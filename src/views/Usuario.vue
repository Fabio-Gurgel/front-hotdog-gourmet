<template>
    <div class="tela-de-usuario p-6">
        <div class="bem-vindo-container">
            <h2>
                Bem-vindo ao HotDog Gourmet de Teresópolis!
            </h2>
            <p>
                Descubra sabores extraordinários em cada mordida. Conheça nossos lanches exclusivos, preparados com ingredientes frescos e receitas secretas. Aproveite as promoções especiais que preparamos para você. No HotDog Gourmet, tradição e inovação se encontram para proporcionar uma experiência única. Estamos ansiosos para servir você!
            </p>
        </div>
        <div class="lanche-e-promocao mt-5">
            <div class="column">
                Nossos lanches:
            </div>
            <div class="column">
                Nossas promoções:
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>

.tela-de-usuario {
    height: 100vh;
}

.bem-vindo-container {
    border-radius: 8px;
    padding: 30px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.bem-vindo-container > h2 {
    font-size: x-large;
    text-decoration: underline;
    text-decoration-color: var(--cor-primaria);
    margin-bottom: 10px;
    font-weight: 500;
}

.bem-vindo-container > p {
    font-style: italic;
}

.lanche-e-promocao {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.column {
    border-radius: 8px;
    padding: 30px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    height: 370px;
}

</style>