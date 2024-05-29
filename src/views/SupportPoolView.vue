<script>
import { onMounted, ref } from 'vue'
import supportPool from '@/hooks/supportPool'
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
            tokens.value = tokensList;
        })
        const asyncHook = async () => {
            const {asyncCall} = supportPool();
            await asyncCall(formData.value);
            router.push('/profile')
        }

        return {formData, tokens, asyncHook}
    },
}
</script>

<template>
    <sol-form @submit.prevent="asyncHook()">
        <template v-slot:header>
            <h2>Поддержать пул</h2>
        </template>
        <template v-slot:fields>
            <div>
            <label :for="'tokens'"></label>
            <sol-select :id="'tokens'" v-model="formData.token" :options="tokens"></sol-select>
            </div>
            <div>
            <label :for="'amount'">Количество</label>
            <sol-input :id="'amount'" v-model="formData.amount"
            :placeholder="'Количество...'"></sol-input>
            </div>
        </template>
        <template v-slot:button>
            <sol-button>Внести</sol-button>
        </template>

    </sol-form>
</template>

<style scoped>

</style>