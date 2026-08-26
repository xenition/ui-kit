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
exports.ComboboxV4 = ComboboxV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const picker_v4_1 = require("./internal/picker-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const motion_v4_1 = require("./internal/motion-v4");
/**
 * **V4 combobox** — the same props as {@link Combobox}, a different design
 * line.
 *
 * ## The selected option has to be findable
 *
 * The base marks it by colouring the label `colors.primary`. That is the one
 * token in the palette with no contrast promise against `surface` — `primary`
 * is guaranteed against `onPrimary`, and `primaryText` is the slot the compiler
 * derives for exactly this case: brand-coloured text ON a surface. So the
 * selected row uses `primaryText`, and it also carries a ✓, because colour
 * alone is never the only cue (§46).
 *
 * ## Everything else is about size and honesty
 *
 * 1. **Rows at `tapTarget()`.** The base row is `md` padding around a line of
 *    text; in a filtered list the row above is a different answer.
 * 2. **A field that belongs in the form.** `InputV4`'s treatment — `2xl`
 *    minimum height, `md` radius, brand halo with its space reserved — and the
 *    field stays ringed while its sheet is open, because the sheet is its.
 * 3. **An empty state that says something.** "No matches for “x”", quoting the
 *    query back, rather than the base's bare "No matches" (§15, §37).
 * 4. **A scrim that is black.** The base scrims with `ramps.neutral[950]`,
 *    which the dark scheme re-emits inverted — a WHITE veil over a dark page.
 *    `elevation.sheet.color` does not invert, because a shadow does not.
 *
 * The search field inside the sheet is the same `InputV4` treatment as the
 * trigger, so the two do not look like different species; the sheet itself
 * takes `elevation.sheet` and glass only when the seed asked for it.
 */
function ComboboxV4({ options, value, onValueChange, onChange, placeholder = 'Search…', invalid = false, disabled = false, accessibilityLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onValueChange ?? onChange;
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const selected = options.find((o) => o.value === value);
    const trimmed = query.trim();
    const filtered = React.useMemo(() => {
        if (!trimmed)
            return options;
        const q = trimmed.toLowerCase();
        return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, trimmed]);
    const target = (0, picker_v4_1.tapTarget)(theme);
    const press = (0, picker_v4_1.pressFill)(theme);
    const close = () => {
        setOpen(false);
        setQuery('');
    };
    const enter = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (!open) {
            enter.setValue(0);
            return;
        }
        if (reduced) {
            enter.setValue(1);
            return;
        }
        const anim = react_native_1.Animated.timing(enter, {
            toValue: 1,
            duration: picker_v4_1.PICKER_MOTION.popover,
            easing: motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [enter, open, reduced]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [(0, picker_v4_1.ringWrap)(theme, { focused: open, invalid }), style], children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled, expanded: open }, accessibilityLabel: accessibilityLabel, disabled: disabled, onPress: () => setOpen(true), style: (0, picker_v4_1.fieldSkin)(theme, { focused: open, invalid, disabled }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flex: 1,
                                color: selected ? colors.onSurface : colors.mutedText,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.base,
                            }, children: selected ? selected.label : placeholder }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { color: colors.mutedText, fontSize: tokens.typography.scale.base }, children: "\u25BE" })] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "none", onRequestClose: close, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Close", onPress: close, style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: (0, picker_v4_1.scrimColor)(theme),
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityViewIsModal: true, accessibilityLabel: "Choose an option", style: [
                                (0, picker_v4_1.popoverSkin)(theme, 'sheet'),
                                {
                                    maxHeight: '70%',
                                    overflow: 'hidden',
                                    opacity: enter,
                                    transform: [
                                        {
                                            translateY: enter.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [tokens.spacing.sm, 0],
                                            }),
                                        },
                                    ],
                                },
                            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, picker_v4_1.fieldSkin)(theme, { focused: true }), children: (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { autoFocus: true, value: query, onChangeText: setQuery, placeholder: placeholder, placeholderTextColor: colors.mutedText, accessibilityLabel: "Filter options", style: {
                                                flex: 1,
                                                color: colors.onSurface,
                                                fontFamily: tokens.typography.fontBody,
                                                fontSize: tokens.typography.scale.base,
                                                padding: 0,
                                            } }) }) }), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { keyboardShouldPersistTaps: "handled", children: filtered.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", style: {
                                            color: colors.mutedText,
                                            fontFamily: tokens.typography.fontBody,
                                            fontSize: tokens.typography.scale.sm,
                                            paddingVertical: tokens.spacing.md,
                                            paddingHorizontal: tokens.spacing.md,
                                        }, children: trimmed ? `No matches for “${trimmed}”` : 'Nothing to choose from yet' })) : (filtered.map((opt) => {
                                        const active = opt.value === value;
                                        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityLabel: opt.label, accessibilityState: { selected: active }, onPress: () => {
                                                emit?.(opt.value);
                                                close();
                                            }, style: ({ pressed }) => ({
                                                minHeight: target,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: tokens.spacing.sm,
                                                paddingHorizontal: tokens.spacing.md,
                                                backgroundColor: pressed ? press : 'transparent',
                                            }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                                        flex: 1,
                                                        // `primaryText`, not `primary`: the compiler derives
                                                        // the former to read ON a surface. `primary` carries
                                                        // no such promise.
                                                        color: active ? colors.primaryText : colors.onSurface,
                                                        fontFamily: tokens.typography.fontBody,
                                                        fontSize: tokens.typography.scale.base,
                                                        fontWeight: active ? '600' : '400',
                                                    }, children: opt.label }), active ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: {
                                                        color: colors.primaryText,
                                                        fontSize: tokens.typography.scale.base,
                                                    }, children: "\u2713" })) : null] }, opt.value));
                                    })) })] })] }) })] }));
}
//# sourceMappingURL=ComboboxV4.js.map