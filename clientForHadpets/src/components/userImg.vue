<template>
    <label class="label">
        <input type="file" @change="getimg" name="uimage" style="display:none" accept="image/*"/>
        <span>头像</span>
        <div class="div">
            <img class="uimg" :src="uimageSRC" alt="头像">
            <span class="gt">&gt;</span>
        </div>
    </label>
</template>

<script>
export default {
    methods:{
        getimg(e){
            //获取用户上传的图片文件的数组的第一个file对象
            let file=e.target.files[0];
            //使用FileReader将file转换成可被src识别的base64
            let fr=new FileReader();
            //使用readAsDataUrl转换
            fr.readAsDataURL(file);
            //使用onload监听加载完毕
            //使用箭头函数,使this指向外部对象
            fr.onload=(res)=>{
                this.uimageSRC=res.target.result;
                this.$store.commit("adduserinfo","uimg",this.uimageSRC);
            }
        }
    },
    data() {
        return {
            uimageSRC:require('../assets/notlogin.png')
        }
    },
}
</script>

<style lang="scss" scoped>
.label{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem;
    border-bottom:1px solid #ccc; 
    font-size: 0.8rem;
    height:2rem;
    .div{
        width: 4rem;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-around;
        .uimg{
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            border:1px solid #777;
        }
        .gt{
            color: #888;
            font-size: 1rem;
        }
    }
}
</style>
