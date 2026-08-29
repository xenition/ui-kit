"use strict";
/**
 * The theme compiler: `compileTheme(seed)` — a deterministic, pure function
 * that turns a ~5-value {@link ThemeSeed} into a full {@link CompiledTheme}.
 *
 * Guarantees:
 * - Deterministic: the same seed always deep-equals the same output.
 * - Validated: malformed seeds throw descriptive errors, never "best-effort".
 * - Readable: every semantic `onX`/`X` pair passes WCAG AA (≥ 4.5:1) in both
 *   light and dark mode — enforced by `ensureContrast`, which cannot fail.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOTION = exports.RING = exports.STATE_LAYERS = exports.MIN_CONTRAST = void 0;
exports.compileTheme = compileTheme;
const color_1 = require("./color");
const types_1 = require("./types");
/** Minimum WCAG contrast enforced for every semantic on-pair. */
exports.MIN_CONTRAST = 4.5;
/** Hue rotation applied to `primary` when no `accent` seed is given. */
const ACCENT_HUE_ROTATION = 40;
/** Target lightness per ramp step (light-mode orientation). */
const RAMP_LIGHTNESS = {
    50: 97,
    100: 93,
    200: 85,
    300: 75,
    400: 64,
    500: 54,
    600: 46,
    700: 38,
    800: 30,
    900: 22,
    950: 13,
};
/** Small hue + saturation bias that tints the gray ramp per temperature. */
const NEUTRAL_BASE = {
    warm: { h: 35, s: 6 },
    cool: { h: 220, s: 8 },
    pure: { h: 0, s: 0 },
};
/** Fixed status hues (light-mode lightness; dark mode inverts lightness). */
const STATUS = {
    success: { h: 152, s: 60, l: 36 },
    warn: { h: 42, s: 92, l: 44 },
    danger: { h: 4, s: 72, l: 44 },
};
const RADIUS = {
    sharp: { sm: 0, md: 0, lg: 0, full: 0 },
    rounded: { sm: 4, md: 8, lg: 16, full: 9999 },
    pill: { sm: 8, md: 16, lg: 24, full: 9999 },
};
const SPACING = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48 };
const TYPE_SCALE = { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30 };
const NEUTRALS = ['warm', 'cool', 'pure'];
const SHAPES = ['sharp', 'rounded', 'pill'];
const MODES = ['light', 'dark', 'both'];
function validateSeed(seed) {
    if (typeof seed !== 'object' || seed === null) {
        throw new Error('compileTheme: seed must be an object (see ThemeSeed).');
    }
    if (!(0, color_1.isValidHex)(seed.primary)) {
        throw new Error(`compileTheme: seed.primary must be a hex color like "#7C3AED", got ${JSON.stringify(seed.primary)}.`);
    }
    if (seed.accent !== undefined && !(0, color_1.isValidHex)(seed.accent)) {
        throw new Error(`compileTheme: seed.accent must be a hex color like "#F59E0B" (or omitted), got ${JSON.stringify(seed.accent)}.`);
    }
    if (!NEUTRALS.includes(seed.neutral)) {
        throw new Error(`compileTheme: seed.neutral must be one of ${NEUTRALS.join(' | ')}, got ${JSON.stringify(seed.neutral)}.`);
    }
    if (!SHAPES.includes(seed.shape)) {
        throw new Error(`compileTheme: seed.shape must be one of ${SHAPES.join(' | ')}, got ${JSON.stringify(seed.shape)}.`);
    }
    if (!MODES.includes(seed.mode)) {
        throw new Error(`compileTheme: seed.mode must be one of ${MODES.join(' | ')}, got ${JSON.stringify(seed.mode)}.`);
    }
    if (typeof seed.font !== 'object' ||
        seed.font === null ||
        typeof seed.font.heading !== 'string' ||
        seed.font.heading.trim() === '' ||
        typeof seed.font.body !== 'string' ||
        seed.font.body.trim() === '') {
        throw new Error('compileTheme: seed.font must be { heading: string, body: string } with non-empty names.');
    }
}
/**
 * Build an 11-step ramp from a hue + saturation. Lightness follows the fixed
 * ladder; saturation is eased down at the very light end so tints stay soft.
 */
