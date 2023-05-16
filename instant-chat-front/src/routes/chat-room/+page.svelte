<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';

	let currentMessage = '';
</script>

<svelte:head>
	<title>Instant Chat | Chat Room</title>
</svelte:head>

<div class="grid grid-cols-[1fr_auto] h-full w-full">
	<div class="flex flex-col-reverse h-full">
		<div class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-token">
			<!-- <button class="input-group-shim">+</button> -->
			<textarea
				bind:value={currentMessage}
				class="bg-transparent border-0 ring-0 px-3 py-2"
				name="prompt"
				id="prompt"
				placeholder="Digit your impactful message..."
				rows="1"
			/>
			<button class="btn variant-filled-primary">Send</button>
		</div>
	</div>

	<aside class="grid grid-rows-[auto_1fr_auto] divide-solid border-primary-300 border-l ml-4 pl-4">
		<LightSwitch class="ms-auto" />
		<div class="">list</div>
		<button class="btn variant-ghost-primary">Show Room Code</button>
	</aside>
</div>
