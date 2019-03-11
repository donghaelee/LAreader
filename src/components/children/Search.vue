<template>
<div class="search">
	<Headercheck/>
	<div class="text">
		<input v-model="txt" type="text" placeholder="请输入搜索内容"/>
		<router-link :to="'/searchbooks/'+txt" tag="span">确定</router-link>
	</div>
	<div class="words fixed_margin clear">
		<div class="changewords">搜索热词： <button @click="s()"><i class="fa fa-repeat"></i>换一批</button> </div>
		<router-link :to="'/searchbooks/'+v.word" tag="span" v-for="(v,k) in words" :key="k">{{v.word}}</router-link >
	</div>
</div>
</template>

<script>
	import Headercheck from "./Header_check"
	import api from "../../fetch/api.js"
	export default {
		components:{Headercheck},
		data() {
			return {
				words:[],
				txt:""
			};
		},
		methods:{
		  s(){
			  this.words=[]
			 api.getSearchHotKeywords().then(data=>{
             for (var i = 0; i<20; i++) {
				if (data.length>0) {
					var arrIndex = Math.floor(Math.random()*data.length);
					this.words.push(data[arrIndex]);
				} else {
					break;
				}
                  }
		  })
		}
		},
		mounted() {
		this.$store.commit('tig',false)
		  this.s()
		}
	}
</script>

<style scoped>
.search{
	 background: #edf2f4;
	 width: 100%;
	 height: 100%;
}
.text{
	text-align: center;
}
.text input{
	margin:0.4rem 0;
	border-radius:0.3rem;
	line-height: 0.7rem;
	width:5rem;
	outline: none;
	 box-shadow:3px 3px 3px #c8c8c8 inset;
	 border: none;
	 padding-left: 0.2rem;
}
.text span{
	display: inline-block;
	margin-left: 0.4rem;
	font-size: 0.28rem;
	line-height: 0.6rem;
	padding: 0px 0.3rem;
	background: white;
	box-shadow:0.06rem 0.06rem 0.06rem #c8c8c8 inset;
}
.changewords{
	line-height:1.2rem;
	font-size: 0.28rem;
}
.changewords button{
	float: right;
	margin:0.4rem 0;
	background:none;
	border: none;
	outline: none;
}
.changewords button i{
	margin-right: 0.1rem;
}
.words span{
	margin: 0.2rem;
	display: inline-block;
	padding: 0.1rem 0.3rem;
	background: white;
	border-radius: 0.3rem;
}
</style>
