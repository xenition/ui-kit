"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerativeCoverV4 = GenerativeCoverV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Gradient_1 = require("./internal/Gradient");
const cover_v4_1 = require("../../commerce/internal/cover-v4");
/**
 * Gradient direction per form. The one thing a two-stop gradient can say about
 * a composition, and the base's table kept as-is: a seed that drew `bands` on
 * web keeps drawing top-to-bottom here.
 */
const FORM_DIRS = {
    arc: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
    bands: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
    orbit: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
    grid: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
    wave: { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } },
    stack: { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
};
const RAMP_ROLE = /^(primary|accent|neutral)-(\d+)$/;
/**
 * A colour role → a compiled token colour.
 *
 * A ramp step (`primary-600`) reads the ramp; anything else is looked up as a
 * semantic slot (`surface`, `accent`). An unresolvable role throws rather than
 * returning `undefined`: the base's equivalent returned `undefined` on a miss,
 * which reaches the gradient as an invalid stop and renders a **black plate** —
 * a failure that looks like a design decision. The web twin throws on a bad
 * role for the same reason; the two twins now fail the same way.
 */
function resolveRole(role, tokens, colors, prop) {
    const step = RAMP_ROLE.exec(role);
    if (step) {
        const ramp = tokens.ramps[step[1]];
        const value = ramp[Number(step[2])];
        if (value !== undefined)
            return value;
    }
    else {
        const slot = colors[role];
        if (slot !== undefined)
            return slot;
    }
    throw new Error(`GenerativeCoverV4: invalid ${prop} role "${role}". Use a ramp step like "primary-600" or a semantic slot like "surface" — literal colors are not accepted.`);
}
/**
 * **V4 generative cover (native)** — same props as the web
 * `GenerativeCoverV4`, including defaults, and the same seeded decisions.
 *
 * Three changes from the base, and the third is the one that mattered.
 *
 * 1. **The seed decision is shared, not duplicated.** `form`, `ink` and
 *    `paper` come from `commerce/internal/cover-v4.ts`, the one file both
 *    twins read. The base carried its own copy of FNV-1a and its own step
 *    tables; they happened to agree with the web renderer's and nothing was
 *    keeping them agreeing. See that file for the argument.
 * 2. **The plate reads at thumbnail size.** A light `accent` mark on a
 *    saturated `primary` ground, rather than the base's accent-over-primary
 *    mid-tones, which for some seeds landed two similar values on top of each
 *    other and dissolved into a flat rectangle.
 * 3. **The initials are gone.** The base overlaid the label's initials on the
 *    art. They are redundant where this component is actually used — a
 *    `ProductCardV4` prints the full title directly beneath — and they were a
 *    contrast promise nothing could keep, since text centred over a gradient
 *    sits on a different colour for every seed. `label` now does the one job
 *    it can do honestly: it is the accessible name, and its absence makes the
 *    cover decorative.
 *
 * `expo-linear-gradient` stays optional, exactly as the base had it: with no
 * native module present the `Gradient` wrapper degrades to a solid token fill
 * rather than hard-requiring a peer.
 */
function GenerativeCoverV4({ seed, label, form, ink, paper, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const plate = (0, cover_v4_1.resolveCoverPlate)(seed, form, ink, paper);
    const paperColor = resolveRole(plate.paper, tokens, colors, 'paper');
    const inkColor = resolveRole(plate.ink, tokens, colors, 'ink');
    const dir = FORM_DIRS[plate.form];
    // Announced as an image when named, invisible to the accessibility tree when
    // not — the same contract the web twin gets from `role="img"` / `aria-hidden`.
    const a11y = label !== undefined
        ? { accessible: true, accessibilityRole: 'image', accessibilityLabel: label }
        : {
            accessibilityElementsHidden: true,
            importantForAccessibility: 'no-hide-descendants',
        };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { ...a11y, style: [{ flex: 1, overflow: 'hidden' }, style], children: (0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [paperColor, inkColor], start: dir.start, end: dir.end, style: { flex: 1 } }) }));
}
//# sourceMappingURL=GenerativeCoverV4.js.map