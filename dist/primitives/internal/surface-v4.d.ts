/**
 * Depth plumbing shared by the **V4 surface line** on the web — `BottomSheetV4`,
 * `ModalV4`, `ActionSheetV4`.
 *
 * These three are the components where `elevation` and `glass` genuinely earn
 * their place: a sheet really is above the page, a dialog really is off it, and
 * depth here is layer order made visible rather than decoration. `design.md` §8
 * bans "cards inside cards inside cards" and glassmorphism without purpose, so
 * the rule this file encodes is: **the overlay is the only layer that gets
 * depth.** Content inside it is flat. A card inside a glass sheet is not
 * another glass panel.
 *
 * Unlike the native twin, almost none of this needs the compiled theme at
 * render time: `toCssVars` emits `--xen-gradient-*`, `--xen-glass-*` and
 * `--xen-elevation-*` per scheme, so the values follow `[data-theme="dark"]` on
 * their own. The one exception is `depth` itself, which is a seed decision
 * rather than a colour and has no custom property — see {@link useDepth}.
 *
 * ## Why this is a stylesheet and not inline styles
 *
 * Every value here is a `var()` or a `color-mix()`. A CSSOM that does not parse
 * custom properties — jsdom, and any SSR style extractor built on one — drops
 * such a value from an inline `style` outright, silently leaving the panel
 * unstyled. In a stylesheet the declaration is never parsed by that layer at
 * all: it is a string handed to the browser. `GlassPanel` already works this
 * way; the V4 surfaces follow it.
 */
import type { ThemeDepth } from '../../theme/types';
/**
 * How dark an overlay scrim sits, in percent.
 *
 * Not 50, and — more importantly — not `--xen-on-surface`. A scrim built from
 * `on-surface` or from a neutral ramp step INVERTS with the scheme and becomes
 * a white veil over a dark page, which is what the base overlays do today
 * (`bg-neutral-950/50` reads as near-white under `[data-theme="dark"]`, because
 * the dark block re-emits the ramp inverted). `--xen-elevation-color` does not
 * invert, because a shadow does not.
 *
 * 44 rather than 50 because the panel over it carries a real shadow: the
 * contact edge is already darker than the rest, so the flat field can be
 * lighter and the overlay still reads as separated. The result has a falloff
 * instead of being one even sheet of black.
 */
export declare const SCRIM_ALPHA = 44;
/** The scrim fill for the active scheme — dark in both, by construction. */
export declare function scrimCss(alphaPercent?: number): string;
/**
 * The value for a panel's `data-xen-v4-panel` attribute.
 *
 * This is the one place a V4 component checks the depth, and it is not an
 * oversight. `flatten()` in the compiler neutralises gradients and elevation
 * and stops there — `glass.tint` is live even under `depth: 'flat'`. So
 * elevation is consumed unconditionally and flat falls out for free, while
 * glass has to be asked for.
 */
export declare function panelKind(depth: ThemeDepth): 'solid' | 'glass';
/**
 * The seed's depth, or `'soft'` when no `XenitionUIProvider` is mounted.
 *
 * `useXenitionCompiledTheme` throws in that case, which is right for an app —
 * a missing provider means every `--xen-*` is missing too — but wrong for a
 * primitive: a V4 overlay with no theme to read should render the default look,
 * not blow up someone's render. The `useContext` inside runs unconditionally
 * before the throw, so hook order stays stable.
 */
export declare function useDepth(): ThemeDepth;
/**
 * Motion durations, on M3's scale rather than inside §36.2's bands.
 *
 * A sheet crosses the whole screen, so it takes `enter` (400ms) — which is
 * also what M3 specifies for a bottom sheet's entrance, and 120ms longer than
 * the 280 this file had guessed. A dialog only scales and fades, travels
 * almost no distance, and stays at `standard` (200ms), which is what it
 * already was.
 */
export declare const SURFACE_MOTION: {
    readonly sheet: number;
    readonly dialog: number;
};
/**
 * Everything the V4 overlays paint, as one injected stylesheet.
 *
 * §36.10: under `prefers-reduced-motion` the large spatial transitions are
 * replaced by a plain fade rather than removed, because an overlay that appears
 * with no transition at all reads as a glitch.
 */
export declare const SURFACE_V4_CSS: string;
/**
 * The four edges a drawer can arrive from, as animation rules.
 *
 * Kept beside the sheet and dialog keyframes rather than in `DrawerV4` for the
 * reason the rest of this file exists: a drawer, a bottom sheet and a dialog
 * are the same kind of object — a layer above the page — and a kit where each
 * one picks its own travel has three overlay systems. The travel is 100% of the
 * panel's own size in the axis it entered on, which is §36.5's spatial
 * continuity: the panel comes from the edge it is anchored to, so its motion
 * says where it came from and where dismissing it will send it back.
 *
 * `SURFACE_MOTION.sheet` is the duration for all four, because all four travel
 * the same distance — the whole of themselves.
 *
 * Under `prefers-reduced-motion` the travel is replaced by a fade rather than
 * removed: an overlay that appears with no transition at all reads as a glitch
 * (§36.10).
 */
export declare const SURFACE_V4_DRAWER_CSS: string;
//# sourceMappingURL=surface-v4.d.ts.map