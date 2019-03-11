<template>
<div class="Searchbooks">
<Headercheck/>
<div class="keyword">
	<p class="fixed_margin">与 <span>{{$route.params.keywords}}</span> 有关的书籍</p>
</div>
<div class="list-content" >
	<ul class="fixed_margin">
		<router-link :to="'/book/'+v._id" v-for="(v,index) in booklist" class="clear" tag="li">
			<div class="left">
				<img :src="decodeURIComponent(v.cover.replace('/agent/',''))" />
			</div>
			<div class="right">
				<h3>{{v.title}}</h3>
				<p>{{v.shortIntro}}</p>
				<div class="bottom">
					{{v.author}}
					<span>{{v.cat}}</span>
				</div>
			</div>
		</router-link>
	</ul>
</div>
</div>
</template>

<script>
	import api from "../../fetch/api.js"
	import Headercheck from "./Header_check"
	export default {
		components:{Headercheck},
		data() {
			return {
				booklist:""
			};
		},
		created() {
		api.searchByKeyword(this.$route.params.keywords).then(data=>{
			this.booklist=data
		})	
		}
	}
</script>

<style scoped>
	.Searchbooks{
		padding-top: 1rem;
	}
	.list-content li{
		margin: 0.3rem 0;
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
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-line-clamp: 1;
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
		background: #5dd39e;
		float: right;
		font-size: 0.24rem;
		padding:0.02rem 0.06rem;
		border-radius: 0.3rem;
		color: white;
	}
	.keyword{
		position: fixed;
		top:1rem;
		width: 100%;
		line-height: 1rem;
		background: #edf2f4;
	}
	.keyword span{
		font-weight: bold;
		color: red;
	}
</style>
