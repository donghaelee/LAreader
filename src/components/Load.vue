<template>
<section class="page-loading" :style="styleObject">
	<img class="loading" src="../assets/loading.gif">
</section>
</template>

<script>
export default {
	name: 'pageLoading',
	props: {
		option: Object
	},
	data() {
		return {
			styleObject: {
				'top': '1rem',
				'bottom': '1.2rem'
			}
		}
	},
	created() {
		if (this.option && this.option.top) {
			this.styleObject.top = this.option.top;
		}
		if (this.option && this.option.bottom) {
			this.styleObject.bottom = this.option.bottom;
		}
	}
}
</script>

<style scoped>
.page-loading {
    position: fixed;
    top: 1.2rem;
    left: 0;
    right: 0;
    bottom: 1.2rem;
    z-index: 99999;
    background-color: #fff;

}
 .loading {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-100%);
        width: 20%;
    }
</style>
