"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchmakingStatus = MatchmakingStatus;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
const PHASE_COPY = {
    idle: { title: 'Ready to queue', glyph: '🎯' },
    searching: { title: 'Finding a match…', glyph: '🔎' },
    found: { title: 'Match found!', glyph: '✅' },
    failed: { title: 'Matchmaking failed', glyph: '⚠️' },
};
/**
 * A matchmaking status panel — reflects the queue `phase` with an icon,
 * headline, a live elapsed timer + player-slot readout, and phase-appropriate
 * actions (Cancel while searching, Accept when found, Retry on failure). While
 * `searching` it shows a spinner; the phase is announced via the accessible
 * label (never conveyed by color alone). Composes `Card`, `Button`, `Icon`.
 * Token-only.
 */
function MatchmakingStatus({ phase, elapsedSeconds, found, needed, queueLabel, onCancel, onAccept, onRetry, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const copy = PHASE_COPY[phase];
    const searching = phase === 'searching';
    const slots = needed != null && needed > 0
        ? `${(0, types_1.clamp)(found ?? 0, 0, needed)} / ${needed} players`
        : undefined;
    const accentColor = phase === 'found' ? colors.success : phase === 'failed' ? colors.danger : colors.primary;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: tokens.spacing.md, alignItems: 'center' }, style], accessible: true, accessibilityRole: "summary", accessibilityLabel: `${copy.title}${slots ? `, ${slots}` : ''}${searching && elapsedSeconds != null ? `, ${(0, types_1.formatElapsed)(elapsedSeconds)} elapsed` : ''}`, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    borderWidth: 2,
                    borderColor: accentColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: searching ? ((0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { color: accentColor })) : ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: copy.glyph, size: "2xl", color: "onSurface" })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: copy.title }), queueLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: queueLabel })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, marginTop: 2 }, children: [searching && elapsedSeconds != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: (0, types_1.formatElapsed)(elapsedSeconds) })) : null, slots ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: slots })) : null] })] }), phase === 'found' && onAccept ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", tone: "success", onPress: onAccept, style: { alignSelf: 'stretch' }, accessibilityLabel: "Accept match", children: "Accept" })) : null, phase === 'failed' && onRetry ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onRetry, style: { alignSelf: 'stretch' }, accessibilityLabel: "Retry matchmaking", children: "Retry" })) : null, searching && onCancel ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", tone: "danger", onPress: onCancel, style: { alignSelf: 'stretch' }, accessibilityLabel: "Cancel search", children: "Cancel" })) : null] }));
}
//# sourceMappingURL=MatchmakingStatus.js.map