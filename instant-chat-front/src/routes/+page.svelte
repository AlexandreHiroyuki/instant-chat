<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	import api from '../services/api';
	import { isNew, roomCode } from './room-store';

	let roomCodeInput: string;
	let isCodeInputEnabled: boolean = true;

	function createRoom() {
		isNew.update(() => true);
		console.log('createRoom', $isNew);
		goto('/create-user');
	}

	function joinRoom() {
		isCodeInputEnabled = false;
		isNew.update(() => false);
		api
			.get(`/has-room`, { params: { code: roomCodeInput } })
			.then((res) => {
				isCodeInputEnabled = true;
				console.log('/has-room', res.status, res.data);

				if (res.data === true) {
					roomCode.update(() => roomCodeInput);
					goto('/create-user');
				}
			})
			.catch((err) => {
				isCodeInputEnabled = true;
				console.error('/has-room', err);
			});

		console.log('joinRoom', roomCodeInput, import.meta.env);
	}
</script>

<svelte:head>
	<title>Instant Chat | Home</title>
</svelte:head>

<LightSwitch class="ms-auto" />
<div class="w-full h-full pt-6 pb-28 flex flex-col justify-between items-center">
	<h1 class="text-center">⚡ Instant Chat</h1>

	<button
		on:click={createRoom}
		disabled={!isCodeInputEnabled}
		class="btn variant-filled rounded-container-token text-lg w-full relative"
	>
		{#if isCodeInputEnabled}
			<span class="absolute right-[-0.75%] top-[-10%] flex h-4 w-4">
				<span
					class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"
				/>
				<span class="relative inline-flex rounded-full h-4 w-4 bg-primary-500" />
			</span>
		{/if}
		Create a new chat room instantly
	</button>

	<div
		class="input-group input-group-divider grid-cols-[auto_1fr] text-lg rounded-container-token {!isCodeInputEnabled
			? 'animate-pulse'
			: ''}"
	>
		<button on:click={joinRoom} disabled={!isCodeInputEnabled} class="btn variant-filled"
			>Join the chat room now!</button
		>
		<input
			bind:value={roomCodeInput}
			disabled={!isCodeInputEnabled}
			class="input px-3 py-2"
			type="text"
			placeholder="Copy & Paste an instant chat room code here to join!"
		/>
	</div>
</div>
