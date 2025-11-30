<script lang="ts">
	import { page } from '$app/state';
	import { navbarMenu } from './navbar-menu';
	import NavbarListener from './navbar-listener.svelte';

	let currentPath = $derived(page.url.pathname);

	const isActive = (href: string, currentPath: string) => {
		if (currentPath === href) return true;
		if (href !== '/' && currentPath.startsWith(href + '/')) return true;
		return false;
	};

	const getHighlightedParts = (title: string, key: string) => {
		if (!title || !key || key.length !== 1) return { before: title, highlighted: null, after: null };

		const index = title.toLowerCase().indexOf(key.toLowerCase());

		if (index === -1) return { before: title, highlighted: null, after: null };

		return {
			before: title.substring(0, index),
			highlighted: title.substring(index, index + 1),
			after: title.substring(index + 1)
		};
	};
</script>

<NavbarListener />

<nav class="overflow-x-auto text-sm select-none md:text-base lg:px-4 lg:py-3">
	<!-- 1 BARIS: kiri = menu, kanan = X / Pumpfun / Elosyn -->
	<div
		class="flex items-center justify-between gap-4 overflow-x-auto px-2 py-3 leading-none lg:px-0 lg:py-0"
	>
		<!-- MENU KIRI -->
		<ul class="flex items-center">
			{#each navbarMenu as { title, href, key }, i (i)}
				{@const parts = getHighlightedParts(title, key)}
				{@const isOnCurrentPath = isActive(href, currentPath)}

				<li class="shrink-0">
					<a
						{href}
						data-sveltekit-preload-code="eager"
						data-sveltekit-preload-data
						class={`text-ash-300 flex items-center px-2 py-0.5 leading-none transition-all ${
							isOnCurrentPath ? 'bg-ash-300 text-ash-800' : ''
						}`}
						aria-label={`${title} (Shortcut: ${key})`}
					>
						{parts.before}
						{#if parts.highlighted}
							<span
								class={`${isOnCurrentPath ? 'text-ash-800' : 'text-ash-100'} transition-all`}
							>
								{parts.highlighted}
							</span>
						{/if}
						{parts.after}
					</a>
				</li>
			{/each}
		</ul>

<!-- MENU KANAN: X, Pumpfun -->
<div class="flex items-center gap-2 whitespace-nowrap">
	<a
		class="bg-ash-300 shrink-0 px-2 py-0.5 leading-none text-black"
		href="https://x.com/USERNAME_ANDA"
		target="_blank"
		rel="noreferrer"
		data-umami-event="social-link"
		data-umami-event-platform="twitter"
	>
		𝕏
	</a>

	<a
		class="bg-ash-300 shrink-0 px-2 py-0.5 leading-none text-black"
		href="https://pump.fun/"
		target="_blank"
		rel="noreferrer"
		data-umami-event="social-link"
		data-umami-event-platform="pumpfun"
	>
		Pumpfun
	</a>
</div>

</nav>
