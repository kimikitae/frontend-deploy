<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name: "RedirectPage",
    data(){
        return{
            code: "",
        }
    },
    methods:{

    },
    created(){
        this.code = this.$route.query.code
        console.log(this.code)
    }
}
</script>