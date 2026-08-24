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
exports.ToggleGroup = ToggleGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Segmented toggle group — a row of connected pressables that toggle on/off.
 * Unlike the display-only `Segmented`, single mode is deselectable and a
 * `multiple` mode lets several be active at once (value becomes a `string[]`).
 * Active options fill with `primary`/`onPrimary`; the shared border and radius
 * come from `useXenitionTheme()`. No literal colors.
 */
function ToggleGroup({ options, value, onChange, multiple = false, disabled = false, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const selected = React.useMemo(() => {
        if (multiple)
            return Array.isArray(value) ? value : [];
        return typeof value === 'string' && value ? [value] : [];
    }, [value, multiple]);
    const toggle = (v) => {
        if (multiple) {
            const set = new Set(selected);
            if (set.has(v))
                set.delete(v);
            else
                set.add(v);
            onChange?.(Array.from(set));
        }
        else {
            onChange?.(selected[0] === v ? '' : v);
        }
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: [
            {
                flexDirection: 'row',
                alignSelf: 'flex-start',
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
                opacity: disabled ? 0.5 : 1,
            },
            style,
        ], children: options.map((opt, i) => {
            const active = selected.includes(opt.value);
            const itemDisabled = disabled || opt.disabled;
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: multiple ? 'checkbox' : 'radio', accessibilityState: { selected: active, disabled: itemDisabled, checked: active }, accessibilityLabel: opt.label, disabled: itemDisabled, onPress: () => toggle(opt.value), style: ({ pressed }) => ({
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    backgroundColor: active
                        ? colors.primary
                        : pressed
                            ? colors.border
                            : colors.surface,
                    borderLeftWidth: i === 0 ? 0 : 1,
                    borderLeftColor: colors.border,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: active ? colors.onPrimary : colors.onSurface,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: active ? '700' : '500',
                    }, children: opt.label }) }, opt.value));
        }) }));
}
//# sourceMappingURL=ToggleGroup.js.map