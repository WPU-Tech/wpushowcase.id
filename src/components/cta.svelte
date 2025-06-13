<script lang="ts">
	import ButtonLink from './button-link.svelte';
</script>

<div class="container translate-y-1/2" id="cta">
	<div class="grid items-end gap-10 rounded-2xl bg-zinc-800 p-6 sm:p-12 md:p-24 lg:grid-cols-2">
		<h2 class="text-4xl text-white sm:text-5xl">
			Gabung dan Bangun Sesuatu Bersama Komunitas Developer Kami!
		</h2>
		<div class="flex flex-col items-start gap-6">
			<p class="text-xl text-zinc-300">
				Terhubung dengan developer yang sepemikiran, berbagi pengetahuan, dan kembangkan
				kemampuanmu bersama WPU.
			</p>
			<ButtonLink href="https://discord.gg/wpu" target="_blank" intent="dark">
				Gabung Sekarang
			</ButtonLink>
		</div>
	</div>
</div>
