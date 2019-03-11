<template>
<div class="booksorts">
<div class="shadow">
	<div class="keyword">
		<span v-for="v in typeList" :class="activeType==v.value?'active':''" @click="activeType=v.value;limit=20;s()">
		{{v.name}}
		</span>
	</div>
	<div  class="keyword">
		<span :class="activesort==all?'active':''" @click="activesort=all;limit=20;s()">全部</span>
		<span v-for="v in currentData" :class="activesort==v?'active':''" @click="activesort=v;s()">
		{{v}}
		</span>
	</div>
</div>
<div class="datacen">
	<div class="list-content">
		<ul class="fixed_margin">
			<router-link tag="li" :to="'/book/'+v._id"  v-for="(v,index) in booklist" class="clear">
				<div class="left">
					<img :src="decodeURIComponent(v.cover.replace('/agent/',''))" />
				</div>
				<div class="right">
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
		<p v-if='booklist.length>limit' class="jizai" @click="limit=booklist.length;s()">
		<i class="fa fa-spinner"></i>点击加载更多
		</p>
	</div>
</div>
</div>
</template>

<script>
	import api from "../../fetch/api.js"
	export default {
		name: '',
		data(){
			return{
				currentData:[],
				typeList: [{
					value: 'hot',
					name: '热门'
				}, {
					value: 'new',
					name: '新书'
				}, {
					value: 'reputation',
					name: '好评'
				}, {
					value: 'over',
					name: '完结'
				}, {
					value: 'monthly',
					name: '包月'
				}],
				gender:"",
				activeType: 'hot',
				major:"",
				activesort:'',
				page: 0,
				limit: 20,
				all:"",
				booklist:''
			}
		},
		methods:{
			s(){
				api.getCatBooks(
				this.gender,
				this.activeType, 
				this.major, 
				this.activesort,
				this.page,
				this.limit
				).then((data)=>{
					this.booklist=data
				})
			}
		},
	 created(){
		api.getMinorList().then((data)=>{
			if(this.$route.query.gender=="female"){
				var ids=parseInt(this.$route.params.id)
				this.currentData=data.female[ids].mins
			}else if(this.$route.query.gender=="male"){
				var ids=parseInt(this.$route.params.id)
				this.currentData=data.male[ids].mins
			}
			
		})
		this.gender=this.$route.query.gender
		this.major=this.$route.params.major
	},
	mounted() {
		this.s()
	}
	}
</script>

<style scoped>
.active{
	color: #c84635;
}
.shadow{
	box-shadow:0 -2px 8px rgba(0,0,0,0.6);
}
.keyword{
	background: #f5f5f5;
	line-height: 0.8rem;
	padding: 0px   0.4rem ;
	text-align:justify;
}
.list-content li{
		margin: 0.26rem 0;
	}
	.left{
		float: left;
		width: 20%;
		height: auto;
	}
	.left img{
		width: 1.25rem;
		height: auto;
	}
	.right{
		width: 80%;
		float: left;
	}
	.right h3{
		font-weight:400;
		color: #333;
		margin: 0.08rem ;
	}
	.right p{
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
	.right .bottom{
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
	.jizai{
		line-height: 1.5rem;
		height: 1.5rem;
		font-size: 14px;
		color: #1a936f;
		text-align: center;
	}
	.jizai i{
		margin-right: 0.2rem;
	}
</style>
