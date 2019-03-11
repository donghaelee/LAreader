<template>
<div class="Rank">
	<Load v-if="load"></Load>
	<ul class="change clear">
		<li :class="sex.male?'active':''" @click="sex.female=false;sex.male=true;changedata=male;ids=changedata[0]._id;s()">
			<i class="fa fa-mars"></i>男生区
		</li>
		<li :class="sex.female?'active':''" @click="sex.male=false;sex.female=true;changedata=female;ids=changedata[0]._id;s()">
			<i class="fa fa-venus"></i>女生区
		</li>
	</ul>
	<div class="datacen">
		<ul class="left">
			<li v-for="v in changedata" @click="ids=v._id;s()" :class="ids==v._id?'actives':''" >{{v.shortTitle}}</li>
		</ul>
		<div class="right">
			<div class="list-content">
				<ul class="fixed_margin">
					<router-link  tag="li" :key="index" v-for="(v,index) in books" class="clear" :to="'/book/'+v._id">
						<div class="lefts">
							<img :src="decodeURIComponent(v.cover.replace('/agent/',''))" />
						</div>
						<div class="rights">
							<h3>{{v.title}}</h3>
							<p>{{v.shortIntro}}</p>
							<div class="bottom">
								<router-link :to="'/searchbooks/'+v.author">{{v.author}}</router-link>
								<span>{{v.majorCate}}</span>
								<span>{{v.minorCate}}</span>
							</div>
						</div>
					</router-link>
				</ul>
			</div>
		</div>
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
				female:"",
				male:'',
				sex:{female:false,male:true},
				changedata:'',
				ids:"",
				books:"",
				load:true
			};
		},
		methods:{
			s(){
				api.getRankBooks(this.ids).then((data)=>{
					this.books=data.ranking.books
					this.load=false
				})
			}
		},
		created(){
			api.getRanks().then((data)=>{
				this.female=data.female
				this.male=data.male
				this.changedata=this.male
				this.ids=this.changedata[0]._id
				this.s()
			})
		}
	}
</script>

<style scoped>
.change{
		height:0.8rem;
		width: 100%;
		line-height: 0.8rem;
		background: #F5F5F5;
		color: #333;
		position: fixed;
		top:1rem;
		z-index: 99;
		
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
		color: #f7fff7;
		background: #028090;
	}
	.left{
	width: 1.6rem;
	height: 80%;
    position: fixed;
    top:1.8rem;
    left: 0;
    background-color: #f6f7f9;
    overflow-y: scroll;
	}
	.left li{
	width: 100%;
    height: 0.72rem;
    line-height: 0.72rem;
    text-align: center;
    border-left: 0.04rem solid #f6f7f9;
    box-sizing: border-box;
	z-index: -99;
	}
	.right{
	position: relative;
    margin: 0.8rem 0 1.2rem 1.6rem;
    background-color: #fff;
	z-index: 1;
	}
	.list-content li{
		margin: 0.26rem 0;
	}
	.lefts{
		float: left;
		width: 30%;
		height: auto;
		font-size: 0.28rem;
	}
	.lefts img{
		width: 1.25rem;
		height: auto;
	}
	.rights{
		width: 70%;
		float: left;
	}
	.rights h3{
		font-weight:400;
		color: #333;
		margin: 0.08rem ;
	}
	.rights p{
	margin: 0.08rem;
    height: 0.64rem;
    line-height: 0.32rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
	color: #999
	}
	.rights .bottom{
	margin-top:0.32rem;
	color: #58a4b0;
	}
	.bottom{
		font-size: 0.24rem;
	}
	.bottom span{
		background: #f3e9d2;
		font-size: 0.24rem;
		padding:0.02rem 0.06rem;
		border-radius: 0.3rem;
		color: white;
	}
	.bottom span:last-of-type{
		background: #5dd39e;
		float: right;
	}
	.left .actives{
		color: #8d99ae;
		background: white;
	}	
</style>
