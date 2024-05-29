<script>
import { ref } from 'vue'
import addStaking from "@/hooks/addStaking"
import router from '@/router'
export default {
    setup() {
        const formData = ref({
            amount: ''
        })

        const asyncHook = async () => {
            const {asyncCall} = addStaking();
            await asyncCall(formData.value);
            router.push('/profile');
        }

        return {formData, asyncHook}
    },
}
</script>

<template>
    <sol-form @submit.prevent="asyncHook">
        <template v-slot:header>
            <h2>Положить токены на контракт</h2>
        </template>
        <template v-slot:fields>
            <label :for="'amount'">Количество</label>
            <sol-input :id="'amount'" v-model="formData.amount"
            :placeholder="'Количество...'"></sol-input>
        </template>
        <template v-slot:button>
            <sol-button>Внести</sol-button>
        </template>

    </sol-form>
</template>

<style scoped>

</style>