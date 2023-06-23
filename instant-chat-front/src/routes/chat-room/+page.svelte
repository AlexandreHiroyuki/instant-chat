<script lang="ts">
	import { LightSwitch, Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount } from 'svelte';

	import { socket } from '../../services/socket';
	import { isNew, roomCode, users, messageHistory } from '../room-store';
	import { nickname } from '../user-store';
	import codeModal from './code-modal.svelte';

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

	socket.on('other-joined', (nickname) => {
		users.add(nickname);
		console.log('[other-joined]', nickname);
	});
	socket.on('other-disconnected', (nickname) => {
		users.remove(nickname);
		console.log('[other-disconnected]', nickname);
	});

	socket.on('receive-message', (message) => {
		console.log('[receive-message]', message);
		messageHistory.add(message);
	});

	let messageInput = '';

	const sendMessage = () => {
		if (messageInput.trim() === '') return;
		messageHistory.add({
			nickname: $nickname,
			message: messageInput,
			timestamp: new Date().getTime()
		});
		socket.emit('send-message', messageInput);
		messageInput = '';
	};

	onMount(() => {
		if ($isNew) {
			modalStore.trigger(codeModalSettings);
		}
	});

	onDestroy(() => {
		socket.off('other-joined');
		socket.off('other-disconnected');
		socket.disconnect();
	});
</script>

<svelte:head>
	<title>Instant Chat | Chat Room</title>
</svelte:head>

<div class="grid grid-cols-[1fr_auto] h-full w-full">
	<div class="flex flex-col h-full">
		<section class="w-full h-full p-4 overflow-y-auto space-y-4">
			{#if $messageHistory}
				{#each $messageHistory as bubble}
					{#if bubble.nickname === $nickname}
						<div class="grid grid-cols-[auto] gap-2 mr-3">
							<div class="card p-4 variant-soft rounded-tl-none space-y-2">
								<header class="flex justify-between items-center">
									<p class="font-bold">
										{bubble.nickname} <i class="text-primary-500 dark:text-primary-300">(Me)</i>
									</p>
									<small class="opacity-50">{bubble.timestamp}</small>
								</header>
								<p>{bubble.message}</p>
							</div>
						</div>
					{:else}
						<div class="grid grid-cols-[auto] gap-2 ml-3">
							<div class="card p-4 rounded-tr-none space-y-2 variant-soft-secondary">
								<header class="flex justify-between items-center">
									<p class="font-bold">{bubble.nickname}</p>
									<small class="opacity-50">{bubble.timestamp}</small>
								</header>
								<p>{bubble.message}</p>
							</div>
						</div>
					{/if}
				{/each}
			{/if}
		</section>

		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<!-- <button class="input-group-shim">+</button> -->
			<textarea
				bind:value={messageInput}
				class="resize-none bg-transparent border-0 ring-0 outline-none px-3 py-2"
				name="prompt"
				id="prompt"
				placeholder="Digit your impactful message..."
				rows="1"
			/>
			<button on:click={sendMessage} class="btn variant-filled-primary rounded-none">Send</button>
		</div>
	</div>

	<aside
		class="grid grid-rows-[auto_1fr_auto] divide-solid border-primary-300 dark:border-primary-500 border-l ml-4 pl-4"
	>
		<LightSwitch class="ms-auto" />
		<div>
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
