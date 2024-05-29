<script>
export default {
    name: "sol-form"
}
</script>

<template>
    <form method="post">
        <slot name="header"></slot>
        <slot name="fields"></slot>
        <slot name="button"></slot>
    </form>
</template>

<style scoped>

</style>