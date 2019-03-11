<template>
  <div id="app">
            <Header v-if="$store.state.foot_show"></Header>
			<router-view></router-view>
			<Footer v-if="$store.state.foot_show"></Footer>
  </div>
</template>
<script>
	import Footer from "@/components/Footer.vue"
	import Header from "@/components/header.vue"
	
export default {
  name: 'App',
  components:{Footer,Header},
  created() {
  }
}
</script>

<style>
    @import 'assets/public.css';
	@import url("../static/css/font-awesome.css");
	@import url("assets/animate.min.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	height: 100%;
	width: 100%;
}
.clear:after{
	content: "";
	display: block;
	clear: both;
}
.clear{
	overflow: hidden;
}

.router-link-exact-active{
	color: #ed424b;
}
.fixed_margin{
	margin:0 0.3rem;
	overflow: hidden;
}
</style>
