<template>
<div class="review">
	<Headercheck/>
	<div class="hot">
		<ul v-if="review" class="fixed_margin show">
			<li v-for="v in review" class="clear">
				<img :src="'http://statics.zhuishushenqi.com'+v.author.avatar"/>
				<div>
					<h3>{{v.author.nickname}}</h3>
					<p class="title">{{v.title}}</p>
					<i>stars{{v.rating}}</i>
					<p id="title">{{v.content}}<i class="fa fa-angle-down" @click="s($event)"></i></p>
					<p class="time">时间:{{v.updated|time()}}</p>
				</div>
			</li>
		</ul>
		<p v-if='review.length<limit?false:true' class="jizai" @click="limit=limit+20;da()">
		<i class="fa fa-spinner"></i>点击加载更多
		</p>
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
				review:"",
				key:true,
				limit:20
			};
		},
		methods:{
			da(){
				api.getReview(this.$route.params.ids,this.limit).then(data=>{
					this.review=data
				})
			},
			s(e){
				if(this.key){
					e.currentTarget.style.transform="rotate(180deg)"
					e.currentTarget.parentElement.className="active"
				}else{
					e.currentTarget.style.transform="rotate(360deg)"
					e.currentTarget.parentElement.className=""
				}
				this.key=!this.key
			}
		},
		mounted() {
			this.da()
		},
		filters:{
			time(num){
			return 	new Date(num).toLocaleString()
			}
		}
	}
</script>

<style scoped>

 #title{
	line-height: 0.5rem;
	color: #333;
	padding-right: 0.3rem;
	text-align: justify;
	word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
	position: relative;
	}
#title i{
	position: absolute;
	right: 0;
	bottom: 0;
	font-size: 0.32rem;
	transition: transform 0.8s;
}
.show .active{
	height: auto!important;
    overflow: auto!important;
    display: block!important;
}
.show li{
	margin: 0.3rem 0rem;
	position: relative;
	padding-left: 1rem;
	padding-bottom: 0.4rem;
	border-bottom: 1px solid #ebebeb;
}
.show li img{
	position: absolute;
	left: 0;
	top: 0;
	width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
}
.show li h3{
	height: 0.4rem;
    line-height: 0.4rem;
    color: #a58d5e;
    font-size: 0.24rem;
}
.show li .title{
	height: 0.6rem;
    line-height: 0.6rem;
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #000;
}

.show li .time{
	margin: 0.2rem 0;
	font-size: 0.24rem;
	color:#333;
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
