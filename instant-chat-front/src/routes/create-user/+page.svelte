<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Instant Chat | Create Instant User</title>
</svelte:head>

<LightSwitch class="ms-auto" />
<div class="w-full h-full pt-6 pb-28 flex flex-col justify-between items-center">
	<h1 class="text-center">⚡ Instant Chat</h1>

	<label
		class="input-group input-group-divider grid-cols-[auto_1fr_auto] text-lg rounded-container-token"
	>
		<span class="input-group-shim px-3 py-2">User Nickname</span>
		<input class="input px-3 py-2" type="text" placeholder="Digit your breathtaking nickname..." />
	</label>

	<label
		class="input-group input-group-divider grid-cols-[auto_1fr_auto] text-lg rounded-container-token"
	>
		<span class="input-group-shim px-3 py-2">User Password</span>
		<input
			class="input px-3 py-2"
			type="password"
			placeholder="Digit your super simple password..."
		/>
	</label>

	<a href="/chat-room" class="btn variant-filled rounded-container-token text-lg w-full"
		>Create Instant User</a
	>
</div>
