<template>
<div class="Book">
	<ul class="change clear">
		<li :class="sex.male?'active':''" @click="sex.female=false;sex.male=true;changedata=manData">
			<i class="fa fa-mars"></i>男生区
		</li>
		<li :class="sex.female?'active':''" @click="sex.male=false;sex.female=true;changedata=womanData">
			<i class="fa fa-venus"></i>女生区
		</li>
	</ul>
	<div v-for="(v,index) in changedata" class="bookGroup">
		 <h1 class="fixed_margin"><i class="fa fa-hand-o-right"></i>{{v.title}}</h1>
		 <HomeCen :ids="v._id"></HomeCen>
	</div>
</div>
</template>

<script>
	import api from "../../fetch/api.js"
	import HomeCen from "./home-booklist-content.vue"
	export default {
		name: 'Homebooklist',
		components:{HomeCen},
		data() {
			return {
				sex:{female:false,male:true},
				changedata:[],
				womanData:[],
				manData:[],
                load:false
			};
		},
		methods:{
			s(){
				api.getFeaturedData().then(data=>{			
					for(var i=0;i<data.length;i++){
						if(data[i].sex==="female"){
							this.womanData.push(data[i])
						}else if(data[i].sex==="male"){
							this.manData.push(data[i])
						}
					}
					this.changedata=this.manData
					this.load=true
				})
			}
		},
		created(){
			this.s()
		}
	}
</script>

<style scoped>
	.change{
		height:0.8rem;
		width: 100%;
		line-height: 0.8rem;
	}
	.change li{
		float: left;
		width: 50%;
		height: 100%;
		text-align: center;
	}
	.change li i{
		margin-right: 0.1rem;
	}
	.active{
		color: white;
		background: #c84635;
	}
	.bookGroup{
		margin: 0.4rem 0;
	}
	.bookGroup h1{
		font-size: 0.28rem;
		padding: 0.2rem;
		color: #8d99ae;
		background: #edf2f4;
	}
	.bookGroup h1 i{
		margin-right: 0.2rem;
	}
	
</style>
