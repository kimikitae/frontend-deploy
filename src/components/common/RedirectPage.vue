<template>
    <div>
        
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "RedirectPage",
    data(){
        return{
            code: "",
        }
    },
    methods:{
        ...mapActions("user", ["postTest"])
    },
    async created(){
        this.code = this.$route.query.code
        const info = { 
            code: this.code
        }
        await this.postTest(info)
    }
}
</script>