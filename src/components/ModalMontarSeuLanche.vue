<template>
    <div :class="{ 'is-active': isActive }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head vermelho" style="background-color: var(--cor-primaria);">
                <h1 class="modal-card-title" style="color: white;">Monte seu próprio lanche</h1>
                <button class="delete" aria-label="close" @click="fecharModal()"></button>
            </header>
            <section class="modal-card-body">
                <p>
                    Aqui no HotDog Gourmet, você tem o poder de personalizar o seu próprio lanche! 
                    Escolha os ingredientes à sua preferência e descubra o preço exato do seu delicioso 
                    hot dog personalizado!
                </p>
            </section>
            <footer class="modal-card-foot" style="display: flex; flex-direction: row-reverse;">
                <button style="width: 100px;" @click="fecharModal()">Concluir</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        fecharModal() {
            this.$emit('close');
        },
    }
}
</script>

<style scoped>

p {
    font-style: italic;
    cursor: default;
}

</style>