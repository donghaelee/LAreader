<template>
<div class="content" :style="{'background':bg,'color':color}">
	<ul class="top">
		<li class="text_left " @click="$router.back();$store.commit('tig',true)"><i class="fa fa-chevron-left" aria-hidden="true"></i></li>
		<li class="text_center">{{title}}</li>
		<li  class="text_right" @click="$router.push('/');$store.commit('tig',true)"><i class="fa fa-home"></i></i></li>
	</ul>
	<ul @click="show()">
		<li v-for="v in txt">
			<h1> {{v.title}}</h1>
			<div class="fixed_margin art" v-html="v.isVip?'VIP章节,请购买。':s(v.cpContent)"  :style="{'font-size':size+'rem','line-height':size*2+'rem' }">
			</div>
		</li>
	</ul>
	<div class="bottom">
		<div class="font clear ">
			<span @click.self="fontminus()">A-</span>
			<span class="line"></span>
			<span class="active" :style="{'width':width+'rem'}"></span>
			<span @click.self="fontadd()">A+</span>
		</div>
		<div class="style">
			<span @click="bg='lemonchiffon';color='black'" :class="bg=='lemonchiffon'?'native':''">标准模式</span>
			<span @click="bg='#5dd39e';color='#0b132b'" :class="bg=='#5dd39e'?'native':''">护眼模式</span>
			<span @click="bg='black';color='white'" :class="bg=='black'?'native':''">夜间模式</span>
		</div>
		<div class="link">
			<span @click="up()">上一章</span>
			<router-link :to="'/chapter/'+this.$route.params.ids+'/'+order" tag="span">目录</router-link>
			<span @click="down()">下一章</span>
		</div>
	</div>
</div>
</template>

<script>
	import api from "../../fetch/api.js"
	export default {
		name: '',
		data() {
			return {
				txt:[],
				order:0,
				title:"",
				key:true,
				size:0.28,
				width:1,
				bg:'lemonchiffon',
				color:'black',
				length:''
			};
		},
		methods:{
			orign(ides){
				this.$store.commit('tig',false)
				api.getChapterContent(ides).then(data=>{
					this.title=data.title
					console.log(data)
					if(this.txt==''){
						this.txt.push(data)
					}else{
						for(var i=0;i<this.txt.length;i++){
							if(this.txt[i].id!=data.id){
							   this.txt.push(data)
							}
						}
					}
				})
			},
			s(str){
				return str.replace(/^/gm,'<div>').replace(/$/gm,'</div>')
			},
			show(){
				var top=document.querySelector(".top")
				var bottom=document.querySelector(".bottom")
				if(this.key){
					top.style.top="0"
					bottom.style.bottom="0"
				}else{
					top.style.top="-1rem"
					bottom.style.bottom="-2.5rem"
				}
			this.key=!this.key	
			},
			fontminus(){
				if(this.size>0.25){
					this.size=this.size-0.04
					this.width=this.width-1
				}
			},
			fontadd(){
				if(this.size<0.39){
					this.size=this.size+0.04
					this.width=this.width+1
				}
			},
			up(){
				if(this.order>0){
					this.order=this.order-1
					api.getChapters(this.$route.params.ids).then(data=>{
						this.orign(data[this.order].id)
					})
				}
			},
			down(){
					this.order=this.order+1;
					api.getChapters(this.$route.params.ids).then(data=>{
						this.orign(data[this.order].id)
					})
				}
		},
		created() {
			this.orign(this.$route.params.id)
			this.order=parseInt(this.$route.params.order)-1
		},
		mounted() {
			var _this=this
		     window.addEventListener('scroll',function(){
			 var height=document.body.scrollTop||document.documentElement.scrollTop;
			 var wh=window.innerHeight;
			 var zh=document.documentElement.scrollHeight;
			 if(wh+height>=zh){
				 _this.down()
			 }
			}) 
		}
	}
</script>

<style scoped>
.content{
	position: absolute;
	top:0;
	width: 100%;
	height: auto;
}	
.top{
	position: fixed;
	top:-1rem;
	width: 100%;
	background: rgba(0,0,0,0.8);
	height: 1rem;
	color: white;
	transition:top 0.6s;
}
.top li{
	height: 100%;
	float: left;
	line-height: 1rem;
	font-size: 0.28rem;
}
.top li i{
	font-size: 0.32rem;
}
.text_left{
	text-align: left;
	width: 10%;
	padding-left: 0.3rem;
}
.text_center{
	width: 80%;
	text-align: center;
}
.text_right{
	width: 10%;
	text-align: right;
	padding-right:0.3rem;
}
.bottom{
	position: fixed;
	bottom:-2.5rem;
	width: 100%;
	background: rgba(0,0,0,0.8);
	height: 2.5rem;
	color: white;
	transition: all 0.6s;
}
.font{
	font-size: 0.28rem;
	position: relative;
	margin: 0.3rem;
}
.font span{
	font-size: 0.4rem;
}
.font span:first-of-type{
	float: left;
}
.font span:last-of-type{
	float: right;
}
.font .line{
	display: block;
	width: 4rem;
	height: 0.1rem;
	background: white;
	position: absolute;
	top:0;bottom: 0;
	margin: auto;
	left:1.52rem;
}
.font .active{
	display: block;
	height: 0.1rem;
	background: white;
	position: absolute;
	top:0;bottom: 0;
	margin: auto;
	left:1.52rem;
	background: red;
	transition: width 0.3s; 
}
.style{
	position: relative;
	margin: 0.3rem;
}
.style span{
	border: 1px solid lavender;
	padding:0.1rem  0.2rem;
	font-size: 0.28rem;
	margin: 0 0.4rem;
}
.link{
	margin-top: 0.5rem;
}
.link span{
	display: inline-block;
	width: 32.5%;
	padding:0.1rem  0.2rem;
	font-size: 0.28rem;
	text-align: center;
}
li h1{
	font-weight: 400;
    color: #333;
    padding: 0 .53333rem;
    line-height: 1.5rem;
}
li .art{
	text-indent: 0.4rem;
}
.native{
	background: white;
	color: black;
}
</style>
