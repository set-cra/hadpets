<template>
    <div>
        <my-warning v-show="warning.length>0" :context="warning"></my-warning>
        <my-child-header 
        :title="'修改昵称'"
        :rightContent="'保存'"
        :rightFunc="save"
        >
        </my-child-header>
        <div class="div-mt">
            <input class="uname" type="text" v-model="value" maxlength="6"
             placeholder="请输入6位以内的昵称">
             <div class="length" 
             :class="{
                 red:value.length==6||value.length==0,
                 orange:value.length==5||value.length==4,
                 green:value.length<=3&&value.length>0
             }"
             >{{value.length}}/6</div>
        </div>
    </div>
</template>

<script>
import qs from 'querystring'
import { setTimeout, clearTimeout } from 'timers';
export default {
    data() {
        return {
            value:'',
            warning:''
        }
    },
    components:{
        "my-child-header":()=>import('../components/childHeader'),
        "my-warning":()=>import('../components/warning'),
    },
    methods:{
        save(){
            if(this.infoType==undefined){
                this.$router.push('/myInfo');
            }else{
                if(this.value.length==0){
                    this.warning="昵称不能为空";
                }else{
                    console.log(this.value);
                    this.$store.commit('adduserinfo',{str:this.infoType,value:this.value});
                    this.$router.go(-1);
                }
            }
        }
    },
    props:{
        infoType:{
            type:String,
            default:undefined
        }
    }
}
</script>

<style lang="scss" scoped>
    .div-mt{
        margin-top: 2rem;
        box-sizing: border-box;
        .uname{
            width: 100%;
            height: 1.5rem;
            box-sizing: border-box;
        }
        .length{
            text-align: right;
            font-size: 0.6rem;
            &.red{
                color: #f00;
            }
            &.orange{
                color: orange;
            }
            &.green{
                color: green;
            }
        }
    }
</style>

