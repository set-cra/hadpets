import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageindex:0,
    userid:undefined
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
    }
  },
  actions: {

  }
})
