<script lang="ts">
	import { onMount } from 'svelte';

	let randomVids = $state<{ src: string; position: string }>();

	onMount(() => {
		const videos = [
			{ src: '/banner/ayaka.mp4', position: 'object-[100%_30%]' },
			{ src: '/banner/dota-2.mp4', position: 'object-[100%_20%]' },
			{ src: '/banner/feixiao.mp4', position: 'object-[100%_20%]' },
			{ src: '/banner/hoshimi-miyabi.mp4', position: 'object-[100%_20%]' },
			{ src: '/banner/jinwoo.mp4', position: 'object-[100%_40%]' },
			{ src: '/banner/jinx.mp4', position: 'object-[100%_10%]' },
			{ src: '/banner/link-click.mp4', position: 'object-[100%_45%]' },
			{ src: '/banner/lynette.mp4', position: 'object-[100%_30%]' },
			{ src: '/banner/minecraft.mp4', position: 'object-[100%_30%]' },
			{ src: '/banner/sumeru.mp4', position: 'object-[100%_30%]' },
			{ src: '/banner/valorant.mp4', position: 'object-[100%_30%]' },
			{ src: '/banner/hok.mp4', position: 'object-[100%_30%]' }
		];

		randomVids = videos[Math.floor(Math.random() * videos.length)];
	});
</script>

<div class="relative h-90 overflow-hidden">
	<video
		class="absolute size-full object-cover {randomVids?.position}"
		src={randomVids?.src}
		loop
		autoplay
		muted
		playsinline
		preload="none"
	></video>
	<div class="absolute h-full w-full bg-gradient-to-b from-transparent to-white"></div>
	<div
		class="absolute bottom-0 left-0 size-100 -translate-x-1/2 translate-y-1/2 rounded-full bg-white blur-3xl"
	></div>
	<div
		class="absolute right-0 bottom-0 size-100 translate-1/2 rounded-full bg-white blur-3xl"
	></div>
</div>
