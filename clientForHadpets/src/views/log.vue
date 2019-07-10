<template>
    <div>
        <childHeader :title="$route.path=='/log/in'?'登录':'注册'" :data-id="$route.path"></childHeader>
        <router-view></router-view>
    </div>
</template>

<script>
import { nextTick } from 'q';
export default {
    data() {
        return {
        }
    },
    components:{
        childHeader:()=>import('../components/childHeader')
    }
}
</script>


