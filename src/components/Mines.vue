<template>
	<div class="Mines">
		<Load v-if="load"></Load>	
		<div class="wo">
			<div class="img"></div>
			<div class="user">唐家三少</div>
		</div>
		<div class="book">
			<h3><i class="fa fa-hand-o-right"></i>我的收藏</h3>
			<div class="icon" @click="$router.push('/')" v-if="key">
				<i class="fa fa-plus-circle"></i>
				<p>请添加你喜欢的小说吧！</p>
			</div>
			<ul v-if="!key" class="booklist clear">
				<router-link  v-for="(v,k) in bookdata" :to="'/book/'+v._id" tag="li">
					<img :src="decodeURIComponent(v.cover.replace('/agent/','')) "/>
				</router-link >
				<li @click="$router.push('/')">添加别的小说!</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import api from '../fetch/api';
	import Load from "./Load"
	export default {
		name: 'Mines',
		components:{Load},
		data() {
			return {
				key:true,
				bookdata:[],
				load:true
			};
		},
		methods:{
			s(){
				var ids=this.$store.state.storeids
				if(ids.length==0){
					this.key=true
				}else{
					this.key=false
					for(var i=0;i<ids.length;i++){
						api.getBook(ids[i]).then(data=>{
							this.bookdata.push(data)
							
						})
					}
				}
				this.load=false
			}
		},
		mounted() {
			this.s()
		}
	}
</script>

<style scoped>
	.wo {
		width: 100%;
		height:200px;
		background: #edf2f4 ;
		color: #fff;
		text-align: center;
		padding-top:1rem;
	}

	.wo .img {
		width: 1.4rem;
		height:1.4rem;
	    background: url(../assets/user_bg.png);
		background-size: cover;
		margin: auto;
		border-radius: 50%;
	}

	.wo .user {
		display: inline-block;
		padding:0.1rem 0.4rem;
		margin:0.2rem auto;
		color: #2b2d42;
		border-radius:0.4rem;
		font-size:0.24rem;
	}
	.book{
		margin: 0.2rem;
		box-shadow: 1px 1px 8px rgba(0,0,0,0.3);
	}
	.book h3{
		line-height: 1rem;
		color:  #2b2d42;
	}
	.book h3 i{
		margin: 0px  0.1rem;
	}
	.icon{
		padding: 0.6rem 0px;
		text-align: center;
	}
	.icon p{
		font-size: 14px;
		line-height: 0.6rem;
	}
	 .icon i{
		font-size: 0.6rem;
	}
	.booklist{
		margin: 0.2rem;
		z-index: -1;
	}
	.booklist li{
		width:25%;
		float: left;
		margin: 0.2rem 0;
		z-index: 99;
	}
	.booklist li img{
		width: 1.3rem;
		height:1.6rem;
	}
	.booklist li:last-of-type{
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		color: #006600;
		font-weight: 600;
		text-align: center;
	}
</style>
