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
        ...mapActions("token", ["postTest"]),
        ...mapActions("user", ["getInfo"])
    },
    async created(){
        this.code = this.$route.query.code
        const info = { 
            code: this.code
        }
        const t = await this.postTest(info)
        if(t){
            await this.getInfo()
        } else{
            alert("카카오 로긴 실패요~")
        }
    }

}
</script>