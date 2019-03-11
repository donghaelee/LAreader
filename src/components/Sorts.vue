<template>
<div class="Sorts">
	<Load v-if="load"></Load>
	<h3><i class="fa fa-mars"></i>男生专区</h3>
	<div  class="title clear fixed_margin">
		<router-link v-for="(v,k) in male" :to="{name:'猫',params:{ major:v.name,id:k}, query:{ gender:'male'}}"
		 tag='span'  :key="k">{{v.name}}</router-link>
	</div>
	<h3><i class="fa fa-venus"></i>女生专区</h3>
	<div  class="title clear fixed_margin">
		<router-link v-for="(v,k) in female" :to="{name:'猫',params:{ major:v.name,id:k}, query:{ gender:'female'}}"
		 tag='span'  :key="k">{{v.name}}</router-link>
		
	</div>
</div>
</template>

<script>
	import api from '../fetch/api';
	import Load from "./Load"
	export default {
		name: '',
		components:{Load},
		data() {
			return {
				female:[],
				male:[],
				load:true
			};
		},
		created(){
			api.getCategory().then(data=>{
				this.female=data.female
				this.male=data.male	
				this.load=false
			})
		}
	}
</script>

<style scoped>
	.Sorts{
		background: #f5f5f5;
		width: 100%;
		height: 100%;
	}
	img{
		width: 62.5px;
		height:auto
	}
	.male{
		background: white;
		margin: 20px;
	}
	.title span{
		font-size: 0.28rem;
		float: left;
		display: block;
		width: 33.33%;
		height: 0.8rem;
		line-height: 0.8rem;
	}
	h3{
		font-size: 0.28rem;
		padding: 0.2rem;
		color: #8d99ae;
		background: #edf4f4;
	}
	h3:last-of-type{
		background: #fcddbc;
		color: #69585f;
	}
	 h3 i{
		margin-right: 0.2rem;
	}
</style>
