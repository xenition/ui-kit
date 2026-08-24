"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelBar = LevelBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * An XP / level progress bar — a circular level chip beside a token `Progress`
 * fill sized to `xp / xpMax`, with an optional `xp / xpMax` readout. Guards a
 * zero/negative `xpMax` (renders an empty, non-`NaN` bar) and clamps `xp` into
 * range. The bar carries an `accessibilityValue` so the fraction is announced,
 * not conveyed by color alone. Composes `Progress`. Token-only.
 */
function LevelBar({ level, xp, xpMax, variant = 'default', tone = 'primary', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const max = Number.isFinite(xpMax) && xpMax > 0 ? xpMax : 0;
    const value = max > 0 ? (0, types_1.clamp)(xp, 0, max) : 0;
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    const chip = compact ? 30 : 40;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style], accessible: true, accessibilityLabel: `Level ${level}, ${pct}% to next level`, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: chip,
                    height: chip,
                    borderRadius: chip / 2,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: level }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: value, max: max || 1, tone: tone, size: compact ? 'sm' : 'md' }), !compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${(0, types_1.formatCount)(value)} / ${(0, types_1.formatCount)(max)} XP` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `${pct}%` })] })) : null] })] }));
}
//# sourceMappingURL=LevelBar.js.map