<template >
    <main>
        <div>
        dsadsaads
        </div>
    </main>
</template>
  
<script>
import { mapActions } from "vuex";

export default {
    name: "HomeView",
    data() {
        return {

        };
    },
    computed: {

    },
    methods: {
        ...mapActions('token', ['tryLogin']),
        
    },
};
</script>
  
<style scoped>

</style>