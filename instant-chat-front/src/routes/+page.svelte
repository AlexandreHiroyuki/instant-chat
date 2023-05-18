<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import api from '../services/api';

	import { isNew } from './room-store';

	let roomCodeInput: string;

	function createRoom() {
		isNew.update(() => true);
		console.log('createRoom', $isNew);
	}

	function joinRoom() {
		isNew.update(() => false);
		api.get(`/has-room`, { params: { code: roomCodeInput } }).then((res) => {
			console.log(res);
		});
		// console.log('joinRoom', roomCodeInput, import.meta.env);
	}
</script>

<svelte:head>
	<title>Instant Chat | Home</title>
</svelte:head>

<LightSwitch class="ms-auto" />
<div class="w-full h-full pt-6 pb-28 flex flex-col justify-between items-center">
	<h1 class="text-center">⚡ Instant Chat</h1>

	<a
		href="/create-user"
		on:click={createRoom}
		class="btn variant-filled rounded-container-token text-lg w-full"
		>Create a new chat room instantly</a
	>

	<div class="input-group input-group-divider grid-cols-[auto_1fr] text-lg rounded-container-token">
		<button on:click={joinRoom} class="btn variant-filled">Join the chat room now!</button>
		<input
			bind:value={roomCodeInput}
			class="input px-3 py-2"
			type="text"
			placeholder="Copy & Paste an instant chat room code here to join!"
		/>
	</div>
</div>

<!-- <style lang="postcss">
</style> -->
