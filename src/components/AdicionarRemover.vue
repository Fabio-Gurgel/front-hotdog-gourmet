<template>
    <div class="adicionar-remover">
        <button @click="diminuir()">-</button>
        <span>{{ quantidade }}</span>
        <button @click="aumentar()">+</button>
    </div>
</template>

  
<script>

export default {
    data() {
        return {
            quantidade: 0
        };
    },
    methods: {
         async aumentar() {
            if (this.quantidade < 5) {
                 await this.quantidade++;
                this.$emit('aumentarPreco');
            }
        },
        async diminuir() {
            if (this.quantidade > 0) {
                await this.quantidade--;
                this.$emit('diminuirPreco')
            }
        }
    }
};
</script>
  
<style scoped>
.adicionar-remover {
    margin-top: 3px;
    margin-bottom: 3px;
}

button {
    font-size: larger;
    width: 30px;
}

span {
    font-size: large;
    margin-left: 6px;
    margin-right: 6px;
}
</style>