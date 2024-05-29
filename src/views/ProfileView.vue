<script>
import { ref, onMounted } from 'vue'
import getUserData from "@/hooks/getUserData"
export default {
    setup() {
        const data = ref({});
        onMounted(async () => {
            const {asyncCall} = getUserData();
            const {res} = await asyncCall();
            data.value = res;
        
        })
        return {data}
    },
}
</script>

<template>
    <div>
        <div>
            <label>Eth: </label>
            <h4>{{ data.eth }}</h4>
        </div>
        <div>
            <label>Gerda: </label>
            <h4>{{data.gerda}}</h4>
        </div>
        <div>
            <label>Krendel: </label>
            <h4>{{data.krendel}}</h4>
        </div>
        <div>
            <label>RTK: </label>
            <h4>{{data.rtk}}</h4>
        </div>
        <div>
            <label>Lp: </label>
            <h4>{{data.lp}}</h4>
        </div>
        <sol-button @click="$router.push('/addPool')">Создать пул</sol-button>
    </div>
</template>

<style scoped>

</style>