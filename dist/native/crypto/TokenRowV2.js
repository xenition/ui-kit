"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRowV2 = TokenRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
/** Change → contrast-safe TEXT slot (gains `successText`, losses `dangerText`). */
function changeToneTextKey(delta) {
    const safe = Number.isFinite(delta) ? delta : 0;
    if (safe > 0)
        return 'successText';
    if (safe < 0)
        return 'dangerText';
    return 'muted';
}
/**
 * TokenRow, redesigned (v2): an **elevated card** with a tinted token disc, a
 * derived {@link Sparkline}, and a toned change pill. The sparkline shape is
 * synthesized from `changePct` (it slopes up for gains, down for losses — no new
 * data needed), tinted with the semantic fill slot; the 24h change reads in the
 * contrast-safe `successText`/`dangerText` slots with a ▲/▼ glyph so it is never
 * color-only. Fiat runs through {@link MoneyAmount} (integer cents — no drift).
 * Distinct at a glance from v1's flat list line. Same props.
 */
function TokenRowV2({ symbol, name, amount, decimals = 4, valueCents, currency = 'USD', changePct, icon, iconColor = 'primary', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const hasChange = changePct != null;
    const fillTone = (0, format_1.changeToneKey)(changePct ?? 0);
    const textTone = changeToneTextKey(changePct ?? 0);
    // Synthesize a small trend shape from the 24h change — a presentational cue
    // derived from the only signal we have, so no extra prop is introduced.
    const spark = React.useMemo(() => {
        const c = Number.isFinite(changePct ?? 0) ? changePct ?? 0 : 0;
        const slope = Math.max(-1, Math.min(1, c / 12));
        return Array.from({ length: 14 }, (_, i) => {
            const t = i / 13 - 0.5;
            const base = 0.55 + slope * t;
            const wobble = Math.sin(i * 1.35) * 0.055;
            return Math.max(0.06, base + wobble);
        });
    }, [changePct]);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                backgroundColor: colors.surface,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors[iconColor], 0.12),
                    borderWidth: 1,
                    borderColor: colors.border,
                }, children: icon != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: iconColor, size: "lg" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[iconColor], fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: symbol.slice(0, 3).toUpperCase() })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: symbol }), name != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: name })) : null] }), (0, jsx_runtime_1.jsx)(charts_1.Sparkline, { data: spark, color: fillTone, height: 28, style: { width: 56 }, accessibilityLabel: `${symbol} trend` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 4, minWidth: 76 }, children: [valueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: valueCents, currency: currency, tone: "neutral", size: "sm" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }, children: (0, format_1.formatToken)(amount, { decimals, symbol }) })), hasChange ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            backgroundColor: (0, color_1.withAlpha)(colors[fillTone], 0.14),
                            borderRadius: tokens.radius.full,
                            paddingVertical: 2,
                            paddingHorizontal: tokens.spacing.xs,
                        }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityLabel: `${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct ?? 0))}`, style: { color: colors[textTone], fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: [(0, format_1.changeGlyph)(changePct ?? 0), " ", (0, format_1.formatPct)(changePct ?? 0)] }) })) : null] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${symbol} holding`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=TokenRowV2.js.map