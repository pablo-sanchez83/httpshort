<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let shortUrl = '';
  let copied = false;

  onMount(() => {
    // Aquí obtendremos el shortUrl de los parámetros de la URL
    shortUrl = $page.params.shortUrl || '';
  });

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  }
</script>

<div class="container">
  <div class="card">
    <div class="short-url-container">
      <h2>Tu enlace acortado:</h2>
      <p class="short-url">{shortUrl}</p>
      <button class="copy-button" on:click={copyToClipboard}>
        {#if copied}
          ¡Copiado!
        {:else}
          Copiar enlace
        {/if}
      </button>
    </div>
  </div>

  <div class="card">
    <h3>¿Quieres acortar otro enlace?</h3>
    <a href="/" class="button">Volver al inicio</a>
  </div>
</div> 