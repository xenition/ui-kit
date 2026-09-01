"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementBadge = AchievementBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const GradientSurface_1 = require("./internal/GradientSurface");
const color_1 = require("../primitives/internal/color");
const calm_1 = require("./internal/calm");
/**
 * AchievementBadge — a medallion on a calm, clean surface card. When earned, the
 * medallion is a vivid brand gradient with the achievement glyph; when locked it
 * falls back to a muted neutral disc with a lock and an optional progress caption.
 * The earned/locked state is carried by the label and the glyph, not by color
 * alone. Color derives entirely from the ramp, so it adapts light + dark and
 * restyles from the seed — the reward gradient earns its saturation only once the
 * badge is unlocked.
 */
function AchievementBadge({ title, description, glyph = '🏅', earned = false, progress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const pctLabel = progress != null ? `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%` : null;
    const a11y = `${title}, ${earned ? 'earned' : 'locked'}${!earned && pctLabel ? ', ' + pctLabel + ' complete' : ''}${description ? '. ' + description : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: a11y, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                alignItems: 'center',
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [earned ? ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                    width: 72,
                    height: 72,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: tokens.typography.scale['2xl'], style: { color: (0, calm_1.calmInk)(r) } }) })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    width: 72,
                    height: 72,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.08),
                }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD12", size: tokens.typography.scale.xl, style: { color: colors.mutedText, opacity: 0.7 } }), pctLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: pctLabel })) : null] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '700',
                            textAlign: 'center',
                            opacity: earned ? 1 : 0.7,
                        }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: description })) : null] })] }));
}
//# sourceMappingURL=AchievementBadge.js.map