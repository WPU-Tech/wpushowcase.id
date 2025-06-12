<script module>
	export const button = cva(
		'inline-flex items-center gap-2 font-semibold transition-all hover:rotate-2 ',
		{
			variants: {
				intent: {
					primary: 'bg-zinc-900 text-white ring-4 ring-zinc-200 hover:ring-zinc-300',
					dark: 'bg-white text-zinc-800 ring-4 ring-zinc-600 hover:ring-zinc-500'
				},
				size: {
					medium: 'h-12 rounded-lg px-6',
					icon: 'size-12 rounded-lg'
				},
				disabled: {
					false: 'cursor-pointer',
					true: 'pointer-events-none opacity-50'
				}
			},
			defaultVariants: {
				intent: 'primary',
				size: 'medium',
				disabled: false
			}
		}
	);
</script>

<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cva, type VariantProps } from 'class-variance-authority';
	import { cn } from '../utils/class-names';

	interface Props extends HTMLButtonAttributes, VariantProps<typeof button> {}

	const { intent, size, disabled, class: className, children, ...rest }: Props = $props();
</script>

<button {...rest} class={cn(button({ intent, size, disabled }), className)} {disabled}>
	{@render children?.()}
</button>
