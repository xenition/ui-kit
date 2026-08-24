/**
 * Internal token-class maps for the web `layout` module. Not exported from the
 * barrel — components import these to translate a `SpaceKey` / alignment prop
 * into a **literal** Tailwind class string (e.g. `gap-[var(--xen-space-md)]`).
 *
 * The strings are written out in full (never built by template literal) so the
 * Tailwind scanner picks them up from the library source and the kit lint rule
 * (no literal colors) stays satisfied — every value traces to a `--xen-*` token.
 */

export type SpaceKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Cross-axis alignment (superset — `baseline` only meaningful on a row/flex). */
export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
/** Main-axis distribution. */
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export const SPACE_GAP: Record<SpaceKey, string> = {
  xs: 'gap-[var(--xen-space-xs)]',
  sm: 'gap-[var(--xen-space-sm)]',
  md: 'gap-[var(--xen-space-md)]',
  lg: 'gap-[var(--xen-space-lg)]',
  xl: 'gap-[var(--xen-space-xl)]',
  '2xl': 'gap-[var(--xen-space-2xl)]',
};

export const SPACE_P: Record<SpaceKey, string> = {
  xs: 'p-[var(--xen-space-xs)]',
  sm: 'p-[var(--xen-space-sm)]',
  md: 'p-[var(--xen-space-md)]',
  lg: 'p-[var(--xen-space-lg)]',
  xl: 'p-[var(--xen-space-xl)]',
  '2xl': 'p-[var(--xen-space-2xl)]',
};

export const SPACE_PX: Record<SpaceKey, string> = {
  xs: 'px-[var(--xen-space-xs)]',
  sm: 'px-[var(--xen-space-sm)]',
  md: 'px-[var(--xen-space-md)]',
  lg: 'px-[var(--xen-space-lg)]',
  xl: 'px-[var(--xen-space-xl)]',
  '2xl': 'px-[var(--xen-space-2xl)]',
};

export const SPACE_PY: Record<SpaceKey, string> = {
  xs: 'py-[var(--xen-space-xs)]',
  sm: 'py-[var(--xen-space-sm)]',
  md: 'py-[var(--xen-space-md)]',
  lg: 'py-[var(--xen-space-lg)]',
  xl: 'py-[var(--xen-space-xl)]',
  '2xl': 'py-[var(--xen-space-2xl)]',
};

export const SPACE_MX: Record<SpaceKey, string> = {
  xs: 'mx-[var(--xen-space-xs)]',
  sm: 'mx-[var(--xen-space-sm)]',
  md: 'mx-[var(--xen-space-md)]',
  lg: 'mx-[var(--xen-space-lg)]',
  xl: 'mx-[var(--xen-space-xl)]',
  '2xl': 'mx-[var(--xen-space-2xl)]',
};

export const SPACE_MY: Record<SpaceKey, string> = {
  xs: 'my-[var(--xen-space-xs)]',
  sm: 'my-[var(--xen-space-sm)]',
  md: 'my-[var(--xen-space-md)]',
  lg: 'my-[var(--xen-space-lg)]',
  xl: 'my-[var(--xen-space-xl)]',
  '2xl': 'my-[var(--xen-space-2xl)]',
};

export const SPACE_MX_NEG: Record<SpaceKey, string> = {
  xs: '-mx-[var(--xen-space-xs)]',
  sm: '-mx-[var(--xen-space-sm)]',
  md: '-mx-[var(--xen-space-md)]',
  lg: '-mx-[var(--xen-space-lg)]',
  xl: '-mx-[var(--xen-space-xl)]',
  '2xl': '-mx-[var(--xen-space-2xl)]',
};

export const SPACE_MY_NEG: Record<SpaceKey, string> = {
  xs: '-my-[var(--xen-space-xs)]',
  sm: '-my-[var(--xen-space-sm)]',
  md: '-my-[var(--xen-space-md)]',
  lg: '-my-[var(--xen-space-lg)]',
  xl: '-my-[var(--xen-space-xl)]',
  '2xl': '-my-[var(--xen-space-2xl)]',
};

export const SPACE_W: Record<SpaceKey, string> = {
  xs: 'w-[var(--xen-space-xs)]',
  sm: 'w-[var(--xen-space-sm)]',
  md: 'w-[var(--xen-space-md)]',
  lg: 'w-[var(--xen-space-lg)]',
  xl: 'w-[var(--xen-space-xl)]',
  '2xl': 'w-[var(--xen-space-2xl)]',
};

export const SPACE_H: Record<SpaceKey, string> = {
  xs: 'h-[var(--xen-space-xs)]',
  sm: 'h-[var(--xen-space-sm)]',
  md: 'h-[var(--xen-space-md)]',
  lg: 'h-[var(--xen-space-lg)]',
  xl: 'h-[var(--xen-space-xl)]',
  '2xl': 'h-[var(--xen-space-2xl)]',
};

export const ALIGN_CLASSES: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

export const JUSTIFY_CLASSES: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};
