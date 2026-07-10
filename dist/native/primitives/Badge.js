"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = Badge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Maps a tone to its [background, foreground] semantic slots. */
const TONE = {
    neutral: ['border', 'onSurface'],
    primary: ['primary', 'onPrimary'],
    success: ['success', 'onSuccess'],
    warn: ['warn', 'onWarn'],
    danger: ['danger', 'onDanger'],
};
/**
 * Small status/label pill — the native mirror of the web `Badge`. Token-bound
 * background/foreground per tone; for statuses, tags, counts. No literal colors.
 */
function Badge({ tone = 'neutral', style, children }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [bg, fg] = TONE[tone];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: colors[bg],
                borderRadius: tokens.radius.full,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: children })) : (children) }));
}
//# sourceMappingURL=Badge.js.map