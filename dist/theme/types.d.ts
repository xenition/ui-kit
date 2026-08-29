/**
 * Theme-layer types for `@xenition/ui`.
 *
 * A theme is authored as a tiny {@link ThemeSeed} (~5 values — the only thing
 * the LLM or a settings form ever writes) and compiled by `compileTheme()`
 * into a full {@link CompiledTheme}: 11-step color ramps, WCAG-AA-checked
 * semantic slots for light + dark, and radius/spacing/typography scales.
 */
/** The 11 ramp steps, lightest (50) to darkest (950). */
export declare const RAMP_STEPS: readonly [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export type RampStep = (typeof RAMP_STEPS)[number];
/** An 11-step color ramp; every value is a `#rrggbb` hex string. */
export type ColorRamp = Record<RampStep, string>;
export type NeutralTemperature = 'warm' | 'cool' | 'pure';
export type ThemeShape = 'sharp' | 'rounded' | 'pill';
export type ThemeMode = 'light' | 'dark' | 'both';
/**
 * `theme.seed.json` — the only theme input an app (or the builder LLM)
 * provides. Everything else is derived deterministically.
 */
export interface ThemeSeed {
    /** Brand color as `#rgb` or `#rrggbb` hex. */
    primary: string;
    /** Optional secondary color; defaults to `primary` with hue rotated +40°. */
    accent?: string;
    /** Gray-ramp temperature. */
    neutral: NeutralTemperature;
    /** Font family names (from the curated whitelist). */
    font: {
        heading: string;
        body: string;
    };
    /** Corner style → radius scale. */
    shape: ThemeShape;
    /** Which color schemes the app ships. */
    mode: ThemeMode;
    /**
     * How much depth the surfaces carry. Default `'soft'`.
     *
     * This is the knob that decides whether an app reads as a flat utility or a
     * premium product, and it exists so that decision is made ONCE, in the seed,
     * rather than re-argued on every screen.
     *
     *   - `'flat'`  — no gradients, no shadows. Dense, functional, fastest to
     *                 scan. Right for an admin console or a data tool.
     *   - `'soft'`  — a gradient wash on heroes and the primary action, gentle
     *                 elevation on cards. The default, and what most consumer
     *                 apps want.
     *   - `'glass'` — translucent panels layered over a colour field. Premium
     *                 and atmospheric; costs a little legibility, so the
     *                 compiler still contrast-checks every text pair.
     *
     * `design.md` §8 bans "glassmorphism without purpose" and §35.11 asks that
     * gradients stay "rare and purposeful". This seed is how that stays true:
     * depth is a deliberate product decision, not a per-component flourish.
     */
    depth?: ThemeDepth;
}
/** See `ThemeSeed.depth`. */
export type ThemeDepth = 'flat' | 'soft' | 'glass';
/**
 * A two-stop gradient, resolved to hex. Kept to two stops on purpose: three
 * stops is where a brand gradient starts looking like a screensaver, and RN's
 * gradient primitive takes an array anyway, so a caller who genuinely needs
 * more can build one.
 */
export interface GradientToken {
    /** Near stop. */
    from: string;
    /** Far stop. */
    to: string;
    /** Degrees clockwise from "up". 0 = bottom-to-top. */
    angle: number;
}
/** The gradients a screen may reach for. Nothing else is a brand gradient. */
export interface GradientTokens {
    /** primary → accent. The one action on a screen, and brand artwork. */
    brand: GradientToken;
    /** A barely-there page ground. The warm wash behind a hero. */
    wash: GradientToken;
    /** Neutral, for a placeholder cover or a skeleton. */
    muted: GradientToken;
}
/**
 * Translucent panel treatment. `tint` is already alpha-composited against the
 * scheme's surface, because React Native has no backdrop-filter — a real blur
 * needs a host `BlurView`, and a component that assumed one would crash in
 * every app that has not installed it.
 */
export interface GlassTokens {
    /** Fill for a panel sitting over artwork or a colour field. */
    tint: string;
    /** Hairline that keeps the panel's edge visible against a busy ground. */
    border: string;
    /** Blur radius to pass to a host `BlurView`, when the app has one. */
    blur: number;
}
/** Shadow, in the shape both platforms can consume. */
export interface ElevationToken {
    color: string;
    opacity: number;
    radius: number;
    offsetY: number;
    /** Android only; RN ignores shadow* without it. */
    android: number;
}
/**
 * State-layer opacities, taken verbatim from Material Design 3.
 *
 * Source: `material-components/material-web`,
 * `tokens/versions/v0_192/_md-sys-state.scss` — hover 0.08, focus 0.12,
 * pressed 0.12, dragged 0.16. Fetched 2026-08-26.
 *
 * These exist because the kit had no state system at all: every component
 * invented its own hover tint and press feedback, which is why a pressed
 * `Button` and a pressed `ListRow` felt like different products. A state layer
 * is the component's own content colour at one of these opacities, composited
 * over its container — so it works on any ground without knowing what the
 * ground is.
 */
export interface StateLayerTokens {
    hover: number;
    focus: number;
    pressed: number;
    dragged: number;
    /** M3 disables content at 38% and containers at 12%. */
    disabledContent: number;
    disabledContainer: number;
}
/**
 * Motion, on M3's named scale rather than a number somebody liked.
 *
 * Source: `tokens/versions/v0_192/_md-sys-motion.scss`. The full scale runs
 * 50–1000ms; these are the four an interface component actually needs, plus
 * the two easings that matter — `standard` for a state change, and
 * `emphasizedDecelerate` for something entering the screen.
 *
 * `design.md` §36.2 asks that motion feel fast and §36.3 that easing match the
 * action; naming them here is what stops each component picking 180ms because
 * it looked about right.
 */
/**
 * Focus-ring geometry.
 *
 * The colour became a token; the width and offset stayed literal `2px` in
 * seven places. Same class of gap — a focus indicator is an accessibility
 * affordance and should be identical on every control, geometry included.
 */
export interface RingTokens {
    width: number;
    offset: number;
}
export interface MotionTokens {
    /** 50ms — a state layer appearing. */
    instant: number;
    /** 100ms — a small state change. */
    quick: number;
    /** 200ms — the default for a control. */
    standard: number;
    /** 400ms — something entering or leaving the screen. */
    enter: number;
    /** cubic-bezier(0.2, 0, 0, 1) — state changes. */
    easingStandard: readonly [number, number, number, number];
    /** cubic-bezier(0.05, 0.7, 0.1, 1) — arrivals. */
    easingEnter: readonly [number, number, number, number];
    /** cubic-bezier(0.3, 0, 1, 1) — exits. */
    easingExit: readonly [number, number, number, number];
}
export interface ElevationTokens {
    /** A card lifted off the page. */
    card: ElevationToken;
    /** A sheet or a sticky footer, above scrolling content. */
    sheet: ElevationToken;
    /** The primary action, when depth is not `'flat'`. */
    action: ElevationToken;
}
/**
 * Semantic color slots for one mode. Every `onX`/`X` pair is guaranteed by
 * the compiler to have a WCAG 2.1 contrast ratio of at least 4.5:1.
 */
export interface SemanticColors {
    surface: string;
    onSurface: string;
    primary: string;
    onPrimary: string;
    accent: string;
    onAccent: string;
    /** De-emphasized text/icon color (not part of a contrast-guaranteed pair). */
    muted: string;
    /**
     * Muted text that is actually readable.
     *
     * `muted` is `neutral[600]` and carries NO contrast promise — the compiler
     * guarantees `onX`/`X` pairs only. Every secondary caption, field hint,
     * disabled row and `+N` chip in the kit was reaching for it as text and
     * landing wherever the ramp happened to be, and each component was applying
     * `ensureContrast` by hand to recover.
     *
     * shadcn/ui carries `--muted-foreground` beside `--muted` for exactly this
     * reason (its token vocabulary was reviewed 2026-08-26). This is that slot:
     * `muted`, corrected against `surface` to AA, once, here.
     */
    mutedText: string;
    /**
     * Focus ring.
     *
     * shadcn/ui has `--ring` as a first-class token and the kit had nothing —
     * so every V4 component derived its own focus halo from the brand ramp and
     * they did not match. A focus indicator is an accessibility affordance, not
     * a decoration, and it should look identical on every control.
     */
    ring: string;
    /**
     * The brand and status colors again, but darkened or lightened until they
     * clear WCAG AA **as text on `surface`**.
     *
     * `primary` and its siblings are FILL colors: the compiler guarantees
     * `onPrimary` against `primary`, and promises nothing about `primary` against
     * `surface`. Components reached for them as text anyway — the obvious thing to
     * do for a link, a chart key, a filled star, a validation asterisk — and a
     * rendered audit measured the result as low as 1.32:1.
     *
     * These are that same fix applied once, by the same `ensureContrast` the
     * on-pairs already use, instead of six components each guessing. Use them
     * wherever a brand or status color is the TEXT; keep using the plain slots
     * wherever it is the background.
     */
    primaryText: string;
    accentText: string;
    successText: string;
    warnText: string;
    dangerText: string;
    border: string;
    /**
     * The border of a form control, distinct from a divider.
     *
     * One `border` token was doing three jobs: a table hairline, a card edge and
     * a field outline. So a seed could not make form controls more present
     * without thickening every divider in the product. shadcn/ui carries
     * `--input` beside `--border` for exactly this (vocabulary reviewed
     * 2026-08-26). A field outline must be a little more present than a rule
     * between rows, because a field is asking to be typed in.
     */
    input: string;
    /**
     * A raised surface — a card, a tile, a panel that sits above the page.
     *
     * **This is the token whose absence made dark mode look flat.** The kit had
     * exactly one `surface`, so a raised thing could only be signalled with a
     * shadow — and a shadow on a near-black page is nearly invisible. M3 and
     * shadcn both *lighten* a raised surface instead, which is what actually
     * reads as "above" in the dark. `CardV4` was faking it with
     * `color-mix(surface 72%, transparent)`.
     *
     * Moves toward white in BOTH schemes: on a light page a raised card is
     * whiter than the page; on a dark page it is lighter than the page. Raised
     * is not "further from the text colour", it is "closer to the light".
     */
    card: string;
    /** Text on `card`. Usually equals `onSurface`; guaranteed against `card`. */
    onCard: string;
    /**
     * A floating surface — a menu, a popover, a tooltip, a sheet. One step
     * further from the page than `card`, for the same reason.
     */
    popover: string;
    /** Text on `popover`. */
    onPopover: string;
    /**
     * The container behind a selected or hovered row.
     *
     * `accentText` existed but nothing named the *fill*, so the "chosen row"
     * tint was invented three separate times in the V4 line (0.12, 14, 0.12).
     * shadcn's `accent`/`accent-foreground` pair is exactly this.
     */
    selected: string;
    /** Text on `selected`. */
    onSelected: string;
    success: string;
    onSuccess: string;
    warn: string;
    onWarn: string;
    danger: string;
    onDanger: string;
}
/** Border-radius scale in px (numbers so React Native can consume directly). */
export interface RadiusScale {
    sm: number;
    md: number;
    lg: number;
    full: number;
}
/** Spacing scale in px. */
export interface SpacingScale {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
}
/** Font-size scale in px. */
export interface TypeScale {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
}
export interface Typography {
    fontHeading: string;
    fontBody: string;
    scale: TypeScale;
}
/**
 * The compiler output. Never hand-written, never LLM-written — always the
 * result of `compileTheme(seed)`.
 */
export interface CompiledTheme {
    /** The seed this theme was compiled from (echoed back for provenance). */
    seed: ThemeSeed;
    /** Full 11-step ramps (light-mode orientation; dark mode inverts them). */
    ramps: {
        primary: ColorRamp;
        accent: ColorRamp;
        neutral: ColorRamp;
    };
    /** Semantic slots for light mode. */
    light: SemanticColors;
    /** Semantic slots for dark mode (derived by ramp inversion). */
    dark: SemanticColors;
    radius: RadiusScale;
    spacing: SpacingScale;
    typography: Typography;
    /** Resolved depth (the seed's, or `'soft'`). */
    depth: ThemeDepth;
    /** Brand gradients for light mode. */
    lightGradient: GradientTokens;
    /** Brand gradients for dark mode. */
    darkGradient: GradientTokens;
    /** Translucent panel treatment per scheme. */
    lightGlass: GlassTokens;
    darkGlass: GlassTokens;
    /** Shadows per scheme — a shadow on a dark page needs more opacity, not less. */
    lightElevation: ElevationTokens;
    darkElevation: ElevationTokens;
    /** M3 state-layer opacities. Scheme-independent — they are opacities. */
    state: StateLayerTokens;
    /** M3 motion scale. Scheme-independent. */
    motion: MotionTokens;
    /** Focus-ring geometry. Scheme-independent. */
    ring: RingTokens;
}
//# sourceMappingURL=types.d.ts.map