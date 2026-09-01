"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinLossBadgeV4 = WinLossBadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const internal_1 = require("./internal");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 win/loss badge** — same props as {@link WinLossBadge} plus
 * `outcomeLabels`.
 *
 * ## Four changes
 *
 * 1. **`size` is honoured in the `badge` variant.** On web it was destructured
 *    and read only in the `inline` branch, never forwarded to `Badge` — so
 *    `DealCard` passing `size="sm"` got an `sm` badge on native and an `md`
 *    one on web, from identical props. It is forwarded on both, over the
 *    shared `BADGE_V4` shape.
 * 2. **One pill on both platforms.** Web took `Badge`'s `solid` default while
 *    native passed `variant="soft"`, so a won deal was a saturated green pill
 *    on one platform and a tinted chip on the other — the module's single most
 *    repeated element, drawn two ways (rule C).
 * 3. **The `inline` variant is one reader stop.** The glyph and the label were
 *    two sibling `Text` nodes under a label on a `View` that was not backed by
 *    `accessible`, so the badge announced twice or not at all.
 * 4. **The glyph scales with Dynamic Type.** It carried
 *    `allowFontScaling={false}` while the word beside it scaled, so at large
 *    text sizes the pair came apart.
 */
function WinLossBadgeV4({ outcome, variant = 'badge', size = 'md', hideLabel = false, outcomeLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const meta = internal_1.OUTCOME_META[outcome];
    const word = outcomeLabels?.[outcome] ?? meta.label;
    const label = `${word} deal`;
    if (variant === 'inline') {
        const ink = (0, crm_v4_1.toneInkOf)(theme, meta.tone);
        const step = size === 'sm' ? 'xs' : 'sm';
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: label, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: step, style: { color: ink }, children: meta.glyph }), hideLabel ? null : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: step, weight: "semibold", style: { color: ink }, children: word }))] }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: label, style: [{ alignSelf: 'flex-start' }, style], children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...crm_v4_1.BADGE_V4, tone: meta.tone, size: size, children: hideLabel ? meta.glyph : `${meta.glyph} ${word}` }) }));
}
//# sourceMappingURL=WinLossBadgeV4.js.map