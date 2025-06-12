<script lang="ts">
	import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
	import X from 'phosphor-svelte/lib/X';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import Question from 'phosphor-svelte/lib/Question';
	import { Dialog, Separator } from 'bits-ui';
	import { format } from 'date-fns';
	import { goto } from '$app/navigation';
	import ButtonLink from '$components/button-link.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	let search = $state(data.search);
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
			{ src: '/banner/valorant.mp4', position: 'object-[100%_30%]' }
		];

		randomVids = videos[Math.floor(Math.random() * videos.length)];
	});
</script>

<div class="relative h-80 overflow-hidden">
	<video
		class="absolute size-full object-cover {randomVids?.position}"
		src={randomVids?.src}
		loop
		autoplay
		muted
	></video>
	<div class="absolute h-full w-full bg-gradient-to-b from-transparent to-white"></div>
	<div
		class="absolute bottom-0 left-0 size-100 -translate-x-1/2 translate-y-1/2 rounded-full bg-white blur-3xl"
	></div>
	<div
		class="absolute right-0 bottom-0 size-100 translate-1/2 rounded-full bg-white blur-3xl"
	></div>
</div>
<main class="-translate-y-10">
	<div class="mx-auto max-w-lg space-y-4 text-center">
		<div>
			<img src="/favicon.png" class="mx-auto size-20" alt="Logo WPU" />
			<h1 class="text-center text-7xl">
				<span class="font-handwriting">Project</span> Showcase
			</h1>
		</div>
		<p class="text-lg">Jelajahi project-project keren dari para anggota komunitas kami.</p>
		<ButtonLink href="https://discord.gg/wpu">
			<Question class="size-5" />
			Submit Project
		</ButtonLink>
	</div>
</main>
<section>
	<div class="layout">
		<div class="flex justify-center gap-12 border-y border-y-zinc-300 py-8">
			<div class="flex items-center gap-4">
				<span class="text-5xl font-bold text-zinc-600">{data.meta.data.totalSeasons}</span>
				<span class="text-zinc-600 uppercase">Season</span>
			</div>
			<div class="flex items-center gap-4">
				<span class="text-5xl font-bold text-zinc-600"
					>{data.meta.data.creators.length}</span
				>
				<span class="text-zinc-600 uppercase">Nama</span>
			</div>
			<div class="flex items-center gap-4">
				<span class="text-5xl font-bold text-zinc-600">{data.meta.data.totalProjects}</span>
				<span class="text-zinc-600 uppercase">Project</span>
			</div>
			<div class="flex items-center gap-4">
				<span class="text-5xl font-bold text-zinc-600"
					>{data.meta.data.episodes.length}</span
				>
				<span class="text-zinc-600 uppercase">Episode</span>
			</div>
		</div>
	</div>
