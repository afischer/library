<script lang="ts">
	import Category from '$lib/components/Category.svelte';
import type { FileNode } from '$lib/server/drive';

	export let node: FileNode;
  export let depth: number = 0;
</script>



{#if node.children.length > 0}
  <details open={depth === 0}>
    <summary>
      <p><a href="/{node.file.id}">{node.file.name}</a></p>
    </summary>
    {#each node.children as child}
    <Category node={child} depth={depth + 1} />
    {/each}
  </details>
{:else}
<p><a href="/{node.file.id}">{node.file.name}</a></p>
{/if}


<style>
  details {
    border-left: 1px solid #ccc;
    padding-left: 1rem;
    margin: 0
  }

  p {
    border-left: 1px solid #ccc;
    margin: 0;
    padding-left: 1.9rem;
  }


  details summary p {
    border: none;
    padding-left: 0;
    display: inline-block;
  }
</style>