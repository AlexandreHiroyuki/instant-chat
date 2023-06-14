<script lang="ts">
	import { LightSwitch, Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount } from 'svelte';

	import { socket } from '../../services/socket';
	import { isNew, roomCode, users } from '../room-store';
	import { nickname } from '../user-store';
	import codeModal from './code-modal.svelte';

	let currentMessage = '';

	const codeModalComponent: ModalComponent = {
		ref: codeModal,
		props: {
			code: $roomCode
		}
	};

	const codeModalSettings: ModalSettings = {
		type: 'component',
		component: codeModalComponent
	};

	onMount(() => {
		if ($isNew) {
			modalStore.trigger(codeModalSettings);
		}
	});

	socket.on('other-joined', (nickname) => {
		users.add(nickname);
		console.log('other-joined', nickname);
	});
	socket.on('other-disconnected', (nickname) => {
		users.remove(nickname);
		console.log('other-disconnected', nickname);
	});

	onDestroy(() => {
		socket.disconnect();
		socket.off('other-joined');
		socket.off('other-disconnected');
	});
</script>

<svelte:head>
	<title>Instant Chat | Chat Room</title>
</svelte:head>

<div class="grid grid-cols-[1fr_auto] h-full w-full">
	<div class="flex flex-col-reverse h-full">
		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<!-- <button class="input-group-shim">+</button> -->
			<textarea
				bind:value={currentMessage}
				class="resize-none bg-transparent border-0 ring-0 px-3 py-2"
				name="prompt"
				id="prompt"
				placeholder="Digit your impactful message..."
				rows="1"
			/>
			<button class="btn variant-filled-primary rounded-none">Send</button>
		</div>
	</div>

	<aside
		class="grid grid-rows-[auto_1fr_auto] divide-solid border-primary-300 dark:border-primary-500 border-l ml-4 pl-4"
	>
		<LightSwitch class="ms-auto" />
		<div class="">
			<h5>Member List:</h5>
			<ul>
				<li>
					{$nickname} <i class="text-primary-500 dark:text-primary-300">(Me)</i>
				</li>
				{#each $users as user}
					<li>{user}</li>
				{/each}
			</ul>
		</div>
		<button on:click={() => modalStore.trigger(codeModalSettings)} class="btn variant-ghost-primary"
			>Show Room Code</button
		>
	</aside>
</div>
<Modal />
