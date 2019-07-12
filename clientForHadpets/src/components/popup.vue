<template>
    <div class="popup-container" @touchend="back">
        <div class="div" data-value="0">
            <span data-value="0">{{textcontent}}</span>
            <div class="btn" data-value="0">
                <span data-value="-1" class="cancel">取消</span>
                <span data-value="1" class="confirm">确定</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        back(e){
            let target = e.target;
            let code = target.getAttribute('data-value');
            if(code==undefined||code==-1){
                this.$emit('result',-1);
            }else if(code==1){
                this.$emit("result",1);
            }
        }
    },
    props:{
        textcontent:{
            type:String,
            default:''
        }
    }
}
</script>

<style lang="scss" scoped>
    .popup-container{
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.4);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 1000;
        top: 0;
        .div{
            width: 90%;
            height: 4rem;
            padding: 0.5rem;
            background: #fff;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            .btn{
                margin-left: 60%;
                .cancel{
                    margin-right: 1rem;
                    color: #ccc;
                }
                .confirm{
                    color: #f00;
                }
            }
        }
    }
</style>
