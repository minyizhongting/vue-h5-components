<template>
    <div
        class="loadingMask part">
        <svg
            viewBox="0 0 80 80"
            class="sp-icon is-spinner"
            :style="{ stroke: color, height: '40px', width: '40px', strokeWidth: '2px' }">
            <path
                stroke-dasharray="160"
                stroke-linecap="round"
                d="M40 40l8.201-8.201c4.53-4.53 11.873-4.53 16.402 0A11.598 11.598 0 0 1 68 40c0 6.405-5.193 11.598-11.598
                 11.598a11.598 11.598 0 0 1-8.201-3.397L40 40l-8.201-8.201c-4.53-4.53-11.873-4.53-16.402 0A11.598 11.598 0 0 
                 0 12 40c0 6.405 5.193 11.598 11.598 11.598 3.076 0 6.026-1.222 8.201-3.397L40 40z"
                stroke-width="7"
                fill="none"
                fill-rule="evenodd" />
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'loading',
    props: {
        color: {
            type: String,
            default: '#fff',
        },
    },
});
</script>

<style lang="scss">
.loadingMask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    &.part {
        position: relative;
        width: auto;
        height: auto;
        z-index: auto;
        background: none;
    }
}
.sp-icon {
    background-size: contain;
    fill: currentColor;
}
.sp-icon.is-spinner {
    animation: figureEightSpinnerDash 1s infinite linear;
}

@keyframes figureEightSpinnerDash {
    0% {
        stroke-dashoffset: 0;
    }
    100% {
        stroke-dashoffset: 320;
    }
}
</style>
