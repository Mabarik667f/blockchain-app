<script>
import { onMounted, ref } from 'vue'
import swapTokens from '@/hooks/swapTokens'
import getTokensOnPool from "@/hooks/getTokensOnPool"
import { useRoute } from 'vue-router'
import router from '@/router'
export default {
    setup() {
        const route = useRoute();

        const formData = ref({
            amount: '',
            token: '',
            pool: route.params.pool
        })
        const tokens = ref({});
        onMounted(async () => {
            const {asyncCall} = getTokensOnPool();
            const {tokensList} = await asyncCall(formData.value.pool);
            tokens.value = tokensList
        })
        const asyncHook = async () => {
            const {asyncCall} = swapTokens();
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
            <h2>Обмен токенов</h2>
        </template>
        <template v-slot:fields>
            <label :for="'tokens'">Токен</label>
            <sol-select :id="'tokens'" v-model="formData.token" :options="tokens"></sol-select>
            <label :for="'amount'">Количество</label>
            <sol-input :id="'amount'" v-model="formData.amount"
            :placeholder="'Количество...'"></sol-input>
        </template>
        <template v-slot:button>
            <sol-button>Обменять</sol-button>
        </template>

    </sol-form>
</template>

<style scoped>

</style>