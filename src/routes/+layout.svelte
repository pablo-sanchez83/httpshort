<script lang="ts">
	import { onMount } from 'svelte';
	import '../../static/app.css';

	let theme = 'light';

	onMount(() => {
		// Cargar tema guardado o usar preferencias del sistema
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		
		theme = savedTheme || (prefersDark ? 'dark' : 'light');
		document.documentElement.setAttribute('data-theme', theme);
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/static/app.css" />
</svelte:head>

<button class="theme-toggle" on:click={toggleTheme}>
	{#if theme === 'light'}
		🌙
	{:else}
		☀️
	{/if}
</button>

<slot /> 