function buildRamp(h, s) {
    const ramp = {};
    for (const step of types_1.RAMP_STEPS) {
        const sat = step <= 100 ? s * 0.5 : step <= 200 ? s * 0.75 : s;
        ramp[step] = (0, color_1.hslToHex)({ h, s: sat, l: RAMP_LIGHTNESS[step] });
    }
    return ramp;
}
/** Mirror a ramp end-for-end (50 ↔ 950, 100 ↔ 900, …) — the dark-mode ramp. */
function invertRamp(ramp) {
    const inverted = {};
    types_1.RAMP_STEPS.forEach((step, i) => {
        const mirror = types_1.RAMP_STEPS[types_1.RAMP_STEPS.length - 1 - i];
        inverted[step] = ramp[mirror];
    });
    return inverted;
}
/**
 * Derive the semantic slots from a ramp set. The same formula produces both
 * modes: dark mode passes inverted ramps (and inverted status lightness), so
 * "step 50" is always "closest to the surface" and "900" is "highest ink".
 */
function deriveSemantics(ramps, mode) {
    const statusLightness = (l) => (mode === 'light' ? l : 100 - l);
    const surface = ramps.neutral[50];
    const primary = ramps.primary[600];
    const accent = ramps.accent[600];
    const success = (0, color_1.hslToHex)({ ...STATUS.success, l: statusLightness(STATUS.success.l) });
    const warn = (0, color_1.hslToHex)({ ...STATUS.warn, l: statusLightness(STATUS.warn.l) });
    const danger = (0, color_1.hslToHex)({ ...STATUS.danger, l: statusLightness(STATUS.danger.l) });
    return {
        surface,
        onSurface: (0, color_1.ensureContrast)(ramps.neutral[900], surface, exports.MIN_CONTRAST),
        primary,
        onPrimary: (0, color_1.ensureContrast)('#ffffff', primary, exports.MIN_CONTRAST),
        accent,
        onAccent: (0, color_1.ensureContrast)('#ffffff', accent, exports.MIN_CONTRAST),
        muted: ramps.neutral[600],
        border: ramps.neutral[200],
        // A field asks to be typed in, so its outline is one ramp step more
        // present than a rule between rows. See SemanticColors.input.
        input: ramps.neutral[300],
        /*
          Raised and floating surfaces.
    
          Both move TOWARD WHITE in both schemes — which is the part that is easy
          to get wrong. On a light page a raised card is whiter than the page; on a
          dark page it is *lighter* than the page. "Raised" is not "further from
          the text colour", it is "closer to the light", and that is why the kit's
          single `surface` made dark mode look flat: a shadow is nearly invisible
          on near-black, so lightening is the only signal that reads.
    
          The light-mode step is large because `surface` is already near-white and
          only pure white is meaningfully above it; the dark-mode steps are small
          because a few percent is a whole layer down there.
        */
        card: mixHex(surface, '#ffffff', mode === 'light' ? 0.75 : 0.07),
        onCard: (0, color_1.ensureContrast)(ramps.neutral[900], mixHex(surface, '#ffffff', mode === 'light' ? 0.75 : 0.07), exports.MIN_CONTRAST),
        popover: mixHex(surface, '#ffffff', mode === 'light' ? 1 : 0.12),
        onPopover: (0, color_1.ensureContrast)(ramps.neutral[900], mixHex(surface, '#ffffff', mode === 'light' ? 1 : 0.12), exports.MIN_CONTRAST),
        // The chosen row. Named once, so it stops being invented per component.
        selected: mixHex(surface, ramps.primary[600], mode === 'light' ? 0.12 : 0.2),
        onSelected: (0, color_1.ensureContrast)(ramps.neutral[900], mixHex(surface, ramps.primary[600], mode === 'light' ? 0.12 : 0.2), exports.MIN_CONTRAST),
        success,
        onSuccess: (0, color_1.ensureContrast)('#ffffff', success, exports.MIN_CONTRAST),
        warn,
        onWarn: (0, color_1.ensureContrast)('#ffffff', warn, exports.MIN_CONTRAST),
        danger,
        onDanger: (0, color_1.ensureContrast)('#ffffff', danger, exports.MIN_CONTRAST),
        /*
          The same colors as TEXT, pushed until they are readable on `surface`.
    
          Every slot above answers "what goes ON this fill". Nothing answered "what
          if this color IS the text" — so components used the fill directly, which
          carries no guarantee at all. `ensureContrast` is the same routine the
          on-pairs use and cannot fail: it walks lightness until the ratio clears,
          keeping hue and saturation, so a brand color still reads as the brand.
    
          A fill and its text form are often the same value already — a mid-600 ramp
          step usually clears AA on a 50 surface — in which case ensureContrast
          returns it untouched and nothing changes visually.
        */
        primaryText: (0, color_1.ensureContrast)(primary, surface, exports.MIN_CONTRAST),
        // `muted` is a ramp step with no promise; this is the same colour pulled
        // to AA against the surface it is read on. See SemanticColors.mutedText.
        mutedText: (0, color_1.ensureContrast)(ramps.neutral[600], surface, exports.MIN_CONTRAST),
        // One ring for every control, so focus looks the same everywhere.
        ring: (0, color_1.ensureContrast)(primary, surface, 3),
        accentText: (0, color_1.ensureContrast)(accent, surface, exports.MIN_CONTRAST),
        successText: (0, color_1.ensureContrast)(success, surface, exports.MIN_CONTRAST),
        warnText: (0, color_1.ensureContrast)(warn, surface, exports.MIN_CONTRAST),
        dangerText: (0, color_1.ensureContrast)(danger, surface, exports.MIN_CONTRAST),
    };
}
/**
 * Compile a {@link ThemeSeed} into a full {@link CompiledTheme}.
 *
 * Pure and deterministic — safe to run at build time, on the server, or in
 * the browser; the same seed always produces a deep-equal theme.
 *
 * @throws {Error} with a descriptive message if the seed is malformed.
 */
