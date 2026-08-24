"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockControl = LockControl;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATE_META = {
    locked: { glyph: '🔒', label: 'Locked', accent: 'success', tone: 'success' },
    unlocked: { glyph: '🔓', label: 'Unlocked', accent: 'warn', tone: 'warn' },
    jammed: { glyph: '⚠️', label: 'Jammed', accent: 'danger', tone: 'danger' },
    offline: { glyph: '🚫', label: 'Offline', accent: 'muted', tone: 'neutral' },
};
/**
 * Smart-lock control — a state glyph + a status {@link Badge} over a single
 * lock/unlock {@link Button}. `state` selects the accent slot and a text label
 * (`locked`→success, `unlocked`→warn, `jammed`→danger, `offline`→muted) so the
 * status reads without color; the action button flips between "Lock"/"Unlock",
 * is danger-toned when unlocking, and is disabled when `offline`/`jammed` or
 * `busy` (which also shows a spinner). Optional `batteryPct` surfaces a low
 * hint under 20%. No literal colors.
 */
function LockControl({ name, state = 'locked', batteryPct, onToggle, busy = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATE_META[state];
    const isLocked = state === 'locked';
    const actionable = state === 'locked' || state === 'unlocked';
    const lowBattery = typeof batteryPct === 'number' && batteryPct <= 20;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: [{ opacity: state === 'offline' ? 0.7 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.surface,
                            borderWidth: 1,
                            borderColor: colors[meta.accent],
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, color: meta.accent, size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: 2 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }), typeof batteryPct === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: lowBattery ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs }, children: `🔋 ${Math.round(Math.min(Math.max(batteryPct, 0), 100))}%` })) : null] })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", tone: isLocked ? 'default' : 'danger', disabled: !actionable, loading: busy, onPress: () => onToggle?.(!isLocked), children: state === 'offline' ? 'Unavailable' : state === 'jammed' ? 'Jammed' : isLocked ? 'Unlock' : 'Lock' }) })] }));
}
//# sourceMappingURL=LockControl.js.map