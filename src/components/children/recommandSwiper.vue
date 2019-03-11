<template>
<div class="recom" >
		<h3 class="fixed_margin">你可能感兴趣的：</h3>
	  <div class="swiper-container">
		<div class="swiper-wrapper">
		  <router-link :to="'/book/'+v._id" class="swiper-slide" v-for="(v,k) in swiperdata" tag="div" :key="k">
			  <div><img :src="v.cover?decodeURIComponent(v.cover.replace('/agent/','')):''"  /></div>
			  <div><p>{{v.title}}</p></div>
		  </router-link>
		</div>
	  </div>
</div>
</template>

<script>
	import api from "../../fetch/api.js"
	import Swiper from 'swiper'
	export default {
		props:["ids"],
		data() {
			return {
				swiperdata:""
			};
		},
		mounted(){
			api.getRecommend(this.ids).then(data=>{
				this.swiperdata=data
			})
		},
		updated(){
			var swiper = new Swiper('.swiper-container', {
			  slidesPerView:3,
			  spaceBetween: 30,
			  slidesPerGroup: 3,
			  observer:true,//修改swiper自己或子元素时，自动初始化swiper
			  observeParents:true,//修改swiper的父元素时，自动初始化swiper			  
			  loop: true,
			  autoplay:true,
			  loopFillGroupWithBlank: true
			});			
		}
	}
</script>

<style scoped>
	.recom{
		background: #F5F5F5;
	}
    .swiper-container {
      width: 100%;
      height:3rem;
    }
    .swiper-slide {
      text-align: center;
      font-size: 0.28rem;
	   width: 100%;
	  height: 2.4rem;
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
	  flex-wrap: wrap;
    }
	.swiper-slide div{
		width: 100%;
	}
	.swiper-slide img{
		width: 1.25rem;
		height: 1.6rem;
	}
	.swiper-slide p{
		font-size: 0.24rem;
		padding: 0 0.1rem;
		line-height: 0.4rem;
		color: #666;
	}
	.recom h3{
		font-size:0.24rem;
		font-weight: 400;
		line-height: 0.8rem;
	}
</style>
