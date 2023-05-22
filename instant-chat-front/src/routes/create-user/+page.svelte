<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	import { socket } from '../../services/socket';
	import { isNew, roomCode } from '../room-store';
	import { nickname, password } from '../user-store';

	let isWaiting: boolean = false;

	function linkStart() {
		// console.log('linkStart', $nickname, $password);
		socket.connect();
		if ($isNew) {
			isWaiting = true;
			socket.emit('create', { nickname: $nickname, password: $password });
			console.log('emit create', $nickname, $password);

			socket.on('created', (code) => {
				isWaiting = false;
				console.log('on created', code);
				roomCode.update(() => code);
				goto('/chat-room');
			});
		} else {
			isWaiting = true;
		}
	}
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
			class="input px-3 py-2"
			type="text"
			placeholder="Digit your breathtaking nickname..."
		/>
	</label>

	<label class="input-group input-group-divider grid-cols-[auto_1fr_auto] text-lg">
		<span class="input-group-shim px-3 py-2">User Password</span>
		<input
			bind:value={$password}
			class="input px-3 py-2"
			type="password"
			placeholder="(Optional) Digit your super simple password..."
		/>
	</label>

	<button on:click={linkStart} class="btn variant-filled text-lg w-full">Create Instant User</button
	>
</div>
