<template>
	<view></view>
</template>
<script>
	export default {
	
		onShow() {
			uni.scanCode({
				onlyFromCamera: false,
				success: (res) => {
					let result = res.result
					uni.navigateTo({
						url: result
					})
				},
				fail: () => {
					uni.switchTab({
						url: '../index/index'
					});
				}
			});
		}

	}
</script>

<style lang="scss">

</style>
