<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	let copied = false;
	const shortUrl = $page.params.shortUrl;
	const fullUrl = `${window.location.origin}/${shortUrl}`;

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(fullUrl);
			copied = true;
			setTimeout(() => copied = false, 2000);
		} catch (e) {
			console.error('Error al copiar al portapapeles:', e);
		}
	}
</script>

<div>

</div>
