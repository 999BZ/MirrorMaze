<template>
    <div class="w-full h-full fixed top-0 left-0 flex justify-center content-center flex-wrap bg-black/50">
        <div class="md:w-1/3 w-2/3 h-auto p-6 flex justify-evenly flex-col rounded-lg border-4 gap-6 text-white bg-black/70"
            :class="{ 'border-lime-400': isSuccess, 'border-red-600': !isSuccess }">
            <h1 class="text-xl font-bold" :class="{ 'text-lime-400': isSuccess, 'text-red-600': !isSuccess }">{{ isSuccess
                ? 'Well done. You have finished it.' : 'You hit a wall. Try Again!' }}</h1>
            <div class="w-full flex justify-end flex-wrap">
                <button class="py-2 px-4 rounded-lg border-2 bg-black" :class="{
                    'hover:bg-lime-400 hover:text-black text-lime-400 border-lime-400': isSuccess,
                    'hover:bg-red-600 hover:text-black text-red-600 border-red-600': !isSuccess
                }" @click="doAction(isSuccess)">Close</button>
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