"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETABarV4 = ETABarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
const ETA_META = {
    'on-time': { glyph: '⏱', label: 'On time', tone: 'success' },
    ahead: { glyph: '⚡', label: 'Ahead', tone: 'primary' },
    delayed: { glyph: '⏳', label: 'Delayed', tone: 'warn' },
    arrived: { glyph: '✓', label: 'Arrived', tone: 'success' },
};
/**
 * ETABar — **V4** "dispatch" design (native twin of the web V4). The confident,
 * operations-desk take on a journey/ETA bar: an elevated rounded card with a soft
 * shadow, a labelled glyph + word punctuality badge (never color alone), a big
 * legible **tabular-nums** ETA, a token fill sized to `progress`, and an
 * origin→destination label row. Exposes a `progressbar` role with
 * `accessibilityValue` so completion is announced, not inferred from the fill
 * color. Token-only colors via `useXenitionTheme()`.
 */
function ETABarV4({ progress, status = 'on-time', eta, origin, destination, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = (0, internal_1.clampPct)(progress);
    const meta = ETA_META[status];
    const fill = (0, internal_1.toneColor)(colors, meta.tone);
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: loading ? 'ETA loading' : `${meta.label}${eta ? `, ETA ${eta}` : ''}, ${pct}% complete`, accessibilityValue: loading ? undefined : { min: 0, max: 100, now: pct }, style: [shell, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` }), eta ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface, fontVariant: ['tabular-nums'] }, children: eta }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden' }, children: !loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: fill } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '40%', height: '100%', borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] } })) }), origin || destination ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.xs, color: colors.muted }, children: origin ?? '' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, textAlign: 'right', fontSize: tokens.typography.scale.xs, color: colors.muted }, children: destination ?? '' })] })) : null] }));
}
//# sourceMappingURL=ETABarV4.js.map