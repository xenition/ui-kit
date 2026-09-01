"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureLockCardV4 = FeatureLockCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const flow_v4_1 = require("./internal/flow-v4");
/** How far the preview is dimmed — M3's `disabledContent`, the "not yours yet" opacity. */
const PREVIEW_OPACITY = 0.38;
/** At most this many benefit lines. A gate that lists six is a feature page. */
const MAX_BENEFITS = 3;
/**
 * **V4 locked-feature teaser** — same props as {@link FeatureLockCard} plus
 * `accent`, `benefits`, `preview` and `priceHint`.
 *
 * Still drawn as a §8 feature row so a teaser met mid-app reads as the same
 * object as the rows on the paywall it leads to.
 *
 * ## Four changes
 *
 * 1. **The badge tint survives dark mode.** The base branched on `scheme` and
 *    reached into `tokens.ramps.primary[50 | 900]` — the ramps carry the light
 *    orientation in both schemes, so the branch was a workaround for reading
 *    the wrong tokens. `flowGrounds()` mixes the tint from resolved semantic
 *    colours instead, which lands on the right side of the page with no
 *    branch, and gives the whole module one tint rather than four copies.
 * 2. **It sells.** `benefits` and `priceHint` — a gate that only names what is
 *    locked is a dead end with a lock on it (§27-28).
 * 3. **The card is raised on `card`, not flat on `surface`.** `CardV4` paints
 *    the raised ground the base line did not have, which is what makes a
 *    teaser inside a scrolling page read as an object rather than as a region.
 * 4. **The glyph takes a contrast-corrected tone.** `primaryText`, not
 *    `primary` — a fill slot used as ink measured as low as 1.3:1 on a pale
 *    seed.
 *
 * `inline` still collapses to a compact borderless row for list contexts, and
 * drops the preview and the price hint with it: a row inside a list is not the
 * place for either. **Renders nothing without a `title`** (§4.5).
 */
function FeatureLockCardV4({ title, description, icon = '🔒', planLabel = 'Pro', unlockLabel = 'Unlock', onUnlock, variant = 'card', accent = 'primary', benefits, preview, priceHint, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, 'plain', accent);
    const { badge } = (0, flow_v4_1.flowMetrics)(theme, 0);
    if (!title)
        return null;
    const lines = benefits?.filter(Boolean).slice(0, MAX_BENEFITS) ?? [];
    const row = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: badge,
                    height: badge,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: grounds.badge,
                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg", accessibilityLabel: "Locked", style: { color: grounds.ink } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", style: { flexShrink: 1 }, children: title }), planLabel ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: accent === 'accent' ? 'accent' : 'primary', size: "sm", children: planLabel })) : null] }), description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: description })) : null] })] }));
    if (variant === 'inline') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style], children: [row, (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", onPress: onUnlock, accessibilityLabel: unlockLabel, children: unlockLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.md }, style], children: [preview ? ((0, jsx_runtime_1.jsx)(react_native_1.View
            // Not interactive and not announced: it is a picture of something the
            // user does not have yet, and a screen reader walking into it would
            // read a UI they cannot reach.
            , { 
                // Not interactive and not announced: it is a picture of something the
                // user does not have yet, and a screen reader walking into it would
                // read a UI they cannot reach.
                accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", pointerEvents: "none", style: {
                    opacity: PREVIEW_OPACITY,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                }, children: preview })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: row }), lines.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: lines.map((line) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm", color: "successText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onSurface", style: { flex: 1 }, children: line })] }, line))) })) : null, (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", onPress: onUnlock, accessibilityLabel: unlockLabel, style: { alignSelf: 'stretch' }, children: unlockLabel }), priceHint ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: priceHint })) : null] }));
}
//# sourceMappingURL=FeatureLockCardV4.js.map