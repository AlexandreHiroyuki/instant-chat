<script lang="ts">
  import { Toast, toastStore } from '@skeletonlabs/skeleton'
  import type { ToastSettings } from '@skeletonlabs/skeleton'
  import { clipboard } from '@skeletonlabs/skeleton'

  export let parent: any
  export let code: string

  const clipboardFeedback: ToastSettings = {
    message: 'Room code copied to clipboard!',
    background: 'variant-filled-success'
  }
</script>

<div class="card w-1/2 p-4 lg:p-8 shadow-md">
  <h2 class="mb-8">Room Code</h2>

  <div
    use:clipboard={code}
    on:click={() => toastStore.trigger(clipboardFeedback)}
    on:keydown={() => toastStore.trigger(clipboardFeedback)}
    class="input-group input-group-divider grid-cols-[auto_1fr] text-lg"
  >
    <button class="btn px-3 py-2">Click to copy the room code</button>
    <div class="input px-3 py-2 border-y-0 border-r-0">{code}</div>
    {#if false}<slot />{/if}
  </div>
</div>
<Toast />
