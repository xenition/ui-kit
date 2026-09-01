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
exports.MultipleChoiceV4 = MultipleChoiceV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
/**
 * MultipleChoice — **V4** "clean form / focus" design. Calm, legible answer rows
 * rendered as big tappable cards (min height 44, generous 8-pt padding). Each row
 * carries a leading radio (`single`) or check (`multiple`) indicator, an optional
 * icon, a label and optional description. The selected row lifts to a soft primary
 * tint with a `primary` edge and a solid **primary** indicator with on-primary
 * glyph; unselected rows sit on `surface` + `border`. One accent throughout. Same
 * props/behavior as {@link MultipleChoiceProps} — the `radiogroup`/`radio` vs.
 * `checkbox` roles, `accessibilityState`, single/multiple selection and the empty
 * state are all preserved; token-only colors via `useXenitionTheme()` (no literal
 * colors).
 */
function MultipleChoiceV4({ options, value, onChange, selection = 'single', accessibilityLabel = 'Answer options', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const multiple = selection === 'multiple';
    const selectedSet = React.useMemo(() => {
        if (multiple)
            return new Set(Array.isArray(value) ? value : []);
        return new Set(typeof value === 'string' ? [value] : []);
    }, [multiple, value]);
    const toggle = (id) => {
        if (multiple) {
            const next = new Set(selectedSet);
            if (next.has(id))
                next.delete(id);
            else
                next.add(id);
            onChange(Array.from(next));
        }
        else {
            onChange(id);
        }
    };
    if (options.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "No options available." }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: multiple ? 'list' : 'radiogroup', accessibilityLabel: accessibilityLabel, style: [{ gap: tokens.spacing.sm }, style], children: options.map((opt) => {
            const selected = selectedSet.has(opt.id);
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: multiple ? 'checkbox' : 'radio', accessibilityState: multiple ? { checked: selected, disabled } : { selected, disabled }, accessibilityLabel: opt.label, disabled: disabled, onPress: () => toggle(opt.id), style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    minHeight: 44,
                    borderRadius: tokens.radius.lg,
                    borderWidth: selected ? 2 : 1,
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected ? (0, color_1.withAlpha)(colors.primary, 0.12) : colors.surface,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 22,
                            height: 22,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: multiple ? tokens.radius.sm : tokens.radius.full,
                            borderWidth: selected ? 0 : 1,
                            borderColor: colors.border,
                            backgroundColor: selected ? colors.primary : colors.surface,
                        }, children: selected ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: multiple ? '✓' : '●', size: "xs", color: "onPrimary" }) : null }), opt.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: opt.icon, size: "base", color: "onSurface" }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: selected ? '700' : '500',
                                }, children: opt.label }), opt.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: opt.description })) : null] })] }, opt.id));
        }) }));
}
//# sourceMappingURL=MultipleChoiceV4.js.map