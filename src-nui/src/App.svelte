<script lang="ts">
  import { onMount } from 'svelte';
  import { NUIController } from './NUIController';
  let isVisible = $state(false);

  // Listen for messages from the client
  NUIController.on<boolean>(
    'showUI',
    (show) => {
      isVisible = show;
    },
    [{ data: true, delay: 500 }],
  );
  function closeUI() {
    NUIController.emit('NUIControllerCloseUI', { success: true });
  }
</script>

{#if isVisible}
  <div class="nui-container">
    <h1>Welcome to the FiveM NUI</h1>
    <button onclick={closeUI}>Close</button>
  </div>
{/if}

<style>
  .nui-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 10px;
    color: white;
  }
</style>
