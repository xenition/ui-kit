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
exports.StatsSummary = StatsSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * StatsSummary — an overview row of headline numbers on a clean card, split by
 * thin border dividers. Each stat shows an optional glyph, a big value with a
 * muted unit, and a muted label. Restraint is the point: the card stays surface
 * + border, and only the first stat's value picks up the primary accent — one
 * colored number, not a rainbow. Token-only colors.
 */
function StatsSummary({ stats, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                flexDirection: 'row',
                alignItems: 'stretch',
            },
            style,
        ], children: stats.map((stat, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, alignSelf: 'stretch', backgroundColor: colors.border, marginHorizontal: tokens.spacing.md } })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${stat.label}: ${typeof stat.value === 'string' || typeof stat.value === 'number' ? stat.value : ''}${stat.unit ? ' ' + stat.unit : ''}`, style: { flex: 1, alignItems: 'center', gap: tokens.spacing.xs }, children: [stat.glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: stat.glyph })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { textAlign: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: i === 0 ? colors.primary : colors.onSurface,
                                        fontSize: tokens.typography.scale['2xl'],
                                        fontWeight: '800',
                                    }, children: stat.value }), stat.unit ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [' ', stat.unit] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: stat.label })] })] }, `${stat.label}-${i}`))) }));
}
//# sourceMappingURL=StatsSummary.js.map