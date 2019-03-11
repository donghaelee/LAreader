<template>
<ul class="header">
	<li class="text_left" @click="$router.back();$store.commit('tig',true)"><i class="fa fa-chevron-left" aria-hidden="true"></i></li>
	<li class="text_center">{{$route.name}}</li>
	<li  class="text_right" @click="$router.push('/');$store.commit('tig',true)"><i class="fa fa-home"></i></i></li>
</ul>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.header{
	height: 1rem;
	width: 100%;
	position: fixed;
	top:0;
	background:#c84635;
	color: white;
	z-index: 99
}
.header li{
	width: 33.33%;
	height: 100%;
	float: left;
	line-height: 1rem;
	font-size: 0.28rem;
}
.header li i{
	font-size: 0.32rem;
}
.text_left{
	text-align: left;
	padding-left:0.2rem;
}
.text_center{
	text-align: center;
}
.text_right{
	text-align: right;
	padding-right:0.2rem;
}
</style>
