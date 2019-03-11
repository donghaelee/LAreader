<template>
<div class="list-content">
	<ul class="fixed_margin">
		<router-link :to="'/book/'+v.book._id" v-for="(v,index) in booklist" class="clear" tag="li">
			<div class="left">
				<img :src="v.book.cover" />
			</div>
			<div class="right">
				<h3>{{v.book.title}}</h3>
				<p>{{v.book.shortIntro}}</p>
				<div class="bottom">
					<router-link :to="'/searchbooks/'+v.book.author">{{v.book.author}}</router-link>
					<span>{{v.book.majorCate}}</span>
					<span>{{v.book.minorCate}}</span>
				</div>
			</div>
		</router-link>
	</ul>
</div>
</template>

<script>
	import api from "../../fetch/api.js"
	export default {
		props:["ids"],
		data() {
			return {
				booklist:[]
			};
		}, 
		methods:{
			book(){
				api.getBooks(this.ids).then(data=>{
					this.booklist=data
				})
			}
		},
		created(){
			this.book()
		},
		watch:{
			ids(v,oldv){
				this.book()
			}
		}
	}
</script>

<style scoped>
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
</style>
