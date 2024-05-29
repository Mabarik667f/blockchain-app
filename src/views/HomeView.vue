<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import { onMounted } from 'vue'
import {useStore} from "vuex";
export default {
  name: 'HomeView',
  setup() {
    const store = useStore();
    onMounted(async () => {
      store.dispatch('login');
    })
  }
}


</script>