</section>
<section class="py-12" id="project-list">
	<div class="layout space-y-8">
		<form
			onsubmit={() => goto(`?season=${data.season}&search=${search}`)}
			class="flex w-full flex-col gap-2"
			id="search"
		>
			<label for="search" class="font-medium">Search</label>
			<div class="flex gap-2">
				<input
					class="flex h-12 w-full items-center gap-1 rounded-lg border border-zinc-300 px-4 shadow ring-4 ring-transparent transition-all focus:ring-zinc-200 focus:outline-none"
					type="text"
					placeholder="Cari nama pengirim atau url project"
					name="search"
					id="search"
					bind:value={search}
				/>
				<button
					class="grid size-12 shrink-0 place-items-center rounded-lg bg-zinc-800 text-white"
				>
					<MagnifyingGlass />
				</button>
			</div>
		</form>
		{#if data.search}
			<p>
				Hasil pencarian untuk "{data.search}"
			</p>
		{/if}
		<div class="flex items-start gap-6">
			<div class="sticky top-20 grid min-w-60 gap-1">
				{#each data.meta.data.seasonStats as season}
					{@const isActive = season.season == data.season}
					<a
						href="?season={season.season}&search={search}"
						class="flex items-center justify-between rounded-lg border border-zinc-300 px-8 py-4 text-left hover:bg-zinc-100 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
						data-state={isActive ? 'active' : undefined}
					>
						Season {season.season}
						<ArrowRight class="size-5" />
					</a>
				{/each}
			</div>
			{#await data.projectsPromise}
				<div class="w-full space-y-4">
					<div class="h-4 w-14 animate-pulse rounded bg-zinc-200"></div>
					<div class="h-8 w-32 animate-pulse rounded bg-zinc-200"></div>
					<div class="grid w-full grid-cols-3 gap-1">
						<div class="h-10 animate-pulse rounded bg-zinc-200"></div>
						<div class="h-10 animate-pulse rounded bg-zinc-200"></div>
						<div class="h-10 animate-pulse rounded bg-zinc-200"></div>
						<div class="h-10 animate-pulse rounded bg-zinc-200"></div>
						<div class="h-10 animate-pulse rounded bg-zinc-200"></div>
					</div>
				</div>
			{:then projects}
				{@const season = projects.data}
				{#if !season.count}
					<div class="flex h-40 w-full flex-col items-center justify-center gap-2">
						<p class="text-2xl font-bold">Oops! We couldn’t find any data here.</p>
						<p class="">
							Maybe try changing your filter or search again? We’re rooting for you!
						</p>
					</div>
				{:else}
					<div class="w-full">
						<span class="font-handwriting text-sm">
							Total ada {season.count} project
						</span>

						<h2 class="text-4xl">
							Season {season.season}
						</h2>

						<div class="mt-4 grid grid-cols-3 gap-1">
							{#each season.weeks as week}
								<Dialog.Root>
									<Dialog.Trigger
										class="flex justify-between rounded-lg border border-zinc-300 px-4 py-2 transition-all hover:rotate-3 hover:bg-zinc-100"
									>
										{format(week.date, 'd MMMM yyyy')}
										<span
											class="rounded-md bg-zinc-800 px-2 py-1 text-xs text-white"
										>
											{#if data.search}
												ada
											{/if}
											{week.projects.length} project
										</span>
									</Dialog.Trigger>
									<Dialog.Portal>
										<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
										<Dialog.Content
											class="fixed top-1/2 left-1/2 z-50 max-h-[98vh] w-full max-w-4xl -translate-1/2 space-y-8 overflow-y-auto rounded-lg bg-white p-12 outline-hidden"
										>
											<div
												class="sticky top-0 flex flex-wrap items-center justify-center gap-1"
											>
												{#if data.search}
													<div
														class="rounded-full border border-zinc-300 bg-white px-6 py-2 text-lg"
													>
														Hasil pencarian untuk "{data.search}"
													</div>
												{/if}
												<div
													class="rounded-full border border-zinc-300 bg-white px-6 py-2 text-lg"
												>
													{format(week.date, 'd MMMM yyyy')}
												</div>
												<Dialog.Close
													class="grid size-11 place-items-center rounded-full border border-zinc-300 bg-white text-lg hover:bg-zinc-100"
												>
													<X />
												</Dialog.Close>
											</div>
											{#each week.projects as project, i}
												<div class="flex items-center gap-2">
													<Separator.Root
														class="h-px w-full bg-zinc-300"
													/>
													<span
														class="font-black tracking-tighter whitespace-nowrap uppercase"
													>
														Project {i + 1}
													</span>
													<Separator.Root
														class="h-px w-full bg-zinc-300"
													/>
												</div>
												<div class="space-y-6">
													{#if project.screenshot}
														<div class="aspect-video w-full">
															<img
																loading="lazy"
																src="{data.apiUrl}/{project.screenshot}"
																alt={project.link}
																class="size-full rounded-xl border border-zinc-300 object-cover object-top"
															/>
														</div>
													{/if}
													<h3
														class="flex items-center justify-between gap-4"
													>
														<a
															href={project.link}
															class="inline-block text-xl break-all hover:underline"
															target="_blank"
															rel="noopener noreferrer"
														>
															{project.link}
														</a>
														<span
															class="rounded-full bg-zinc-800 px-4 py-1 text-sm whitespace-nowrap text-white"
														>
															Dikirim oleh <strong
																>{project.creator}</strong
															>
														</span>
													</h3>
													<div class="prose prose-lg [&_br]:my-2">
														{@html project.description}
													</div>
												</div>
											{/each}
										</Dialog.Content>
									</Dialog.Portal>
								</Dialog.Root>
							{/each}
						</div>
					</div>
				{/if}
			{:catch error}
				<p>Sepertinya Ada Masalah: {error.message}</p>
			{/await}
		</div>
	</div>
</section>
