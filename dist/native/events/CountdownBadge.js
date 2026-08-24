"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountdownBadge = CountdownBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
const TONE_BG = {
    primary: 'primary',
    accent: 'accent',
    neutral: 'border',
};
const TONE_FG = {
    primary: 'onPrimary',
    accent: 'onAccent',
    neutral: 'onSurface',
};
const pad = (n) => String(n).padStart(2, '0');
/**
 * Countdown to an event. Accepts an absolute `target` (measured against `now`)
 * or explicit `remainingMs`. `inline` renders a single chip (`3d 04h 12m`);
 * `blocks` renders separate dd / hh / mm tiles. Once elapsed it shows
 * `elapsedLabel`. This is a pure display component — it does not tick on its
 * own; the host re-renders with a fresh `now`/`remainingMs`. Colors come from
 * the compiled theme tokens; no literal colors.
 */
function CountdownBadge({ target, remainingMs, now, label, elapsedLabel = 'Started', variant = 'inline', tone = 'primary', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const ms = typeof remainingMs === 'number'
        ? remainingMs
        : target
            ? target.getTime() - (now ?? new Date()).getTime()
            : 0;
    const parts = (0, format_1.countdownParts)(ms);
    const bg = colors[TONE_BG[tone]];
    const fg = colors[TONE_FG[tone]];
    const a11y = parts.elapsed
        ? elapsedLabel
        : `${label ? `${label} ` : ''}${parts.days} days ${parts.hours} hours ${parts.minutes} minutes`;
    if (parts.elapsed) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, style: [
                { alignSelf: 'flex-start', borderRadius: tokens.radius.full, backgroundColor: colors.border, paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md },
                style,
            ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: elapsedLabel }) }));
    }
    if (variant === 'blocks') {
        const blocks = [
            { value: pad(parts.days), unit: 'DAY' },
            { value: pad(parts.hours), unit: 'HR' },
            { value: pad(parts.minutes), unit: 'MIN' },
        ];
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [{ gap: tokens.spacing.xs }, style], children: [label ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label }) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: blocks.map((b) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', minWidth: tokens.spacing['2xl'] + tokens.spacing.sm, borderRadius: tokens.radius.md, backgroundColor: bg, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: b.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.xs, letterSpacing: 1 }, children: b.unit })] }, b.unit))) })] }));
    }
    const compact = `${parts.days > 0 ? `${parts.days}d ` : ''}${pad(parts.hours)}h ${pad(parts.minutes)}m`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [
            { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: bg, paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md },
            style,
        ], children: [label ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: compact })] }));
}
//# sourceMappingURL=CountdownBadge.js.map