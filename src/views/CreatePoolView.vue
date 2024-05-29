<script>
import { onMounted, ref } from 'vue'
import createPool from '@/hooks/createPool'
import getTokens from "@/hooks/getTokens"
import router from '@/router'
export default {
    setup() {

        const formData = ref({
            name: '',
            token1: '',
            token2: '',
            amount1: '',
            amount2: ''
            
        })
        const tokens = ref({});
        onMounted(async () => {
            const {asyncCall} = getTokens();
            const {tokensList} = await asyncCall(formData.value.pool);
            tokens.value = tokensList;
        })
        const asyncHook = async () => {
            const {asyncCall} = createPool();
            await asyncCall(formData.value);
            router.push('/profile')
        }

        return {formData, tokens, asyncHook}
    },
}
</script>

<template>
    <sol-form @submit.prevent="asyncHook">
        <template v-slot:header>
            <h2>Создать пул</h2>
        </template>
        <template v-slot:fields>
            <label :for="'name'">Название пула</label>
            <sol-input :id="'name'" v-model="formData.name"
            :placeholder="'Название пула...'"></sol-input>
            <label :for="'token1'">Первый токен</label>
            <sol-select :id="'token1'" v-model="formData.token1" :options="tokens"></sol-select>
            <label :for="'token2'">Второй токен</label>
            <sol-select :id="'token2'" v-model="formData.token2" :options="tokens"></sol-select>
            <label :for="'amount1'">Количество первого токена</label>
            <sol-input :id="'amount1'" v-model="formData.amount1"
            :placeholder="'Количество...'"></sol-input>
            <label :for="'amount2'">Количество второго токена</label>
            <sol-input :id="'amount2'" v-model="formData.amount2"
            :placeholder="'Количество...'"></sol-input>
        </template>
        <template v-slot:button>
            <sol-button>Внести</sol-button>
        </template>

    </sol-form>
</template>

<style scoped>

</style>