<template>
    <button class="px-5 py-2 text-lg border-2 border-black bg-black/20" @click="this.$emit('do-action')">{{ text
    }}</button>
</template>

<script>
export default {
    props: ['text'],
    emits: ['do-action'],
}
</script>