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
export declare const SPACE_GAP: Record<SpaceKey, string>;
export declare const SPACE_P: Record<SpaceKey, string>;
export declare const SPACE_PX: Record<SpaceKey, string>;
export declare const SPACE_PY: Record<SpaceKey, string>;
export declare const SPACE_MX: Record<SpaceKey, string>;
export declare const SPACE_MY: Record<SpaceKey, string>;
export declare const SPACE_MX_NEG: Record<SpaceKey, string>;
export declare const SPACE_MY_NEG: Record<SpaceKey, string>;
export declare const SPACE_W: Record<SpaceKey, string>;
export declare const SPACE_H: Record<SpaceKey, string>;
export declare const ALIGN_CLASSES: Record<Align, string>;
export declare const JUSTIFY_CLASSES: Record<Justify, string>;
//# sourceMappingURL=_tokens.d.ts.map