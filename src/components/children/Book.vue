<template>
<div class="Book">
<Load v-if="load"></Load>	
<Headercheck/>
<div class="bookinfo fixed_margin clear">
	<div class="img">
		<img :src="bookinfo.cover?decodeURIComponent(bookinfo.cover.replace('/agent/','')):''" />
	</div>
	<div class="info">
		<h3 v-text="bookinfo.title"></h3>
		<router-link :to="'/searchbooks/'+bookinfo.author" tag="span" class="author">{{bookinfo.author}}</router-link>
		<p>{{bookinfo.cat}}<span class="line">|</span>{{bookinfo.wordCount|num()}}万字</p>
		<p>最近更新：<span>{{bookinfo.updated|time()}}</span></p>
	</div>
</div>
<div class=" local clear" >
	<span @click="addid(bookinfo._id)" v-text="key?'加入收藏':'取消收藏'" :class="key?'red':'grey'"></span>
	<router-link :to="'/content/'+bookinfo._id+'/'+morenid+'/'+1" tag="span">开始阅读</router-link>
</div>
<ul class="precent clear">
	<li>
		<p>人气</p>
		<p>{{bookinfo.latelyFollower}}</p>
	</li>
	<li>
		<p>读者留存率</p>
		<p>{{bookinfo.retentionRatio}}%</p>
	</li>
	<li>
		<p>日更</p>
		<p>{{bookinfo.serializeWordCount}}</p>
	</li>
</ul>
<div class="longIntro">
	<p>{{bookinfo.longIntro}}<i class="fa fa-angle-down" @click="s($event,0)"></i></p>
</div>
<div class="Chapter clear">
	<span>目录</span>
	<router-link :to="'/chapter/'+bookinfo._id" tag="span">{{bookinfo.lastChapter}}</router-link>
</div>
<div class="hot">
	<h3 class="fixed_margin">热门书评
	<router-link tag="span" :to="'/Review/'+bookinfo._id">
		<i class="fa fa-refresh"></i>加载更多</span>
		</router-link>
	</h3>	
	<ul v-if="review" class="fixed_margin show">
		<li v-for="v in review" class="clear">
			<img :src="'http://statics.zhuishushenqi.com'+v.author.avatar"/>
			<div>
				<h3>{{v.author.nickname}}</h3>
				<p class="title">{{v.title}}</p>
				<i>stars{{v.rating}}</i>
				<p id="title">{{v.content}}<i class="fa fa-angle-down" @click="s($event,1)"></i></p>
				<p class="time">时间:{{v.updated|time()}}</p>
			</div>
		</li>
	</ul>
	<ul v-else>没有评论</ul>
</div>
<recommandSwiper :ids="ids"></recommandSwiper>
</div>
</template>

<script>
	import api from "../../fetch/api.js"
	import Headercheck from "./Header_check"
	import recommandSwiper from "./recommandSwiper"
	import Load from "../Load"
	export default {
		components:{Headercheck,recommandSwiper,Load},
		data(){
			return{
				ids:"",
				bookinfo:"",
				key:[true,true],
				review:"",
				morenid:"",
				load:true,
				key:true
			}
		},
		methods:{
			da(){
			this.$store.commit('tig',false)
			this.ids=this.$route.params.id
			api.getBook(this.ids).then(data=>{
				this.bookinfo=data
				api.getReview(this.bookinfo._id,3).then(data=>{
					this.review=data
				})
				api.getChapters(this.bookinfo._id).then(data=>{
					this.morenid=data[0].id
				})
				this.load=false
				this.check(this.bookinfo._id)
			})
			},
			s(e,num){
				if(this.key[num]){
					e.currentTarget.style.transform="rotate(180deg)"
					e.currentTarget.parentElement.className="active"
				}else{
					e.currentTarget.style.transform="rotate(360deg)"
					e.currentTarget.parentElement.className=""
				}
				this.key[num]=!this.key[num]
			},
			addid(id){
				if(this.key){
					this.$store.commit("addids",id)
				}else{
					this.$store.commit("deleteids",id)
				}
				this.key=!this.key
			},
			check(ids){
				for(var i=0;i<this.$store.state.storeids.length;i++){
					if(this.$store.state.storeids[i]==ids){
						this.key=false
					}
				}
			}
		},
		mounted(){
			 this.da()
		},
		filters:{
			time(num){
			return 	new Date(num).toLocaleString()
			},
			num(a){
				a+0
				return a=(a/10000).toFixed(2)
			}
		},
		watch:{
			'$route.params.id'(){
				this.da()
			}
		}
	}
</script>

<style scoped>
.bookinfo{
	padding: 0.4rem 0;
}
.bookinfo .img{
	float: left;
}
.bookinfo img{
	width: 1.25rem;
}
.info{
	float: left;
	padding-left: 0.2rem;
}
.info h3{
	height:0.5rem;
    font-weight: 400;
    font-size: 0.32rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.author{
	font-size:0.24rem;
	color: #58a4b0;
	line-height: 0.4rem;
}
.info p{
	color: #999;
	line-height: 0.35rem;
}
.info .line{
	margin:0 0.15rem;
}
.local {
	width: 100%;
	padding: 0.3rem;
}
.local span{
	width: 48%;
	display:block;
	float: left;
    vertical-align: middle;
    height: 1rem;
    line-height:  1rem;
    background-color: #b93321;
    border-radius: 2px;
    text-align: center;
    color: #fff;
    font-size: 0.28rem;
}
.local .red{
	 background-color: #b93321;
}
.local .grey{
	 background-color: gray;
}
.local span:first-of-type{
	margin-right: 4%;
}
.precent{
	text-align: center;
	padding: 0.3rem 0;
    border-bottom: 1px solid #ebebeb;
    border-top: 1px solid #ebebeb;
    background: #fff;
}
.precent li{
	width: 33.33%;
	float: left;
}
.precent li p:last-of-type{
	color: #888;
	line-height: 0.6rem;
}
.longIntro{
	padding: 0.3rem;
	border-bottom: 1px solid #ebebeb;
}
.longIntro p, #title{
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
.longIntro p i, #title i{
	position: absolute;
	right: 0;
	bottom: 0;
	font-size: 0.32rem;
	transition: transform 0.8s;
}
.longIntro .active,.show .active{
	height: auto!important;
    overflow: auto!important;
    display: block!important;
}
.Chapter{
	font-size:0.28rem;
    padding: 0.4rem 0.3rem;
    border-bottom: 1px solid #ebebeb;
}
.Chapter span{
	display: block;
	line-height: 0.4rem;
}
.Chapter span:first-of-type{
	width: 20%;
	float: left;
}
.Chapter span:last-of-type{
	width: 80%;
	float: left;
	color: #888;
	text-align: right;
	text-overflow: ellipsis;
	overflow: hidden;
}
.hot h3{
	line-height: 0.6rem;
	font-size: 0.28rem;
	font-weight: normal;
}
.hot h3 span{
	float: right;
	color: #888;
}
.hot h3 span i{
	margin-right: 0.06rem;
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
#title{
	color: #888;
	line-height: 0.4rem;
	font-size: 0.24rem;
}
</style>

