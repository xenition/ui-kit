"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordButtonV4 = RecordButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/** RecordButton's OWN size scale (sm/md/lg) — distinct from Icon sizes. */
const DIAM = { sm: 44, md: 56, lg: 72 };
/**
 * RecordButton — **V4** "session" design (native parity of the web V4). The
 * tactile arm/record control: a round `danger`-token button whose glyph
 * **morphs from a ● dot (idle) to a rounded ■ square (recording)** and adds a
 * leading `●` marker + "Rec"/"Stop" label in the `labeled` variant — the state
 * is surfaced by shape, marker and label, **never color alone**. Honors every
 * `variant` (`ring` outlined, `solid` filled, `labeled` ring + text/timer) and
 * `size` (`sm`/`md`/`lg`, its own ≥44px scale). Pressing fires `onToggle(next)`;
 * the `labeled` variant shows the `elapsedSeconds` timer while recording. No
 * gradient — clean/tactile. Token-only colors via `useXenitionTheme()`.
 */
function RecordButtonV4({ recording, variant = 'ring', size = 'md', elapsedSeconds, disabled = false, onToggle, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const diam = DIAM[size];
    const accent = colors.danger;
    const solid = variant === 'solid';
    const button = ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: recording ? 'Stop recording' : 'Start recording', accessibilityState: { selected: recording, disabled }, disabled: disabled, onPress: () => onToggle?.(!recording), style: ({ pressed }) => ({
            width: diam,
            height: diam,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            borderWidth: solid ? 0 : 3,
            borderColor: accent,
            backgroundColor: solid ? accent : (0, types_1.withAlpha)(accent, recording ? 0.18 : 0),
            opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                // Dot when idle, rounded square when recording (shape = state).
                width: recording ? diam * 0.36 : diam * 0.5,
                height: recording ? diam * 0.36 : diam * 0.5,
                borderRadius: recording ? tokens.radius.sm : tokens.radius.full,
                backgroundColor: solid ? colors.onDanger : accent,
            } }) }));
    if (variant !== 'labeled') {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: button });
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [button, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: accent } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: recording ? accent : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: recording ? 'Stop' : 'Rec' })] }), recording ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', fontVariant: ['tabular-nums'] }, children: (0, types_1.formatDuration)(elapsedSeconds ?? 0) })) : null] })] }));
}
//# sourceMappingURL=RecordButtonV4.js.map