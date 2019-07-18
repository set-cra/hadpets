import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageindex:0,
    userid:'',
    userinfo:{}
  },
  mutations: {
    setpageindex(state,num){
      //验证num值是否为0-2
      if(num>=2){
        num=2;
      }
      if(num<=0){
        num=0;
      }
      state.pageindex=num;
    },
    login(state,id){
      state.userid=id;
    },
    logout(state){
      state.userid=undefined;
    },
    adduserinfo(state,{str,value}){
      console.log(value);
      state.userinfo[str]=value;
    }
  },
  actions: {

  }
})
