<template>
    <div class="container">
        <span>{{context}}</span>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        context:{
            type:String,
            default:''
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        width: 80%;
        height: 3rem;
        position: fixed;
        background: rgba(0,0,0,0.2);
        border: 3px solid rgba(0,0,0,0.4);
        margin-top: -1.5rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }
</style>
