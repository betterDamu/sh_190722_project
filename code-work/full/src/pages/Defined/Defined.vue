<template>
    <div>
        Defined
    </div>
</template>

<script>
    export default {
        name: "Defined",
        beforeRouteEnter (to, from, next) {
            console.log("组件内部 beforeRouteEnter")
            next()
        },
        beforeRouteUpdate (to, from, next) {
            console.log("组件内部 beforeRouteUpdate")
            next()
        },
        beforeRouteLeave (to, from, next) {
            console.log("组件内部 beforeRouteLeave")
            next()
        }
    }
</script>

<style scoped>

</style>