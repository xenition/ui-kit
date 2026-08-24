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
exports.ColorPicker = ColorPicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SWATCH = 36;
/**
 * Swatch-grid color picker — a dependency-free grid of tappable color chips.
 * With no `swatches` prop it builds its palette straight from the semantic
 * theme tokens (primary, accent, success, warn, danger, plus neutrals), so the
 * rendered colors are always token-pure — no external color engine, no literal
 * colors. The selected chip gets a `primary` selection ring.
 */
function ColorPicker({ value, onChange, swatches, disabled = false, accessibilityLabel = 'Choose a color', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const palette = React.useMemo(() => swatches ?? [
        { label: 'Primary', value: colors.primary },
        { label: 'Accent', value: colors.accent },
        { label: 'Success', value: colors.success },
        { label: 'Warning', value: colors.warn },
        { label: 'Danger', value: colors.danger },
        { label: 'Foreground', value: colors.onSurface },
        { label: 'Muted', value: colors.muted },
        { label: 'Border', value: colors.border },
        { label: 'Surface', value: colors.surface },
        { label: 'Neutral 300', value: tokens.ramps.neutral[300] },
        { label: 'Neutral 500', value: tokens.ramps.neutral[500] },
        { label: 'Neutral 700', value: tokens.ramps.neutral[700] },
    ], [swatches, colors, tokens]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: [
            { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 },
            style,
        ], children: palette.map((sw) => {
            const active = value === sw.value;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityLabel: sw.label, accessibilityState: { selected: active, disabled }, disabled: disabled, onPress: () => onChange?.(sw.value), style: {
                    width: SWATCH,
                    height: SWATCH,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    borderWidth: active ? 2 : 1,
                    borderColor: active ? colors.primary : colors.border,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: SWATCH - 12,
                            height: SWATCH - 12,
                            borderRadius: tokens.radius.full,
                            backgroundColor: sw.value,
                        } }), active ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            position: 'absolute',
                            color: colors.onPrimary,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '700',
                        }, children: "\u2713" })) : null] }, `${sw.label}-${sw.value}`));
        }) }));
}
//# sourceMappingURL=ColorPicker.js.map