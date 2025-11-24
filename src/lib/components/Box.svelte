<script lang="ts">
	interface Props {
		maxHeight?: number | undefined;
		className?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let { maxHeight = undefined, className = undefined, children }: Props = $props();
</script>

<div
	class="box"
	style:overflow-y={maxHeight ? 'scroll' : undefined}
	style:max-height="{maxHeight}px"
>
	{@render children?.()}
</div>

<style>
	.box {
		padding: 25px;
		border: 1px solid #999999;
		box-shadow: -4px -4px 0px 0px #efefef;
		overflow-y: scroll;
	}
</style>
