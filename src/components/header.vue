<template>
<ul class="header">
	<li class="text_left w-10" @click="$router.back()"><i class="fa fa-chevron-left" aria-hidden="true"></i></li>
	<li class="text_center w-80">{{$route.params.major?$route.params.major:$route.name}}</li>
	<router-link tag="li" to="/search" class="text_right w-10" ><i class="fa fa-search" aria-hidden="true"></i></router-link>
</ul>
</template>

<script>
	export default {
		name: '',
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
	height: 100%;
	float: left;
	line-height: 1rem;
	font-size: 0.28rem;
}
.w-10{
	width: 10%;
}
.w-80{
	width: 80%;
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
