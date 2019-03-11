<template>
<div class="footer">
	<div class="index_bottom">
		<ul class="clear">
			<router-link to="/"  tag="li" exact>
				<i class="fa fa-book fa-fw"></i>
				<p>书城</p>
			</router-link>
			<router-link to="/sorts" tag="li">
					<i class="fa fa-diamond"></i>
				<p>分类</p>
			</router-link>
			<router-link to="/ranks" tag="li">
					<i class="fa fa-signal"></i>
				<p>排行</p>
			</router-link>
			<router-link to="/mines" tag="li">
					<i class="fa fa-user-circle-o"></i>
				<p>我的</p>
			</router-link>
		</ul>
	</div>	
</div>
</template>

<script>
	
	export default {
		name: 'Footer',
	}
</script>

<style scoped>
.index_bottom{
	position: fixed;
	background: white;
	bottom: 0;
	width: 100%;
	height: 1rem;
	box-shadow: 0 -4px 5px -3px rgba(0,0,0,0.3);
	z-index: 99
}
.index_bottom ul{
	width: 100%;
	height: 100%;
}
.index_bottom li{
	width: 25%;
	height: 100%;
	float: left;
	text-align: center;
}
.index_bottom li i{
	display: block;
	height: 0.6rem;
	line-height:  0.6rem;
	width: 100%;
	font-size: 0.28rem;
	text-align: center;
}
</style>
