<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { cva, type VariantProps } from 'class-variance-authority';
	import { cn } from '../utils/class-names';
	import { button } from './button.svelte';

	interface Props extends HTMLAnchorAttributes, VariantProps<typeof button> {}

	const { intent, size, disabled, class: className, children, ...rest }: Props = $props();
</script>

<a {...rest} class={cn(button({ intent, size, disabled }), className)}>
	{@render children?.()}
</a>
