<template>
    <div>
        <my-header :title="title"></my-header>
        <router-view @title="changeTitle"></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:'设置',
            popup:false
        }
    },
    components:{
        "my-header":()=>import('../components/childHeader'),
    },
    methods:{
        changeTitle(str){
            this.title=str;
        }
    }
}
</script>

