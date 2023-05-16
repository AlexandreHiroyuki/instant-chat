<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';

	import roomStore from './room-store';

	// const chatRoomUnsubscribe = room.subscribe((store) => {
	// 	console.log(store);
	// });
</script>

<svelte:head>
	<title>Instant Chat | Home</title>
</svelte:head>

<LightSwitch class="ms-auto" />
<div class="w-full h-full pt-6 pb-28 flex flex-col justify-between items-center">
	<h1 class="text-center">⚡ Instant Chat</h1>

	<a href="/create-user" class="btn variant-filled rounded-container-token text-lg w-full"
		>Create a new chat room instantly</a
	>

	<div class="input-group input-group-divider grid-cols-[auto_1fr] text-lg rounded-container-token">
		<button class="btn variant-filled">Join the chat room now!</button>
		<input
			class="input px-3 py-2"
			type="text"
			placeholder="Copy & Paste an instant chat room code here to join!"
		/>
	</div>
</div>

<!-- <style lang="postcss">
</style> -->
