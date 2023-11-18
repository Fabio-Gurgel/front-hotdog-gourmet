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
                <h3>Nossos lanches:</h3>

                <div class="lanche-card">
                    <div class="icone-e-nome">
                        <fa icon="hotdog"/>
                        <h4>Completo</h4>
                    </div>
                    <p>Pão, molho, salsicha, batata-palha e milho. </p>
                    <div class="preco">
                        <span>R$ 10,00</span>
                    </div>
                </div>
            </div>
            <div class="column">
                <h3>Nossas promoções:</h3>
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

.preco {
    display: flex;
    flex-direction: row-reverse;
    font-family: 'Lobster', sans-serif;
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

.lanche-card {
    background-color: var(--cor-primaria);
    padding: 15px;
    color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.lanche-card > h2{
    font-size: larger;
    font-family: 'Lobster', sans-serif;
    cursor: default;
}

.icone-e-nome {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}

</style>