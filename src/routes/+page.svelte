<script lang="ts">
	import { createShortUrl } from '$lib/services/urlService';
	import { getRemainingUses } from '$lib/services/cookieService';
	import { onMount } from 'svelte';
	
	let url = '';
	let error = '';
	let loading = false;
	let shortUrl = '';
	let copied = false;
	let remainingUses = 3;

	onMount(() => {
		remainingUses = getRemainingUses();
	});

	async function handleSubmit() {
		if (!url) {
			error = 'Por favor, introduce una URL';
			return;
		}

		try {
			loading = true;
			error = '';
			shortUrl = await createShortUrl(url);
			remainingUses = getRemainingUses();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Error al acortar la URL';
			console.error(e);
		} finally {
			loading = false;
		}
	}

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
	<h1 class="main-title">HTTPShort</h1>
	<p class="description">
		Acorta tus enlaces largos de forma rápida y sencilla
	</p>

	<div class="info-card">
		<p>⚠️ Importante:</p>
		<ul>
			<li>Las URLs acortadas expirarán después de 24 horas</li>
			<li>Cada usuario puede crear hasta 3 URLs por día</li>
		</ul>
	</div>

	<div class="card">
		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-group">
				<input
					type="url"
					bind:value={url}
					placeholder="https://ejemplo.com"
					disabled={loading || remainingUses === 0}
				/>
				{#if error}
					<p class="error-message">{error}</p>
				{/if}
			</div>
			<button type="submit" disabled={loading || remainingUses === 0}>
				{#if loading}
					Acortando...
				{:else if remainingUses === 0}
					Límite alcanzado
				{:else}
					Acortar URL
				{/if}
			</button>
		</form>
	</div>

	{#if shortUrl}
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
	{/if}
</div>
