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
exports.ScanRowV4 = ScanRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * ScanRow — **V4** "dispatch" design (native twin of the web V4). The confident,
 * operations-desk take on a scan event: an elevated rounded row with a soft
 * shadow, a decorative token-bar "barcode" placeholder (no scan dependency,
 * hidden from a11y), the code headline, a labelled glyph + word scan kind (never
 * color alone), a location line, and the time / operator at the trailing edge.
 * Tappable when `onPress` is set. Honors the V4 `variant` — `full` (default) and
 * `compact` (a denser single line). Token-only colors via `useXenitionTheme()`.
 */
function ScanRowV4({ code, kind, location, time, operator, variant = 'full', onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.SCAN_META[kind] ?? internal_1.SCAN_META.inbound;
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const a11y = `${meta.label} scan ${code}${location ? ` at ${location}` : ''}`;
    const compact = variant === 'compact';
    const bars = React.useMemo(() => {
        const out = [];
        for (let i = 0; i < 14; i += 1) {
            const ch = code.charCodeAt(i % Math.max(code.length, 1)) || 1;
            out.push((ch % 3) + 1);
        }
        return out;
    }, [code]);
    const barcode = (w, h) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { width: w, height: h, flexDirection: 'row', alignItems: 'center', gap: 1, paddingHorizontal: 3, borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: bars.map((bw, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: bw, height: '70%', backgroundColor: colors.onSurface } }, i))) }));
    const badge = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` }));
    const content = compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [barcode(32, 24), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface, fontVariant: ['tabular-nums'] }, children: code }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [badge, time ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }, children: time }) : null] })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [barcode(48, 36), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface, fontVariant: ['tabular-nums'] }, children: code }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [badge, location ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: location }) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [time ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '600', color: colors.onSurface, fontVariant: ['tabular-nums'] }, children: time }) : null, operator ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: operator }) : null] })] }));
    const layout = compact
        ? { minHeight: 44, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }
        : { minHeight: 56, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md };
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, layout, { opacity: pressed ? 0.8 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, layout, style], children: content });
}
//# sourceMappingURL=ScanRowV4.js.map