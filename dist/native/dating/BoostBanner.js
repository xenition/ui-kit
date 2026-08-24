"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoostBanner = BoostBanner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
const SPEC = {
    boost: {
        glyph: '⚡',
        slot: 'primary',
        title: 'Be seen first',
        subtitle: 'Boost your profile to the top for 30 minutes.',
        cta: 'Boost me',
    },
    superboost: {
        glyph: '🚀',
        slot: 'accent',
        title: 'Super Boost tonight',
        subtitle: 'Up to 100× more profile views during peak hours.',
        cta: 'Super Boost',
    },
    premium: {
        glyph: '★',
        slot: 'warn',
        title: 'Go Premium',
        subtitle: 'Unlimited likes, see who likes you, and more.',
        cta: 'Upgrade',
    },
};
/**
 * Upsell banner for boosts / premium — the native boost banner. Presents a
 * glyph, headline, subtitle, and a CTA, switching to an "active" treatment when
 * an `activeLabel` (countdown) is supplied. The whole card is tappable and the
 * CTA repeats the action for clarity. Colors are token-derived via `withAlpha`
 * tints — no literal colors; state is conveyed by text, not color alone.
 */
function BoostBanner({ variant = 'boost', title, subtitle, ctaLabel, onPress, activeLabel, onDismiss, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spec = SPEC[variant];
    const accent = colors[spec.slot];
    const active = activeLabel != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title ?? spec.title}. ${active ? activeLabel : subtitle ?? spec.subtitle}`, onPress: onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: (0, color_1.withAlpha)(accent, active ? 0.9 : 0.4),
                backgroundColor: (0, color_1.withAlpha)(accent, active ? 0.2 : 0.1),
                padding: tokens.spacing.md,
                opacity: pressed ? 0.9 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(accent, 0.2),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xl }, allowFontScaling: false, children: spec.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title ?? spec.title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: active ? accent : colors.muted, fontSize: tokens.typography.scale.sm }, children: active ? activeLabel : subtitle ?? spec.subtitle })] }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", hitSlop: 8, onPress: onDismiss, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.lg }, children: "\u2715" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", tone: variant === 'premium' ? 'default' : 'primary', onPress: onPress, children: ctaLabel ?? spec.cta }) }))] }));
}
//# sourceMappingURL=BoostBanner.js.map