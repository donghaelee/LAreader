<template>
<div class="Swier">
  <!-- Swiper -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <router-link tag="div" :to="'/book/'+v.link" class="swiper-slide" v-for="(v,index) in swiperdata">
		  <img :src="v.img"/>
	  </router-link >
    </div>
     <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</div>
</template>

<script>
	import api from '../../fetch/api';
	import Swiper from 'swiper'

	export default {
		name: 'Swiper',
		data() {
			return {
				swiperdata:[],
			};
		},
		created() {	
		api.getSwiperPictures()
			.then(data => {
				this.swiperdata = data;
				this.swiperdata.splice(0,1)	
				this.$nextTick(function () {
					this.$emit('load');
				})
			})
		},
		updated(){
			 var swiper = new Swiper('.swiper-container', {
						 slidesPerView: 1,
						  spaceBetween: 30,
						  observer:true,//修改swiper自己或子元素时，自动初始化swiper
						  observeParents:true,//修改swiper的父元素时，自动初始化swiper
						  allowTouchMove:true,
						  loop:true,
						  autoplay:true,
						  pagination: {
							el: '.swiper-pagination',
							clickable: true,
						  }
			});
		}
	}
</script>

<style scoped>
	   .swiper-container {
      width: 100%;
      height:3rem;
      margin-left: auto;
      margin-right: auto;
    }
    .swiper-slide {
      text-align: center;
      font-size: 0.36rem;
      background: #fff;
	   width:100%;
	   height: 100%;

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
    }
	.swiper-slide  img{
		width: 100%;
		height:100%
	}
</style>

