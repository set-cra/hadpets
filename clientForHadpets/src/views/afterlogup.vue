<template>
    <div>
        <my-child-header :needback="false" :title="'基本个人信息'"></my-child-header>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    components:{
        'my-child-header':()=>import('../components/childHeader')
    }
}
</script>

<style lang="scss" scoped>

</style>
