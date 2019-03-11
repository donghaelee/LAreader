<template>
<div class="chapter">
	<Load v-if="load"></Load>
	<Headercheck/>
	<div class="title">
		<h3>
			目录
			<span>共{{lists.length}}章</span>
			<span v-text="order" @click="s()"></span>
		</h3>
	</div>
	<ul class="list">
		<router-link :to="'/content/'+$route.params.ids+'/'+v.id+'/'+v.order"
		 tag="li" v-for="(v,k) in lists"  :class="num==v.order?'active':''" >
		{{v.title}}  <span>{{v.isVip?'vip章节':''}}</span>
		</router-link>
	</ul>
</div>
</template>

<script>
	import api from "../../fetch/api.js"
	import Headercheck from "./Header_check"
	import Load from "../Load"
	export default {
		components:{Headercheck,Load},
		data() {
			return {
				lists:"",
				order:"倒序",
				key:true,
				num:"",
				load:true
			};
		},
		methods:{
			s(){
				if(this.key){
					this.order='正序'
					this.lists.reverse()
				}else{
					this.order='倒序'
					this.lists.reverse()
				}
				this.key=!this.key
			}
		},
		created() {
			this.$store.commit('tig',false)
			this.num=parseInt(this.$route.params.order)+1
			api.getChapters(this.$route.params.ids).then(data=>{
				this.lists=data
				this.load=false
			})
			
		}
	}
</script>

<style scoped>
.title{
	width: 100%;
    padding: .4rem .5rem;
    border-bottom: 1px solid #f8f8f8;
	font-size: 0.28rem;
}
.title h3{

}
.title h3 span:first-of-type{
	color: #999;
	font-size: 0.24rem;
	font-weight: 400;
}
.title h3 span:last-of-type{
	float: right;
	font-weight: 400;
}
.list li{
	height: 1.3rem;
    line-height: 1.3rem;
    border-bottom: 1px solid #f8f8f8;
    margin-left: .5rem;
	white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #999;
}
.list .active{
	color: red;
}
.list li span{
	float: right;
	color: red;
	margin-right: 0.4rem;
}
</style>
