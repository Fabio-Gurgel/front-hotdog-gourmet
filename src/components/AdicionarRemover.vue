<template>
    <div class="adicionar-remover">
        <button @click="diminuir()">-</button>
        <span :id="this.idDoSpan">{{ quantidade }}</span>
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

    props: {
        fechou: {
            type: Boolean,
            default: false
        },
        idDoSpan: {
            type: Number,
            default: null
        },
        numeroMaximo: {
            type: Number,
            default: 5
        }
    },
    methods: {
        async aumentar() {
            if (this.quantidade < this.numeroMaximo) {
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
    },

    watch: {
        fechou() {
            this.quantidade = 0
        }
    },
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