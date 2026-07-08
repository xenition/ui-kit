/**
 * Idempotent, SSR-safe injection of a shared `<style>` tag. Used for the few
 * pieces of motion CSS that cannot be expressed inline (keyframes, hover and
 * `prefers-reduced-motion` rules). The injected CSS contains **no colors** —
 * only transforms/opacity — so the token-only rule is unaffected.
 */
export function injectStyleOnce(id: string, css: string): void {
  if (typeof document === 'undefined') return; // SSR
  if (document.getElementById(id) !== null) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
