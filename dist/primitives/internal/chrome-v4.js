"use strict";
/**
 * Shared plumbing for the **V4 screen-chrome line** on the web — `DrawerV4`,
 * `SidebarV4`, `AppShellV4`, `PopconfirmV4`, `ContextMenuV4`, `ToggleGroupV4`,
 * `KanbanV4`, `VirtualListV4`.
 *
 * These are the components that frame a screen rather than sit inside one, and
 * they share exactly two problems:
 *
 * 1. **A row that answers the pointer.** Every one of them has a list of
 *    pressable things — nav rows, menu items, cards, toggles. The base line
 *    gave each its own tint (`hover:bg-neutral-100`, `hover:bg-neutral-50`,
 *    `bg-neutral-50`), all three of which are LIGHT-oriented ramp steps that
 *    paint a near-white slab across a dark page. The answer is the M3 state
 *    layer from {@link module:internal/v4-state}, which is the component's own
 *    content colour at a fixed opacity and therefore correct on any ground.
 * 2. **One focus ring.** `--xen-ring` is `primary` already corrected to 3:1
 *    against `surface`, so it is visible on a page where the raw brand colour
 *    would not be — §46 puts that ahead of brand purity. Before it existed,
 *    chrome components rang themselves in `primary-300`, a ramp step, which
 *    inverts.
 *
 * Nothing here invents a number. The opacities come from `theme.state`
 * (Material Design 3, verbatim) and the durations from `theme.motion`.
 *
 * ## Why this is a stylesheet and not utility classes
 *
 * Every value is a `color-mix()` over a `var()`, and `:hover` / `:focus-visible`
 * have no inline spelling at all. A CSSOM that does not parse custom properties
 * — jsdom, and any SSR extractor built on one — drops such a declaration from
 * an inline `style` outright, silently leaving the control unstyled. `GlassPanel`,
 * the V4 surfaces and the V4 form controls all work this way; chrome follows.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHROME_V4_CSS = exports.MIN_TAP_CLASS = exports.EASE_ENTER = exports.EASE_STANDARD = exports.CHROME_V4_STYLE_ID = void 0;
exports.easingCss = easingCss;
const compile_1 = require("../../theme/compile");
const v4_data_1 = require("./v4-data");
const v4_state_1 = require("./v4-state");
/** The `<style>` id the V4 chrome components share. Injection is idempotent. */
exports.CHROME_V4_STYLE_ID = 'xen-v4-chrome-styles';
/** An M3 easing quadruple as a CSS `cubic-bezier()`. */
function easingCss(easing) {
    return `cubic-bezier(${easing.join(', ')})`;
}
/** `standard` — a state change: a row tinting, a fill arriving. */
exports.EASE_STANDARD = easingCss(compile_1.MOTION.easingStandard);
/** `enter` — something arriving on screen. */
exports.EASE_ENTER = easingCss(compile_1.MOTION.easingEnter);
/**
 * The minimum comfortable tap target as a Tailwind arbitrary value.
 *
 * `2xl - xs` is 44 at the kit's scale — the same expression `ButtonV4` and the
 * V4 navigation line compose, so a nav row, a toggle and a button land on one
 * size instead of three that happen to be close.
 */
exports.MIN_TAP_CLASS = 'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';
/**
 * Everything the V4 chrome line paints that a class cannot say.
 *
 * `data-xen-v4-chrome` names the **content colour** the state layer is made of,
 * because a state layer is the component's own ink at low opacity: a nav row on
 * a surface tints with `on-surface`, a selected row already carrying a brand
 * tint deepens with `primary`, a destructive menu item tints with `danger`.
 * Three values, and no component writes the mix itself.
 *
 * The layers are **opaque mixes against `surface`**, not translucent films.
 * These rows all own the surface beneath them and their labels carry a measured
 * contrast promise against it; a translucent layer would make that promise
 * depend on whatever the caller happened to put behind the rail.
 *
 * `:active` is listed after `:hover` so a pressed row reads as pressed rather
 * than hovered — 0.12 over 0.08, the difference M3 sizes at. Disabled elements
 * are excluded from both: feedback on a control that will not respond is a lie
 * (§14 — design states, not screenshots).
 */
