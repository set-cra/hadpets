import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageindex:0,
    userid:localStorage.getItem('id'),
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
      localStorage.setItem('id',id);
      state.userid=localStorage.getItem('id');
    },
    logout(state){
      localStorage.clear();
      state.userid=localStorage.getItem('id');
    },
    adduserinfo(state,obj){
      state.userinfo=obj;
    }
  },
  actions: {

  }
})
