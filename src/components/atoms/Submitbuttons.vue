<template>
	<div class="submit-button">
    <b-button block
			type="submit"
			name="submit"
			:variant="colo
			@click="$emit('push-submit-button')"
			><slot></slot>
		</b-button>
	</div>
</template>

<script>
export default {
	name: 'SubmitButtons',
	props: {
		color: {
			type: String,
			require: false,
			default: 'primary',
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/atoms/_submit-buttons';
</style>
