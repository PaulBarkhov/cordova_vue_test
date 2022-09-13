<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'notification',
    methods: {
        close() {
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
        },
    },
}


</script>

<style scoped>
div {
    width: calc(100% - 20px);
    background: white;
    border-radius: 5px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5),
        -4px -4px 8px rgba(229, 229, 229, 0.5);
    position: fixed;
    top: 10px;
    left: 10px;
    overflow: hidden;

    /* padding: 1rem; */

    max-height: 0;
    padding: 0 1rem;

    animation-name: slide-from-top;
    animation-duration: 5s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
}

@keyframes slide-from-top {
    0% {
        max-height: 0;
        padding: 0 1rem;
    }

    10% {
        max-height: 300px;
        padding: 1rem 1rem;
    }

    90% {
        max-height: 300px;
        padding: 1rem 1rem;
    }

    100% {
        max-height: 0;
        padding: 0 1rem;
    }
}
</style>