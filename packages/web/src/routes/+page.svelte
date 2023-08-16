<script lang="ts">
  import { LightSwitch } from '@skeletonlabs/skeleton'
  import { goto } from '$app/navigation'

  import api from '../services/api'
  import { isNew, roomCode } from './room-store'

  let roomCodeInput: string
  let isCodeInputEnabled: boolean = true

  function createRoom() {
    isNew.update(() => true)
    console.log('createRoom', $isNew)
    goto('/create-user')
  }

  function joinRoom() {
    isCodeInputEnabled = false
    isNew.update(() => false)
    console.log('joinRoom', roomCodeInput)

    api
      .get(`/has-room`, { params: { code: roomCodeInput } })
      .then(res => {
        isCodeInputEnabled = true
        console.log('/has-room', res.status, res.data)

        if (res.data === true) {
          roomCode.update(() => roomCodeInput)
          goto('/create-user')
        }
      })
      .catch(err => {
        isCodeInputEnabled = true
        console.error('/has-room', err)
      })
  }
</script>

<svelte:head>
  <title>Instant Chat | Home</title>
</svelte:head>

<LightSwitch class="ms-auto" />
<div
  class="w-full h-full pt-6 pb-28 flex flex-col justify-between items-center"
>
  <h1 class="text-center">⚡ Instant Chat</h1>

  <button
    on:click={createRoom}
    disabled={!isCodeInputEnabled}
    class="btn variant-filled text-lg w-full relative"
  >
    {#if isCodeInputEnabled}
      <span class="absolute right-[-0.75%] top-[-10%] flex h-4">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"
        />
        <span
          class="relative inline-flex rounded-full h-4 w-10 bg-primary-500 text-xs justify-center items-center text-white"
        >
          Now!
        </span>
      </span>
    {/if}
    Create a new chat room instantly
  </button>

  <div
    class="input-group input-group-divider grid-cols-[auto_1fr] text-lg {!isCodeInputEnabled
      ? 'animate-pulse'
      : ''}"
  >
    <button
      on:click={joinRoom}
      disabled={!isCodeInputEnabled}
      class="btn variant-filled rounded-none"
    >
      Join the chat room now!</button
    >
    <input
      bind:value={roomCodeInput}
      disabled={!isCodeInputEnabled}
      class="input px-3 py-2 rounded-none"
      type="text"
      placeholder="Copy & Paste an instant chat room code here to join!"
    />
  </div>
</div>
