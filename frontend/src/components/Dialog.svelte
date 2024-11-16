<script>
	export let dialog
    let className = undefined
	export {className as class}
    import { cn } from "$lib/utils.js";
</script>
<dialog bind:this={dialog} on:close class={className}>
	<slot/>
</dialog>
