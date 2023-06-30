<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	import { socket } from '../../services/socket';
	import { isNew, roomCode, users, messageHistory } from '../room-store';
	import type { Message } from '../chat';
	import { nickname } from '../user-store';
	import { onDestroy } from 'svelte';

	let isWaiting: boolean = false;
	let invalidNickname: boolean = false;

	const invalidFeedback: ToastSettings = {
		message: 'Invalid nickname!',
		background: 'variant-filled-error'
	};

	socket.on('created', (code) => {
		isWaiting = false;
		console.log('on created', code);
		roomCode.update(() => code);
		goto('/chat-room');
	});
	socket.on('joined', (usersList, messages) => {
		isWaiting = false;
		invalidNickname = false;

		usersList.forEach((user: string) => {
			users.add(user);
		});
		messages.forEach((message: Message) => {
			messageHistory.add(message);
		});

		console.log('[on joined]', usersList);
		goto('/chat-room');
	});
	socket.on('invalid-nickname', () => {
		isWaiting = false;
		invalidNickname = true;
		toastStore.trigger(invalidFeedback);
		console.log('[on invalid-nickname]');
	});

	function linkStart() {
		socket.connect();
		if ($isNew) {
			isWaiting = true;
			socket.emit('create', { nickname: $nickname });
			console.log('[emit create]', $nickname);
		} else {
			isWaiting = true;
			socket.emit('join', $roomCode, { nickname: $nickname });
			console.log('[emit join]', $roomCode, { nickname: $nickname });
		}
	}

	onDestroy(() => {
		socket.off('created');
		socket.off('joined');
		socket.off('invalid-nickname');
	});
</script>

<svelte:head>
	<title>Instant Chat | Create Instant User</title>
</svelte:head>

<LightSwitch class="ms-auto" />
<div class="w-full h-full pt-6 pb-28 flex flex-col justify-between items-center">
	<h1 class="text-center">⚡ Instant Chat</h1>

	<label class="input-group input-group-divider grid-cols-[auto_1fr_auto] text-lg">
		<span class="input-group-shim px-3 py-2">User Nickname*</span>
		<input
			bind:value={$nickname}
			class="input px-3 py-2 {invalidNickname ? 'variant-ghost-error' : ''}"
			type="text"
			placeholder="Digit your breathtaking nickname..."
		/>
	</label>

	<button on:click={linkStart} class="btn variant-filled text-lg w-full">Create Instant User</button
	>
</div>

<div class="card p-4 w-72 shadow-xl variant-filled-error" data-popup="popupInvalid">
	<div><p>Invalid nickname!</p></div>
	<div class="arrow variant-filled-error" />
</div>
<Toast />
