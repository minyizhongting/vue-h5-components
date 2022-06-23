<template>
    <div class="common-banner">
        <img
            :src="src"
            :style="rate ? { minHeight: `${100 / rate}vw` } : {}"
            alt="" />
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'top-banner',
    props: {
        src: {
            type: String,
            default: '',
        },
        rate: {
            type: Number,
            default: 0,
        },
    },
});
</script>

<style lang="scss">
.common-banner {
    position: relative;
    img {
        display: block;
        width: 100%;
        object-fit: cover;
    }
}
</style>
