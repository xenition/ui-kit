"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorBadge = BehaviorBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const TONE_META = {
    positive: { glyph: '👍', badge: 'success', sign: '+' },
    negative: { glyph: '👎', badge: 'danger', sign: '−' },
    neutral: { glyph: '•', badge: 'neutral', sign: '' },
};
/**
 * A compact behavior chip for logging conduct: an icon + label, optionally with
 * a signed point value. Positive/negative is conveyed by the glyph and the
 * numeric sign in addition to the badge tone (never color alone). Delegates all
 * color to the shared `Badge` primitive — token-only.
 */
function BehaviorBadge({ label, tone = 'neutral', points, icon, size = 'md', onPress, }) {
    const meta = TONE_META[tone] ?? TONE_META.neutral;
    const glyph = icon ?? meta.glyph;
    const pointsLabel = typeof points === 'number' ? ` (${meta.sign}${Math.abs(points)})` : '';
    const a11y = `${tone} behavior: ${label}${pointsLabel}`;
    const badge = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.badge, variant: "soft", size: size, children: `${glyph} ${label}${pointsLabel}` }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ alignSelf: 'flex-start', opacity: pressed ? 0.7 : 1 }), children: badge }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, style: { alignSelf: 'flex-start' }, children: badge }));
}
//# sourceMappingURL=BehaviorBadge.js.map