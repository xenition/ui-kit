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
/** The `<style>` id the V4 chrome components share. Injection is idempotent. */
export declare const CHROME_V4_STYLE_ID = "xen-v4-chrome-styles";
/** An M3 easing quadruple as a CSS `cubic-bezier()`. */
export declare function easingCss(easing: readonly number[]): string;
/** `standard` — a state change: a row tinting, a fill arriving. */
export declare const EASE_STANDARD: string;
/** `enter` — something arriving on screen. */
export declare const EASE_ENTER: string;
/**
 * The minimum comfortable tap target as a Tailwind arbitrary value.
 *
 * `2xl - xs` is 44 at the kit's scale — the same expression `ButtonV4` and the
 * V4 navigation line compose, so a nav row, a toggle and a button land on one
 * size instead of three that happen to be close.
 */
export declare const MIN_TAP_CLASS = "min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]";
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
export declare const CHROME_V4_CSS: string;
//# sourceMappingURL=chrome-v4.d.ts.map