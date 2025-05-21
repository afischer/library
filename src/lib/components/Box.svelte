<script lang="ts">
	export let maxHeight: number | undefined = undefined;
</script>

<div
	class="box"
	style:overflow-y={maxHeight ? 'scroll' : undefined}
	style:max-height="{maxHeight}px"
>
	<slot />
</div>

<style>
	.box {
		padding: 25px;
		border: 1px solid #999999;
		box-shadow: -4px -4px 0px 0px #efefef;
		overflow-y: scroll;
	}
</style>
