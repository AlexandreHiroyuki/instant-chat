<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Instant Chat | Home</title>
</svelte:head>

<LightSwitch class="ms-auto" />
<div class="w-full h-full pt-6 pb-28 flex flex-col justify-between items-center">
	<h1 class="text-center">⚡ Instant Chat</h1>

	<a href="/create-user" class="btn variant-filled rounded-full text-lg"
		>Create a new chat room instantly</a
	>

	<a href="/create-user" class="btn variant-filled rounded-full text-lg"
		>Join an existent chat room instantly</a
	>
</div>

<!-- <style lang="postcss">
</style> -->
