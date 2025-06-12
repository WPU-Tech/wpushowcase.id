<script lang="ts">
	import { onMount } from 'svelte';
	import Cta from '$components/cta.svelte';
	import Footer from '$components/footer.svelte';

	let { children } = $props();

	let mainSection = $state<HTMLElement>();

	function adjustMargin() {
		const footer = document.querySelector<HTMLElement>('#footer');
		const CTA = document.querySelector<HTMLElement>('#cta');
		if (mainSection) {
			const footerHeight = footer?.offsetHeight || 0;
			const ctaHeight = CTA?.offsetHeight || 0;
			mainSection.style.marginBottom = `${footerHeight + ctaHeight}px`;
		}
	}

	onMount(() => {
		adjustMargin();
		window.addEventListener('resize', adjustMargin);
	});
</script>

<div class="relative z-10 bg-white shadow-2xl shadow-black/10" bind:this={mainSection}>
	{@render children()}
	<Cta />
</div>
<Footer />
