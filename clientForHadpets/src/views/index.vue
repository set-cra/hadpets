<template>
    <div class="container" @touchstart="start" @touchend="changePage" @touchmove="movepage">
        <div class="pull">下拉加载</div>
        <ul class="page" :style="'margin-left:-'+index*100+'%;transition:0.2s'">
            <li class="item">
                精选
            </li>
            <li class="item">
                动态
            </li>
            <li class="item">
                频道
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //触碰开始时间
            Tstart:0,
            //触碰结束时间
            Tend:0,
            //触碰时横坐标
            sx:0,
            //离开时横坐标
            ex:0
        }
    },
    methods:{
        changePage(e){
            let Tend=new Date().getTime();
            this.Tend=Tend;
            //计算时差
            //当时差超过120毫秒时,认为用户在犹豫是否要切换,所以根据用户滑动的距离,判定当前页面是否移动
            let timecell=this.Tend-this.Tstart;
            //获取位移的数据
            this.ex=e.changedTouches[0].pageX;
            //计算位移
            //当位移小于0时右移,大于0时左移
            let movecell=this.ex-this.sx;
            //倒时差在200内时,根据数值正负直接切换
            if(timecell<=200){
                if(movecell<0&&this.index<2){
                    this.$store.commit("setpageindex",this.index+1);
                }else if(movecell>0&&this.index>0){
                    this.$store.commit("setpageindex",this.index-1);
                }
            }else{
                    this.$store.commit("setpageindex",Math.round(this.index));
            }
        },
        start(e){
            let Tstart=new Date().getTime();
            this.Tstart=Tstart;
            this.sx=e.targetTouches[0].pageX;
        },
        movepage(e){
            let Tend=new Date().getTime();
            this.Tend=Tend;
            //计算时差
            //当时差超过120毫秒时,认为用户在犹豫是否要切换,所以根据用户滑动的距离,判定当前页面是否移动
            let timecell=this.Tend-this.Tstart;
            if(timecell>200){
                //获取位移的数据
                this.ex=e.changedTouches[0].pageX;
                //计算位移
                //当位移小于0时右移,大于0时左移
                let movecell=this.ex-this.sx;
                //计算位移占比
                let decimal = movecell / e.view.innerWidth;
                if(decimal>0){
                    this.$store.commit("setpageindex",Math.ceil(this.index)-decimal);
                }else{
                    this.$store.commit("setpageindex",Math.floor(this.index)-decimal);
                }
            }
        }
    },
    computed:{
        index(){
            return this.$store.state.pageindex
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    overflow: hidden;
    margin-bottom: 2rem;
    .pull{
        width: 100%;
        height: 2rem;
    }
    .page{
        width: 300%;
        display: flex;
        flex-flow: row nowrap;
    }
    .item{
        width: 100%;
    }
}
</style>
