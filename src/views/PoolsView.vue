<script>
import {ref, onMounted} from "vue"
import getPools from "@/hooks/getPools"
export default {
    setup() {
        const pools = ref([]);
        onMounted(async () => {
            const {asyncCall} = getPools();
            const {res} = await asyncCall();
            pools.value = res;
        })

        return {pools}
    }
}
</script>

<template>
    <div>
        <div v-for="pool in pools" :key=pool.owner class="pools">
            <div> 
                <label>Tokens: </label>
                <span>{{pool.first}}:{{pool.second}} </span>
            </div>
            <div> 
            <label>Владелец: </label>
            <span>{{pool.owner}} </span>
                        </div>

            <div> 
            <label>Вкладчики: </label>
                <span v-if="pool.supporters.length >= 1">{{pool.supporters}} </span>
                <span v-else>Нет вкладчиков</span>
                            </div>

            <div> 
            <label>Отношение в ETH: </label>
            <span>{{pool.ratioETh}} </span>
                        </div>

            <div> 
            <label>Отношение в Токенах: </label>
            <span>{{pool.ratioTokens}} </span>
                        </div>

            <div>
                <sol-button @click="$router.push(`/supportPool/${pool.address}`)">Поддержать пул</sol-button>
            </div>
            <div>
                <sol-button @click="$router.push(`/swapTokens/${pool.address}`)">Обменять токены</sol-button>
            </div>
            </div>
    </div>
</template>

<style scoped>
.pools {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 70%;
    margin: auto;
    
}

.pools div {
    margin: 10px 0;
}
</style>