<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';

	import { chatRoomStore } from './room-store';

	const chatRoomUnsubscribe = chatRoomStore.subscribe((store) => {
		console.log(store);
	});

	const createRoom = () => {
		const newCode: string = String(Math.floor(Math.random() * 1000000));

		chatRoomStore.set({
			...$chatRoomStore,
			code: newCode
		});
	};
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

	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] text-lg rounded-full">
		<button class="variant-filled-secondary">Join the chat room now!</button>
		<input
			class="input px-3 py-2"
			type="text"
			placeholder="Copy & Paste an instant chat room code here to join!"
		/>
	</div>
</div>

<!-- <style lang="postcss">
</style> -->
