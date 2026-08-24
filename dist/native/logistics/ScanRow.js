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
exports.ScanRow = ScanRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * A single scan event row. The kit ships no barcode renderer, so the code is
 * shown as text beside a **token-bar placeholder** that evokes a barcode
 * (alternating neutral-ramp bars, purely decorative and hidden from a11y). The
 * scan kind is carried by a glyph + word chip. Tappable when `onPress` is set.
 * All colors are theme tokens — no literal colors, no scan/barcode dependency.
 */
function ScanRow({ code, kind, location, time, operator, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.SCAN_META[kind] ?? internal_1.SCAN_META.inbound;
    const accent = (0, internal_1.toneColor)(colors, meta.tone);
    // Deterministic pseudo-barcode widths from the code (decorative placeholder).
    const bars = React.useMemo(() => {
        const out = [];
        for (let i = 0; i < 14; i += 1) {
            const ch = code.charCodeAt(i % Math.max(code.length, 1)) || 1;
            out.push((ch % 3) + 1);
        }
        return out;
    }, [code]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${meta.label} scan ${code}${location ? ` at ${location}` : ''}`, disabled: !onPress, onPress: onPress, testID: testID, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: 40,
                    height: 32,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1,
                    paddingHorizontal: 3,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: tokens.ramps.neutral[100],
                }, children: bars.map((w, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: w, height: '70%', backgroundColor: colors.onSurface } }, i))) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }, children: code }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }, children: meta.label }), location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `· ${location}` })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 1 }, children: [time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.onSurface, fontWeight: '600' }, children: time })) : null, operator ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: operator })) : null] })] }));
}
//# sourceMappingURL=ScanRow.js.map