exports.CHROME_V4_CSS = `
[data-xen-v4-chrome] {
  transition: background-color ${compile_1.MOTION.quick}ms ${exports.EASE_STANDARD}, color ${compile_1.MOTION.quick}ms ${exports.EASE_STANDARD};
}
[data-xen-v4-chrome="on-surface"]:hover:not(:disabled):not([aria-disabled="true"]) {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-on-surface)', 'var(--xen-surface)', 'hover')};
}
[data-xen-v4-chrome="on-surface"]:active:not(:disabled):not([aria-disabled="true"]) {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-on-surface)', 'var(--xen-surface)', 'pressed')};
}
[data-xen-v4-chrome="primary"]:hover:not(:disabled):not([aria-disabled="true"]) {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-primary)', 'var(--xen-surface)', 'hover')};
}
[data-xen-v4-chrome="primary"]:active:not(:disabled):not([aria-disabled="true"]) {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-primary)', 'var(--xen-surface)', 'pressed')};
}
[data-xen-v4-chrome="danger"]:hover:not(:disabled):not([aria-disabled="true"]) {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-danger)', 'var(--xen-surface)', 'hover')};
}
[data-xen-v4-chrome="danger"]:active:not(:disabled):not([aria-disabled="true"]) {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-danger)', 'var(--xen-surface)', 'pressed')};
}
/*
  A FILLED control's state layer.

  The three rules above mix into \`--xen-surface\`, which is right for a row that
  sits on the page and wrong for a button that has painted its own ground. A
  filled control layers its own PAIRED ink over its own fill — \`on-primary\` over
  \`primary\`, \`on-danger\` over \`danger\` — which is the M3 model applied to the
  container the control actually has, and it keeps the label's contrast promise
  intact because the ground only moves 8% toward the ink that was measured
  against it.
*/
[data-xen-v4-chrome="filled-primary"]:hover:not(:disabled):not([aria-disabled="true"]) {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-on-primary)', 'var(--xen-primary)', 'hover')};
}
[data-xen-v4-chrome="filled-primary"]:active:not(:disabled):not([aria-disabled="true"]) {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-on-primary)', 'var(--xen-primary)', 'pressed')};
}
[data-xen-v4-chrome="filled-danger"]:hover:not(:disabled):not([aria-disabled="true"]) {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-on-danger)', 'var(--xen-danger)', 'hover')};
}
[data-xen-v4-chrome="filled-danger"]:active:not(:disabled):not([aria-disabled="true"]) {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-on-danger)', 'var(--xen-danger)', 'pressed')};
}
/* The one focus ring the whole kit shares — see the note at the top of this file. */
[data-xen-v4-chrome]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: -2px;
}
/*
  A disabled control keeps its box and loses its ink, at M3's 0.38 — one number
  instead of every component's own \`opacity-50\`.
*/
[data-xen-v4-chrome]:disabled,
[data-xen-v4-chrome][aria-disabled="true"] {
  opacity: ${v4_state_1.V4_STATE.disabledContent};
  pointer-events: none;
}
/*
  A recessed TRAY: a region that holds items, one step back from the page.

  The alternative — giving the tray a border and its items a border, both on
  \`surface\` — is §8's "cards inside cards inside cards": two nested
  rectangles on identical grounds, separated only by a hairline each. Separating
  them by GROUND instead means one level of depth said once, and the outline
  that was doing the work goes away (§9).

  The step is the same 4% the V4 tables band with, so the whole kit is recessed
  by one amount instead of each surface picking its own, and it is mixed from
  the two scheme-resolved slots so it darkens a light page and lightens a dark
  one with no dark rule.
*/
[data-xen-v4-tray] {
  background-color: ${(0, v4_data_1.zebraCss)(v4_data_1.ZEBRA_MIX)};
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-chrome] { transition: none; }
}
`;
//# sourceMappingURL=chrome-v4.js.map