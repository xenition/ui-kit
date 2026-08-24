/**
 * Idempotent, SSR-safe injection of a shared `<style>` tag. Used for the few
 * pieces of motion CSS that cannot be expressed inline (keyframes, hover and
 * `prefers-reduced-motion` rules). The injected CSS contains **no colors** —
 * only transforms/opacity — so the token-only rule is unaffected.
 */
export declare function injectStyleOnce(id: string, css: string): void;
//# sourceMappingURL=inject.d.ts.map