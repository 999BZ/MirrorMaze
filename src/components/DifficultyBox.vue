<template>
    <div class="w-full h-full fixed top-0 left-0 flex justify-center content-center flex-wrap bg-white/70"
        @click="this.$emit('close-box')">
        <div class="w-1/2 h-auto p-6 flex justify-evenly flex-col rounded-lg border-4 gap-6 text-white bg-black/40"
            @click.stop>
            <h1 class="text-xl">Choose difficulty level:</h1>
            <div class="w-full flex justify-evenly">
                <button class="py-2 px-4 rounded-lg bg-green-600" @click="doAction('easy')">Easy</button>
                <button class="py-2 px-4 rounded-lg bg-sky-600" @click="doAction('medium')">Medium</button>
                <button class="py-2 px-4 rounded-lg bg-red-600" @click="doAction('hard')">Hard</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['result'],
    emits: ['choose-difficulty', 'close-box'],
    computed: {
        isSuccess() {
            return this.result == 'success';
        },
    },
    methods: {
        doAction(difficulty) {
            this.$emit('choose-difficulty', difficulty);
        }
    }
}
</script>