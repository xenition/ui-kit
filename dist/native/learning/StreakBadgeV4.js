"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreakBadgeV4 = StreakBadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const TONE_COLOR = {
    primary: 'primary',
    accent: 'accent',
    warn: 'warn',
    success: 'success',
};
const SIZE_FONT = {
    sm: { count: 'lg', unit: 'xs' },
    md: { count: 'xl', unit: 'xs' },
    lg: { count: '2xl', unit: 'sm' },
};
/**
 * StreakBadge — **V4** "campus" design (native twin of the web V4). A gamified
 * streak pill on a tone-tinted well: a flame glyph + the **tabular-nums** streak
 * count and unit. A zero streak degrades to a muted prompt instead of a "0"
 * badge. The count uses a semantic `tone` color. Token-only colors via
 * `useXenitionTheme()`.
 */
function StreakBadgeV4({ count, unit = 'day', tone = 'warn', glyph = '🔥', size = 'md', emptyLabel = 'Start your streak', style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const font = SIZE_FONT[size];
    const toneColor = colors[TONE_COLOR[tone]];
    if (count <= 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, alignSelf: 'flex-start', paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base, opacity: 0.5 }, children: glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }));
    }
    const unitLabel = `${unit}${count === 1 ? '' : 's'}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${count} ${unitLabel} streak`, style: [{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, alignSelf: 'flex-start', paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(toneColor, 0.12) }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: toneColor, fontSize: tokens.typography.scale[font.count], fontWeight: '800', fontVariant: ['tabular-nums'] }, children: count }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale[font.unit] }, children: unitLabel })] }));
}
//# sourceMappingURL=StreakBadgeV4.js.map