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
exports.RideStatusBar = RideStatusBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Canonical stage order + glyph + human label. */
const STAGES = [
    { key: 'requested', label: 'Requested', glyph: '🔍' },
    { key: 'arriving', label: 'Arriving', glyph: '🚗' },
    { key: 'in-trip', label: 'In trip', glyph: '🧭' },
    { key: 'completed', label: 'Completed', glyph: '🏁' },
];
/**
 * A ride lifecycle progress bar — walks `requested → arriving → in-trip →
 * completed`, marking each stage done / active / pending. Completed and active
 * stages are distinguished by a glyph (✓ / the stage icon) and a spelled-out
 * label plus an a11y label, so progress never rests on color alone. A
 * `cancelled` flag overrides with an explicit cancelled state. Colors come from
 * semantic tokens and `withAlpha` tints — no literal colors. The `stage` is
 * matched against a known set and falls back safely if unrecognised.
 */
function RideStatusBar({ stage, detail, cancelled = false, variant = 'stepper', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));
    const compact = variant === 'compact';
    if (cancelled) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: "Ride cancelled", style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: (0, color_1.withAlpha)(colors.danger, 0.5),
                    backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.1),
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base }, children: "\u2715" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "Cancelled" }), detail ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: detail }) : null] })] }));
    }
    const current = STAGES[activeIndex] ?? STAGES[0];
    const a11y = `Ride status: ${current.label}, step ${activeIndex + 1} of ${STAGES.length}${detail ? `, ${detail}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start' }, children: STAGES.map((s, i) => {
                    const done = i < activeIndex;
                    const active = i === activeIndex;
                    const dotColor = done || active ? colors.primary : (0, color_1.withAlpha)(colors.muted, 0.35);
                    const isLast = i === STAGES.length - 1;
                    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: compact ? 30 : 64 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: 28,
                                            height: 28,
                                            borderRadius: tokens.radius.full,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: done ? colors.primary : active ? (0, color_1.withAlpha)(colors.primary, 0.16) : (0, color_1.withAlpha)(colors.muted, 0.14),
                                            borderWidth: active ? 2 : 0,
                                            borderColor: colors.primary,
                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                fontSize: tokens.typography.scale.xs,
                                                color: done ? colors.onPrimary : colors.onSurface,
                                                fontWeight: '800',
                                            }, children: done ? '✓' : s.glyph }) }), !compact ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                            marginTop: tokens.spacing.xs,
                                            fontSize: tokens.typography.scale.xs,
                                            fontWeight: active ? '700' : '500',
                                            color: active ? colors.onSurface : colors.muted,
                                        }, children: s.label })) : null] }), !isLast ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    flex: 1,
                                    height: 2,
                                    marginTop: 13,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: i < activeIndex ? colors.primary : (0, color_1.withAlpha)(colors.muted, 0.3),
                                } })) : null] }, s.key));
                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: current.label }), detail ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["\u00B7 ", detail] }) : null] })] }));
}
//# sourceMappingURL=RideStatusBar.js.map