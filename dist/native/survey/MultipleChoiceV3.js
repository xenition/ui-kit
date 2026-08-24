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
exports.MultipleChoiceV3 = MultipleChoiceV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * MultipleChoice, design V3 — **stacked minimal rows**. No cards or per-row
 * borders: the options share one hairline-divided list, each row a leading
 * indicator (a hollow circle for `single`, a hollow square for `multiple`) that
 * fills primary and shows a check when picked, with the label going bold and a
 * slim primary accent bar sliding in on the left. Airy and text-forward, unlike
 * the original's bordered rows. `single` = `radiogroup`+`radio`, `multiple` =
 * `list`+`checkbox`, state announced (never color-alone). Empty renders a muted
 * state. Token-pure.
 */
function MultipleChoiceV3({ options, value, onChange, selection = 'single', accessibilityLabel = 'Answer options', disabled = false, style, }) {
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
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: multiple ? 'list' : 'radiogroup', accessibilityLabel: accessibilityLabel, style: [{}, style], children: options.map((opt, i) => {
            const selected = selectedSet.has(opt.id);
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: multiple ? 'checkbox' : 'radio', accessibilityState: multiple ? { checked: selected, disabled } : { selected, disabled }, accessibilityLabel: opt.label, disabled: disabled, onPress: () => toggle(opt.id), style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    paddingVertical: tokens.spacing.md,
                    paddingLeft: tokens.spacing.sm,
                    paddingRight: tokens.spacing.sm,
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: (0, color_1.withAlpha)(colors.border, 0.8),
                    backgroundColor: pressed ? (0, color_1.withAlpha)(colors.primary, 0.06) : 'transparent',
                    opacity: disabled ? 0.5 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 3,
                            alignSelf: 'stretch',
                            borderRadius: tokens.radius.full,
                            backgroundColor: selected ? colors.primary : 'transparent',
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 22,
                            height: 22,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: multiple ? tokens.radius.sm : tokens.radius.full,
                            borderWidth: selected ? 0 : 1.5,
                            borderColor: colors.border,
                            backgroundColor: selected ? colors.primary : 'transparent',
                        }, children: selected ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "xs", color: "onPrimary" }) : null }), opt.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: opt.icon, size: "base", color: "onSurface" }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: selected ? '800' : '500',
                                }, children: opt.label }), opt.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: opt.description })) : null] })] }, opt.id));
        }) }));
}
//# sourceMappingURL=MultipleChoiceV3.js.map