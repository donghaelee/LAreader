import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' 
import  Vuex from 'vuex'
import 'swiper/dist/css/swiper.css'


Vue.prototype.$axios=axios;
Vue.use(Vuex)
const store=new Vuex.Store({
	state:{
		foot_show:true,
		storeids:[]
	},
	mutations:{
		tig(state,bool){
			state.foot_show=bool			
		},
	  addids(state,ids){
		  if(state.storeids.length==0){
			  state.storeids.push(ids)
			  localStorage.setItem('st',ids)
		  }else{
			  for(var i=0;i<state.storeids.length;i++){
				  if(state.storeids[i]!=ids){
					  state.storeids.push(ids)
					localStorage.setItem('st',ids)
				  }
			  }
		  }
		  
		},
		deleteids(state,ids){
			if(state.storeids.length>0){
				for(var i=0;i<state.storeids.length;i++){
					if(state.storeids[i]==ids){
						state.storeids.splice(i,1)
						localStorage.removeItem("st",ids)
						}
				}
			}
		}
	}
})
Vue.config.productionTip = false

Vue.prototype.HOME = '/api'  
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
