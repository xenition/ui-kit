"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordButton = RecordButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
const DIAM = { sm: 40, md: 56, lg: 72 };
/**
 * A record toggle button — a UI shell only, it captures nothing. Shows a
 * record affordance that morphs from a dot (idle) to a rounded square
 * (recording); the state is surfaced in the a11y label + `selected` state and
 * the shape change, never color alone. Pressing fires `onToggle(next)`. The
 * `labeled` variant adds a "Rec"/"Stop" label and an elapsed timer. Uses the
 * `danger` token for the record accent; no literal colors.
 */
function RecordButton({ recording, variant = 'ring', size = 'md', elapsedSeconds, disabled = false, onToggle, style, }) {
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [button, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: recording ? accent : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: recording ? 'Stop' : 'Rec' }), recording ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: (0, types_1.formatDuration)(elapsedSeconds ?? 0) })) : null] })] }));
}
//# sourceMappingURL=RecordButton.js.map