/**
 * State layers for the **V4 design line**, on Material Design 3's scale.
 *
 * Before this module every V4 component invented its own press feedback. A
 * measured sweep of the 74 pairs found four different vocabularies in use at
 * once: `opacity: 0.6`, `opacity: 0.7`, `opacity: 0.85`, a fill of
 * `colors.border` (a *hairline* colour used as a *surface*), and three
 * different neutral mixes — 0.07 in the native picker line, 0.08 in the web
 * row line, 0.18 for a focus halo. A pressed `ListRow` and a pressed
 * `BottomNav` tab were, measurably, two different products.
 *
 * M3 answers this with one idea: a state layer is **the component's own
 * content colour at a fixed opacity, laid over its container**. Because it is
 * the content colour it always contrasts with the ground; because it is an
 * opacity rather than a colour it needs to know nothing about what it sits on.
 *
 * Source for every number here: `material-components/material-web`,
 * `tokens/versions/v0_192/_md-sys-state.scss` — hover `0.08`, focus `0.12`,
 * pressed `0.12`, dragged `0.16`. Fetched 2026-08-26. They are re-exported
 * from the compiled theme (`theme.state`) rather than retyped, so there is
 * exactly one place the scale lives.
 *
 * Three spellings, because the two platforms cannot express the same thing:
 *
 *   - {@link stateOverlay} — an `rgba()` layer. The literal M3 model, and the
 *     right answer when the ground is unknown (a tab over a rail, a ✕ over a
 *     tone band). React Native has no `color-mix()`, so this is how a native
 *     control gets a ground-independent layer.
 *   - {@link stateMix} — the same layer **flattened** to an opaque hex against
 *     a ground the component owns. Rows use this: a list row knows it sits on
 *     `surface`, and an opaque fill keeps the row's own text-contrast promise
 *     intact instead of borrowing whatever is beneath.
 *   - {@link stateCss} — the web spelling, a `color-mix()` over two custom
 *     properties so the layer follows `[data-theme="dark"]` with no dark rule
 *     of its own.
 */
import type { StateLayerTokens } from '../../theme/types';
/** The interaction states M3 gives a layer to. */
export type StateLevel = 'hover' | 'focus' | 'pressed' | 'dragged';
/**
 * The M3 scale, for the places that cannot reach a compiled theme — a static
 * `<style>` sheet injected once per document, and a module-level constant.
 * Identical to `useXenitionTheme().state`; the opacities are scheme- and
 * seed-independent, which is the whole point of an industry scale.
 */
export declare const V4_STATE: StateLayerTokens;
/**
 * A state layer as a translucent `rgba()` of the content colour.
 *
 * Ground-independent by construction, so this is what a control reaches for
 * when it does not own the surface under it.
 */
export declare function stateOverlay(content: string, level: StateLevel, state?: StateLayerTokens): string;
/**
 * A state layer flattened against a known container, as an opaque hex.
 *
 * For anything whose text carries a contrast guarantee against the fill it is
 * drawn on — a list row, a menu item, a suggestion — an opaque fill keeps that
 * guarantee measurable.
 */
export declare function stateMix(container: string, content: string, level: StateLevel, state?: StateLayerTokens): string;
/**
 * The web spelling: `color-mix()` of two custom properties.
 *
 * Both `--xen-*` inputs are re-emitted under `[data-theme="dark"]`, so the
 * layer inverts with the scheme and the sheet needs no dark rule.
 */
export declare function stateCss(content: string, container: string, level: StateLevel, state?: StateLayerTokens): string;
/** The default web layer: `on-surface` over `surface`. */
export declare function surfaceStateCss(level: StateLevel): string;
/** The one `<style>` id every V4 control that takes a state layer shares. */
export declare const V4_STATE_STYLE_ID = "xen-v4-state-styles";
/**
 * The web sheet behind every V4 state layer.
 *
 * It is a sheet rather than a set of utility classes for the reason every other
 * V4 sheet is: `color-mix()` over custom properties cannot be said as a class
 * bound to a token, and the layer has to follow `[data-theme]` with no dark
 * rule of its own.
 *
 * A control opts in with `data-xen-v4-state` and needs nothing else. The
 * defaults are M3's model exactly — the layer is **`currentColor` at the state
 * opacity over `transparent`**, so it is the control's own content colour, it
 * is translucent, and the browser composites it over whatever is actually
 * behind. A ✕ on a tone band, a tab on a rail and a menu item on a popover all
 * get a correct layer without any of them being told what they are sitting on.
 *
 * {@link stateGroundVars} overrides the pair for the rare control that needs an
 * **opaque** layer — one whose own text carries a measured contrast promise
 * against the fill it is drawn on.
 *
 * What this replaced was `hover:opacity-70`. Dimming fades the control's own
 * *content*, which is the signal M3 spends `0.38` on to mean **disabled** — so
 * a hovered ✕ and a dead ✕ looked alike. A state layer tints the container and
 * leaves the content at full strength.
 */
export declare const V4_STATE_CSS: string;
/**
 * Element-scoped overrides for a control that needs an **opaque** layer.
 *
 * Spread onto `style`. Pass the fill the control actually wears and the ink it
 * draws its content in, so the layer is derived from the same pair the
 * component already contrast-checked.
 */
export declare function stateGroundVars(ground: string, ink: string): Record<string, string>;
/**
 * M3 disables **content** at 38% and containers at 12%. The line was carrying
 * `opacity-50` in twenty-odd places and `opacity-40` in two more, for no reason
 * other than that fifty is a round number.
 *
 * Written out rather than interpolated because a Tailwind class has to be
 * legible to a static scanner; the value is `V4_STATE.disabledContent`.
 */
export declare const V4_DISABLED_CLASS = "disabled:pointer-events-none disabled:opacity-[0.38]";
/** The same, for a control disabled by a prop rather than the DOM attribute. */
export declare const V4_DISABLED_SOFT_CLASS = "pointer-events-none opacity-[0.38]";
//# sourceMappingURL=v4-state.d.ts.map