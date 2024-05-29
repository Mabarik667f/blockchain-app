<script>
export default {
    name: 'sol-select',
    props: {
        modelValue: {
            default: ''
        },
        options: {
            require: true,
            default: () => []
        }
    }
}
</script>

<template>
    <select :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
        <option disabled>Выберите токен из списка</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
    </select>
</template>

<style scoped>

</style>