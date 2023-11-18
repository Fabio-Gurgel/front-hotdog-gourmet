<template>
    <div :class="{ 'is-active': isActive }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Modal title</p>
                <button class="delete" aria-label="close" @click="fecharModal()"></button>
            </header>
            <section class="modal-card-body">
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Save changes</button>
                <button class="button" @click="fecharModal()">Cancel</button>
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