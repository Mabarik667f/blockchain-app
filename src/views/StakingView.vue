<script>
import { ref, onMounted } from 'vue';
import getStaking from "@/hooks/getStaking"
import getReward from  "@/hooks/getReward";
import SolButton from '@/components/UI/SolButton.vue';
import router from '@/router';
export default {
  components: { SolButton },
    setup() {
        const data = ref({});
        onMounted(async () => {
            const {asyncCall} = getStaking();
            const {res} = await asyncCall()
            data.value = res;
        })

        const asyncHook = async () => {
            const {asyncCall} = getReward();
            await asyncCall()
            router.push('/profile')
        }

        return {data, asyncHook}
    },
}
</script>

<template>
    <h2>Вложения</h2>
    <div v-if="data.lastReward != 0">
        <div>
            <label>Токенов на стейк контракте: </label>
            <span>
                {{data.tokens}}
            </span>
        </div>
        <div>
            <label>Дата последнего сбора награды: </label>
            <span>
                {{data.lastReward}}
            </span>
        </div>
    </div>
    <div v-else><h4>Вложений нет</h4></div>
    <div>
        <sol-button @click="$router.push('/addStaking')" class="addStaking">Положить токены</sol-button>
    </div>
    <div v-if="data.lastReward != 0">
        <sol-button @click="asyncHook()">Забрать награду</sol-button>
    </div>
</template>

<style scoped>
.addStaking {
    margin-bottom: 10px;
}
</style>