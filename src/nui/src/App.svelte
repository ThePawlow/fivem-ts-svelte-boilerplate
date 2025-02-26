<script>
  import { onMount } from "svelte";

  let isVisible = false;

  // Listen for messages from the client
  onMount(() => {
    window.addEventListener("message", (event) => {
      if (event.data.event === "showUI") {
        isVisible = event.data.show;
      }
    });
  });

  function closeUI() {
    // Send event back to FiveM client
    // https://docs.fivem.net/docs/scripting-manual/nui-development/nui-callbacks/
    fetch(`https://learn/NUIControllerCloseUI`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  }
</script>

{#if isVisible}
  <div class="nui-container">
    <h1>Welcome to the FiveM NUI</h1>
    <button on:click={closeUI}>Close</button>
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
