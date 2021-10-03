<template>
    <div class="modal">
        <div class="modal__inner">
            <header>
                <p>Подтверждение</p>
            </header>
            <main>
                <slot></slot>
            </main>
            <footer>
                <button @click.stop="confirmHandler(true)" class="confirm">Да</button>
                <button @click.stop="confirmHandler(false)" class="reject">Нет</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['confirm'],

    methods: {
        confirmHandler(confirmed) {
            this.$emit('confirm', confirmed)
        }
    }
}
</script>

<style lang="scss" scoped>
.modal {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    background-color: rgba(3, 3, 3, 0.3);

    &__inner {
        margin-top: 20px;
        width: 100%;
        max-width: 450px;
        border-radius: 13px;
        // border: 2px solid #212121;
        background-color: #fff;
        box-shadow: var(--separator-shadow);
        overflow: hidden;
    }
}

header {
    padding: 10px 0;
    text-align: center;
    font-size: 22px;
    border-bottom: 1px solid #212121;
}

main {
    padding: 30px 0 20px;
    font-size: 18px;
}

footer {
    padding: 10px 20px;
    display: flex;
    justify-content: flex-end;
    grid-gap: 0 15px;
}

button {
    padding: 0.5em 2em;
    color: white;
    border-radius: 8px; 

    &.confirm {
        background-color: #001eff;
    }

    &.reject {
        background-color: #f04949;
    }
}

</style>