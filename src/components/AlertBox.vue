<template>
    <div class="w-full h-full fixed top-0 left-0 flex justify-center content-center flex-wrap bg-white/70">
        <div class="w-1/2 h-auto p-6 flex justify-center flex-col rounded-lg border-4 gap-6 text-white"
            :class="{ 'bg-green-400 border-green-600': isSuccess, 'bg-red-400 border-red-600': !isSuccess }">
            <h1 class="text-xl">{{ isSuccess ? 'Well done. You have finished it.' : 'You hit a wall. Try Again!' }}</h1>
            <div class="w-full flex justify-end">
                <button class="py-2 px-4 rounded-lg" :class="{ 'bg-green-600': isSuccess, 'bg-red-600': !isSuccess }"
                    @click="doAction(isSuccess)">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['result'],
    emits: ['try-again', 'close-box'],
    computed: {
        isSuccess() {
            return this.result == 'success';
        },
    },
    methods: {
        doAction(isSuccess) {
            if (isSuccess) this.$emit('close-box');
            else this.$emit('try-again');
        }
    }
}
</script>