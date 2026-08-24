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
exports.TimePicker = TimePicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const pad = (n) => String(n).padStart(2, '0');
/**
 * Zero-asset time field — a token-bound `Pressable` showing `HH:MM` that opens a
 * `Modal` with side-by-side hour (0–23) and minute (stepped by `minuteStep`)
 * scroll columns. Same controlled `value`/`onChange` shape as the other native
 * pickers; `invalid` swaps the border to `danger`. No literal colors.
 */
function TimePicker({ value, onChange, minuteStep = 5, placeholder = 'Select a time', invalid = false, disabled = false, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(false);
    const hours = React.useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
    const minutes = React.useMemo(() => {
        const step = Math.max(1, Math.min(60, Math.round(minuteStep)));
        const out = [];
        for (let m = 0; m < 60; m += step)
            out.push(m);
        return out;
    }, [minuteStep]);
    const current = value ?? { h: 0, m: 0 };
    const pick = (next) => onChange?.(next);
    const column = (label, items, active, onPick) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '600',
                    textAlign: 'center',
                    paddingBottom: tokens.spacing.xs,
                }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: { maxHeight: 200 }, showsVerticalScrollIndicator: false, children: items.map((n) => {
                    const isActive = n === active;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label} ${n}`, accessibilityState: { selected: isActive }, onPress: () => onPick(n), style: ({ pressed }) => ({
                            paddingVertical: tokens.spacing.sm,
                            alignItems: 'center',
                            borderRadius: tokens.radius.md,
                            backgroundColor: isActive
                                ? colors.primary
                                : pressed
                                    ? colors.border
                                    : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: isActive ? colors.onPrimary : colors.onSurface,
                                fontSize: tokens.typography.scale.base,
                                fontWeight: isActive ? '700' : '400',
                            }, children: pad(n) }) }, n));
                }) })] }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled, expanded: open }, accessibilityLabel: accessibilityLabel, disabled: disabled, onPress: () => setOpen(true), style: ({ pressed }) => [
                    {
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: colors.surface,
                        borderWidth: 1,
                        borderColor: invalid ? colors.danger : colors.border,
                        borderRadius: tokens.radius.sm,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
                    },
                    style,
                ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: value ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale.base,
                        }, children: value ? `${pad(current.h)}:${pad(current.m)}` : placeholder }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "\u25BE" })] }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: () => setOpen(false), style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: tokens.ramps.neutral[950],
                                opacity: 0.5,
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                width: 240,
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.lg,
                                padding: tokens.spacing.md,
                            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [column('Hour', hours, current.h, (h) => pick({ h, m: current.m })), column('Min', minutes, current.m, (m) => pick({ h: current.h, m }))] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Done", onPress: () => setOpen(false), style: ({ pressed }) => ({
                                        marginTop: tokens.spacing.md,
                                        alignItems: 'center',
                                        paddingVertical: tokens.spacing.sm,
                                        borderRadius: tokens.radius.md,
                                        backgroundColor: colors.primary,
                                        opacity: pressed ? 0.85 : 1,
                                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: colors.onPrimary,
                                            fontSize: tokens.typography.scale.base,
                                            fontWeight: '600',
                                        }, children: "Done" }) })] })] }) })] }));
}
//# sourceMappingURL=TimePicker.js.map