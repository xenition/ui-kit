"use strict";
/**
 * Internal token-class maps for the web `layout` module. Not exported from the
 * barrel — components import these to translate a `SpaceKey` / alignment prop
 * into a **literal** Tailwind class string (e.g. `gap-[var(--xen-space-md)]`).
 *
 * The strings are written out in full (never built by template literal) so the
 * Tailwind scanner picks them up from the library source and the kit lint rule
 * (no literal colors) stays satisfied — every value traces to a `--xen-*` token.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JUSTIFY_CLASSES = exports.ALIGN_CLASSES = exports.SPACE_H = exports.SPACE_W = exports.SPACE_MY_NEG = exports.SPACE_MX_NEG = exports.SPACE_MY = exports.SPACE_MX = exports.SPACE_PY = exports.SPACE_PX = exports.SPACE_P = exports.SPACE_GAP = void 0;
exports.SPACE_GAP = {
    xs: 'gap-[var(--xen-space-xs)]',
    sm: 'gap-[var(--xen-space-sm)]',
    md: 'gap-[var(--xen-space-md)]',
    lg: 'gap-[var(--xen-space-lg)]',
    xl: 'gap-[var(--xen-space-xl)]',
    '2xl': 'gap-[var(--xen-space-2xl)]',
};
exports.SPACE_P = {
    xs: 'p-[var(--xen-space-xs)]',
    sm: 'p-[var(--xen-space-sm)]',
    md: 'p-[var(--xen-space-md)]',
    lg: 'p-[var(--xen-space-lg)]',
    xl: 'p-[var(--xen-space-xl)]',
    '2xl': 'p-[var(--xen-space-2xl)]',
};
exports.SPACE_PX = {
    xs: 'px-[var(--xen-space-xs)]',
    sm: 'px-[var(--xen-space-sm)]',
    md: 'px-[var(--xen-space-md)]',
    lg: 'px-[var(--xen-space-lg)]',
    xl: 'px-[var(--xen-space-xl)]',
    '2xl': 'px-[var(--xen-space-2xl)]',
};
exports.SPACE_PY = {
    xs: 'py-[var(--xen-space-xs)]',
    sm: 'py-[var(--xen-space-sm)]',
    md: 'py-[var(--xen-space-md)]',
    lg: 'py-[var(--xen-space-lg)]',
    xl: 'py-[var(--xen-space-xl)]',
    '2xl': 'py-[var(--xen-space-2xl)]',
};
exports.SPACE_MX = {
    xs: 'mx-[var(--xen-space-xs)]',
    sm: 'mx-[var(--xen-space-sm)]',
    md: 'mx-[var(--xen-space-md)]',
    lg: 'mx-[var(--xen-space-lg)]',
    xl: 'mx-[var(--xen-space-xl)]',
    '2xl': 'mx-[var(--xen-space-2xl)]',
};
exports.SPACE_MY = {
    xs: 'my-[var(--xen-space-xs)]',
    sm: 'my-[var(--xen-space-sm)]',
    md: 'my-[var(--xen-space-md)]',
    lg: 'my-[var(--xen-space-lg)]',
    xl: 'my-[var(--xen-space-xl)]',
    '2xl': 'my-[var(--xen-space-2xl)]',
};
exports.SPACE_MX_NEG = {
    xs: '-mx-[var(--xen-space-xs)]',
    sm: '-mx-[var(--xen-space-sm)]',
    md: '-mx-[var(--xen-space-md)]',
    lg: '-mx-[var(--xen-space-lg)]',
    xl: '-mx-[var(--xen-space-xl)]',
    '2xl': '-mx-[var(--xen-space-2xl)]',
};
exports.SPACE_MY_NEG = {
    xs: '-my-[var(--xen-space-xs)]',
    sm: '-my-[var(--xen-space-sm)]',
    md: '-my-[var(--xen-space-md)]',
    lg: '-my-[var(--xen-space-lg)]',
    xl: '-my-[var(--xen-space-xl)]',
    '2xl': '-my-[var(--xen-space-2xl)]',
};
exports.SPACE_W = {
    xs: 'w-[var(--xen-space-xs)]',
    sm: 'w-[var(--xen-space-sm)]',
    md: 'w-[var(--xen-space-md)]',
    lg: 'w-[var(--xen-space-lg)]',
    xl: 'w-[var(--xen-space-xl)]',
    '2xl': 'w-[var(--xen-space-2xl)]',
};
exports.SPACE_H = {
    xs: 'h-[var(--xen-space-xs)]',
    sm: 'h-[var(--xen-space-sm)]',
    md: 'h-[var(--xen-space-md)]',
    lg: 'h-[var(--xen-space-lg)]',
    xl: 'h-[var(--xen-space-xl)]',
    '2xl': 'h-[var(--xen-space-2xl)]',
};
exports.ALIGN_CLASSES = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
};
exports.JUSTIFY_CLASSES = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
};
//# sourceMappingURL=_tokens.js.map