"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockControlV4 = LockControlV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATE_META = {
    locked: { glyph: '🔒', label: 'Locked', accent: 'primary', tone: 'primary', glow: false },
    unlocked: { glyph: '🔓', label: 'Unlocked', accent: 'warn', tone: 'warn', glow: true },
    jammed: { glyph: '⚠️', label: 'Jammed', accent: 'danger', tone: 'danger', glow: false },
    offline: { glyph: '🚫', label: 'Offline', accent: 'muted', tone: 'neutral', glow: false },
};
/**
 * LockControl — **V4** "ambient" design. A calm control-panel lock: a **big state
 * glyph sits in a state-tinted disc** — `locked` takes the primary slot,
 * `unlocked` glows softly (warn wash + shadow) so an open lock reads at a glance,
 * `jammed`→danger, `offline`→muted. A status {@link Badge} + optional low-battery
 * hint keep the meaning textual (never color alone), over a single big
 * lock/unlock {@link Button} (≥44px). The action flips between "Lock"/"Unlock",
 * is danger-toned when unlocking, and is disabled when `offline`/`jammed` or
 * `busy` (which also shows a spinner). Same props/behavior as
 * {@link LockControlProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`.
 */
function LockControlV4({ name, state = 'locked', batteryPct, onToggle, busy = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATE_META[state];
    const isLocked = state === 'locked';
    const actionable = state === 'locked' || state === 'unlocked';
    const lowBattery = typeof batteryPct === 'number' && batteryPct <= 20;
    const accent = colors[meta.accent];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: [
            { opacity: state === 'offline' ? 0.7 : 1 },
            meta.glow
                ? { shadowColor: accent, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
                : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 48,
                            height: 48,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.12),
                            borderWidth: 1,
                            borderColor: (0, color_1.withAlpha)(accent, meta.glow ? 0.5 : 0.4),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, color: meta.accent, size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: 2 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }), typeof batteryPct === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: lowBattery ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs }, children: `🔋 ${Math.round(Math.min(Math.max(batteryPct, 0), 100))}%` })) : null] })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", tone: isLocked ? 'default' : 'danger', disabled: !actionable, loading: busy, onPress: () => onToggle?.(!isLocked), children: state === 'offline' ? 'Unavailable' : state === 'jammed' ? 'Jammed' : isLocked ? 'Unlock' : 'Lock' }) })] }));
}
//# sourceMappingURL=LockControlV4.js.map