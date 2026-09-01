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
exports.ProfileStatsV4 = ProfileStatsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * ProfileStats — **V4** "feed" design. The clean, airy take on a profile stat
 * row: big bold numerals stacked over muted labels, generous 8-pt spacing, and
 * a soft-primary tint on press for any tappable column. Same props/behavior as
 * {@link ProfileStatsProps} (values, labels, per-column `onPress`, optional
 * dividers); token-only colors via `useXenitionTheme()`. Renders bare so it
 * drops into any header.
 */
function ProfileStatsV4({ stats, dividers = false, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const softPrimary = (0, color_1.withAlpha)(colors.primary, 0.12);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ flexDirection: 'row', alignItems: 'stretch' }, style], children: stats.map((s, i) => {
            const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2, paddingVertical: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: String(s.value) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: s.label })] }));
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [dividers && i > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, alignSelf: 'stretch', backgroundColor: colors.border, marginVertical: tokens.spacing.sm } })) : null, s.onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${s.value} ${s.label}`, onPress: s.onPress, style: ({ pressed }) => ({
                            flex: 1,
                            minHeight: 44,
                            justifyContent: 'center',
                            borderRadius: tokens.radius.md,
                            backgroundColor: pressed ? softPrimary : 'transparent',
                        }), children: inner })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, justifyContent: 'center' }, children: inner }))] }, `${s.label}-${i}`));
        }) }));
}
//# sourceMappingURL=ProfileStatsV4.js.map