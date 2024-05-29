<script>
export default {
    name: 'sol-input',
    props: {
        type: {
            default: 'text'
        },
        modelValue: {
            default: ''
        },
        placeholder: {
            default: ''
        }
    }
}
</script>

<template>
    <input @input="$emit('update:modelValue', $event.target.value)" :value="modelValue" class="form-control" :type="type" :placeholder="placeholder" required>
</template>

<style scoped>

</style>