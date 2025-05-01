<script lang="ts">
	import Category from '$lib/components/Category.svelte';
	import type { FileTreeNode } from '$lib/types';

	export let node: FileTreeNode;
  export let depth: number = 0;
  export let parentPath: string = ""
</script>



{#if node.children.length > 0}
  <details open={depth === 0}>
    <summary>
      {#if node.file.mimeType === 'application/vnd.google-apps.folder'}
        <p>{node.cleanName}</p>
      {:else}
        <p><a href="{parentPath}/{node.slug}">{node.cleanName}</a></p>
      {/if}
    </summary>
    {#each node.children as child}
    <Category node={child} depth={depth + 1} parentPath={parentPath + "/" + node.slug} />
    {/each}
  </details>
{:else}
<p><a href="{parentPath}/{node.slug}">{node.cleanName}</a></p>
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