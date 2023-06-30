<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import { autoModeWatcher } from '@skeletonlabs/skeleton';
</script>

<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>

<div class="h-screen w-screen flex justify-center items-center">
	<main class="p-4 w-4/5 h-4/5 lg:w-3/4 lg:h-3/4 lg:card lg:shadow-md">
		<slot />
	</main>
</div>