/* ── depth ─────────────────────────────────────────────────────────────────
 *
 * Gradients, glass and elevation, derived from the same ramps the semantic
 * slots come from — so they move with the brand rather than being chosen
 * beside it.
 *
 * `design.md` §35.11 asks that gradients stay "rare and purposeful" and §8
 * bans "glassmorphism without purpose". The compiler enforces that by
 * offering exactly THREE gradients and one glass treatment: there is a brand
 * gradient for the hero and the single primary action, a near-invisible page
 * wash, and a neutral placeholder. There is deliberately no `gradient.card`
 * or `gradient.icon`, because a kit that offers one will get one on every
 * card and every icon.
 */
/** Mix two hexes. `t` is how far to travel from `a` to `b`. */
function mixHex(a, b, t) {
    const x = (0, color_1.hexToRgb)(a);
    const y = (0, color_1.hexToRgb)(b);
    return (0, color_1.rgbToHex)({
        r: Math.round(x.r + (y.r - x.r) * t),
        g: Math.round(x.g + (y.g - x.g) * t),
        b: Math.round(x.b + (y.b - x.b) * t),
    });
}
/** `#rrggbb` + alpha → `#rrggbbaa`, the form both platforms accept. */
function withAlpha(hex, alpha) {
    const a = Math.round(Math.min(Math.max(alpha, 0), 1) * 255);
    return `${hex}${a.toString(16).padStart(2, '0')}`;
}
function buildGradients(ramps, scheme) {
    const deep = scheme === 'light' ? 500 : 400;
    const far = scheme === 'light' ? 600 : 300;
    const ground = scheme === 'light' ? 50 : 900;
    return {
        // primary → accent, travelling up-right: the direction a reader's eye
        // already moves, so the brighter stop lands under the thumb.
        brand: { from: ramps.primary[deep], to: ramps.accent[far], angle: 45 },
        // Barely there by design. A page ground you can NOTICE is a page ground
        // competing with the content on it.
        wash: { from: ramps.primary[ground], to: ramps.neutral[ground], angle: 0 },
        muted: { from: ramps.neutral[ground], to: ramps.neutral[scheme === 'light' ? 100 : 800], angle: 45 },
    };
}
function buildGlass(semantics, scheme) {
    // Pre-composited against the surface, because React Native has no
    // backdrop-filter. A component that assumed a real blur would crash in
    // every app that has not installed a BlurView; `blur` is offered for the
    // apps that HAVE one, and ignored by the ones that have not.
    const base = scheme === 'light' ? '#ffffff' : '#000000';
    return {
        tint: withAlpha(mixHex(semantics.surface, base, scheme === 'light' ? 0.55 : 0.35), 0.72),
        border: withAlpha(base === '#ffffff' ? '#ffffff' : semantics.border, scheme === 'light' ? 0.6 : 0.22),
        blur: 24,
    };
}
function buildElevation(scheme) {
    // A shadow on a dark page needs MORE opacity, not less — the same alpha
    // that reads as a soft lift on white is invisible on near-black.
    const color = '#000000';
    const k = scheme === 'light' ? 1 : 1.9;
    return {
        card: { color, opacity: 0.08 * k, radius: 12, offsetY: 4, android: 2 },
        sheet: { color, opacity: 0.12 * k, radius: 24, offsetY: -2, android: 8 },
        action: { color, opacity: 0.18 * k, radius: 16, offsetY: 6, android: 6 },
    };
}
/**
 * Material Design 3's state-layer opacities and motion scale, used verbatim.
 *
 * Source: `material-components/material-web`, tokens v0_192, fetched
 * 2026-08-26. These are not invented and should not be tuned — the value of
 * an industry scale is that it is the same everywhere, and a component that
 * picks its own 0.09 has thrown that away for nothing.
 */
