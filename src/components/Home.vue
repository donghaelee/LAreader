<template>
<div class="Home">
	  <swiper  v-on:load="S()"/>
	  <Booklist/>
	  <Load v-if="load"></Load>
</div>
</template>

<script>
	import api from '../fetch/api';
	import swiper from "./children/Swiper.vue"
	import Load from "./Load"
    import Booklist from './children/home-booklist.vue';
	export default {
		name: 'Home',
		components:{swiper,Booklist,Load},
		data() {
			return {
		        load:true
			};
		},
		methods:{
			S(){
				this.load=false
			}
		}
		
	}

</script>

<style scoped>
	.Home{
		padding-bottom: 0.6rem;
	}
</style>
