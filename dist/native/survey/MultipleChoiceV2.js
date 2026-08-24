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
exports.MultipleChoiceV2 = MultipleChoiceV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
/** A→Z letter for a 0-based index (wraps back to A past 25 — guarded). */
function letterFor(index) {
    return String.fromCharCode(65 + (((index % 26) + 26) % 26));
}
function OptionCard({ opt, letter, selected, multiple, disabled, onPress }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: multiple ? 'checkbox' : 'radio', accessibilityState: multiple ? { checked: selected, disabled } : { selected, disabled }, accessibilityLabel: opt.label, disabled: disabled, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? (0, color_1.withAlpha)(colors.primary, 0.06) : colors.surface,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
                opacity: disabled ? 0.5 : 1,
                ...(selected ? (0, elevation_1.shadow)('sm', tokens) : null),
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 34,
                        height: 34,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selected ? colors.primary : (0, color_1.withAlpha)(colors.primary, 0.1),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: selected ? colors.onPrimary : colors.primaryText,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '800',
                        }, children: letter }) }), opt.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: opt.icon, size: "lg", color: "onSurface" }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.base,
                                fontWeight: selected ? '800' : '600',
                            }, children: opt.label }), opt.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: opt.description })) : null] }), selected ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: multiple ? '✓' : '●', size: "sm", color: "primary", accessibilityLabel: "selected" })) : null] }) }));
}
/**
 * MultipleChoice, design V2 — **option cards led by letter badges**. Each choice
 * is a padded, rounded card with an A/B/C… badge (filled primary when selected),
 * the label and optional description, and a trailing check/dot on selection —
 * the selected card also gains a primary border, a soft tint and a lift. Reads
 * like a quiz / poll card deck rather than the original's plain rows.
 * `single` = `radiogroup`+`radio`, `multiple` = `list`+`checkbox`, state
 * announced (never color-alone). Empty options render a muted state. Token-pure.
 */
function MultipleChoiceV2({ options, value, onChange, selection = 'single', accessibilityLabel = 'Answer options', disabled = false, style, }) {
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
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: multiple ? 'list' : 'radiogroup', accessibilityLabel: accessibilityLabel, style: [{ gap: tokens.spacing.sm }, style], children: options.map((opt, i) => ((0, jsx_runtime_1.jsx)(OptionCard, { opt: opt, letter: letterFor(i), selected: selectedSet.has(opt.id), multiple: multiple, disabled: disabled, onPress: () => toggle(opt.id) }, opt.id))) }));
}
//# sourceMappingURL=MultipleChoiceV2.js.map