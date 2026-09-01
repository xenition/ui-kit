"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenHouseBadgeV4 = OpenHouseBadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS = {
    upcoming: { glyph: '📅', prefix: 'Open house' },
    live: { glyph: '🟢', prefix: 'Open now' },
    ended: { glyph: '✓', prefix: 'Ended' },
};
/**
 * OpenHouseBadge — **V4** "listing" design. The editorial take on the
 * open-house indicator: a calendar glyph and the date/time window inside a
 * soft-primary tinted pill, promoting to a success-toned "open now" pill for the
 * live state. Same props/behavior as {@link OpenHouseBadgeProps}; still pure
 * presentation (strings in, no callbacks). The full window is announced as a
 * single phrase, and status is conveyed by icon + label, not color alone.
 * Token-only colors via `useXenitionTheme()` + `withAlpha`.
 */
function OpenHouseBadgeV4({ dateLabel, startTime, endTime, status = 'upcoming', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const { glyph, prefix } = STATUS[status];
    const window = [startTime, endTime].filter(Boolean).join('–');
    const label = `${prefix} · ${dateLabel}${window ? ` ${window}` : ''}`;
    // ONE accent = primary; the live state promotes to the success token. Status
    // is carried by icon + label, tint only reinforces it.
    const accent = status === 'live' ? colors.success : status === 'ended' ? colors.onSurface : colors.primary;
    const tintAlpha = status === 'live' ? 0.15 : status === 'ended' ? 0.05 : 0.1;
    const borderAlpha = status === 'ended' ? 0.2 : 0.25;
    const textColor = status === 'ended' ? colors.muted : colors.onSurface;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: label, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: (0, color_1.withAlpha)(accent, borderAlpha),
                backgroundColor: (0, color_1.withAlpha)(accent, tintAlpha),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: textColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: prefix }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "\u00B7" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: textColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: dateLabel }), window ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: window })) : null] }));
}
//# sourceMappingURL=OpenHouseBadgeV4.js.map