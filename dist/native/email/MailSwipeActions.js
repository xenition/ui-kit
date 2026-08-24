"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailSwipeActions = MailSwipeActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const TONE_BG = {
    neutral: 'muted',
    primary: 'primary',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
const TONE_FG = {
    neutral: 'surface',
    primary: 'onPrimary',
    success: 'onSuccess',
    warn: 'onWarn',
    danger: 'onDanger',
};
/**
 * The revealed action panels behind a swipeable mail row (this is the static
 * action rail — the host supplies the gesture/animation). Each action is a
 * full-height, toned button with a glyph + label; tones map to semantic slots
 * (danger for delete, warn for snooze, etc). Renders nothing when `actions` is
 * empty. No literal colors.
 */
function MailSwipeActions({ actions, side = 'trailing', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safe = actions ?? [];
    if (safe.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "toolbar", style: [
            { flexDirection: side === 'leading' ? 'row' : 'row-reverse', alignItems: 'stretch' },
            style,
        ], children: safe.map((a) => {
            const tone = a.tone ?? 'neutral';
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a.label, onPress: a.onPress, style: ({ pressed }) => ({
                    minWidth: 72,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    backgroundColor: colors[TONE_BG[tone]],
                    opacity: pressed ? 0.85 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: a.glyph, size: "lg", color: TONE_FG[tone] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors[TONE_FG[tone]], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: a.label })] }, a.id));
        }) }));
}
//# sourceMappingURL=MailSwipeActions.js.map