exports.STATE_LAYERS = {
    hover: 0.08,
    focus: 0.12,
    pressed: 0.12,
    dragged: 0.16,
    disabledContent: 0.38,
    disabledContainer: 0.12,
};
exports.RING = { width: 2, offset: 2 };
exports.MOTION = {
    instant: 50,
    quick: 100,
    standard: 200,
    enter: 400,
    easingStandard: [0.2, 0, 0, 1],
    easingEnter: [0.05, 0.7, 0.1, 1],
    easingExit: [0.3, 0, 1, 1],
};
/**
 * Make the depth tokens inert without removing them, so **no component has to
 * branch on `depth`**. A component consumes `gradient.brand` and
 * `elevation.card` unconditionally, and a flat seed simply renders flat.
 *
 * **`glass` is never neutralised, at any depth.** That looks inconsistent and
 * is not. Gradients and shadows arrive UNINVITED — a component paints them
 * without being asked, so a flat seed must be able to switch them off at the
 * source. Glass never arrives uninvited: the only ways to get it are to reach
 * for `GlassPanel`, or for a component to check `depth === 'glass'` first. The
 * purpose `design.md` §8 demands is supplied by the caller, so the token stays
 * real and the discipline lives in *who consumes it*:
 *
 *   - a component whose whole job is glass (`GlassPanel`) may use the tokens
 *     at any depth — asking for it IS the purpose;
 *   - a component that merely COULD be glass (`CardV4`) must check
 *     `depth === 'glass'` first, because a card frosting itself is an app-wide
 *     aesthetic decision and not one a card gets to make.
 */
function inert(depth, g, gl, e) {
    const solid = (t) => ({ from: t.from, to: t.from, angle: t.angle });
    const none = (t) => ({ ...t, opacity: 0, radius: 0, offsetY: 0, android: 0 });
    if (depth === 'flat') {
        return {
            gradient: { brand: solid(g.brand), wash: solid(g.wash), muted: solid(g.muted) },
            glass: gl,
            elevation: { card: none(e.card), sheet: none(e.sheet), action: none(e.action) },
        };
    }
    return { gradient: g, glass: gl, elevation: e };
}
function compileTheme(seed) {
    validateSeed(seed);
    const primaryHsl = (0, color_1.hexToHsl)(seed.primary);
    const accentHsl = seed.accent !== undefined
        ? (0, color_1.hexToHsl)(seed.accent)
        : { ...primaryHsl, h: (primaryHsl.h + ACCENT_HUE_ROTATION) % 360 };
    const ramps = {
        primary: buildRamp(primaryHsl.h, primaryHsl.s),
        accent: buildRamp(accentHsl.h, accentHsl.s),
        neutral: buildRamp(NEUTRAL_BASE[seed.neutral].h, NEUTRAL_BASE[seed.neutral].s),
    };
    const darkRamps = {
        primary: invertRamp(ramps.primary),
        accent: invertRamp(ramps.accent),
        neutral: invertRamp(ramps.neutral),
    };
    const light = deriveSemantics(ramps, 'light');
    const dark = deriveSemantics(darkRamps, 'dark');
    const depth = seed.depth ?? 'soft';
    const lightDepth = inert(depth, buildGradients(ramps, 'light'), buildGlass(light, 'light'), buildElevation('light'));
    const darkDepth = inert(depth, buildGradients(darkRamps, 'dark'), buildGlass(dark, 'dark'), buildElevation('dark'));
    return {
        seed: { ...seed, font: { ...seed.font } },
        ramps,
        light,
        dark,
        radius: { ...RADIUS[seed.shape] },
        spacing: { ...SPACING },
        typography: {
            fontHeading: seed.font.heading,
            fontBody: seed.font.body,
            scale: { ...TYPE_SCALE },
        },
        depth,
        lightGradient: lightDepth.gradient,
        darkGradient: darkDepth.gradient,
        lightGlass: lightDepth.glass,
        darkGlass: darkDepth.glass,
        lightElevation: lightDepth.elevation,
        darkElevation: darkDepth.elevation,
        state: { ...exports.STATE_LAYERS },
        motion: { ...exports.MOTION },
        ring: { ...exports.RING },
    };
}
//# sourceMappingURL=compile.js.map