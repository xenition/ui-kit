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
exports.TimePickerV4 = TimePickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const picker_v4_1 = require("./internal/picker-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const state_v4_1 = require("./internal/state-v4");
const motion_v4_1 = require("./internal/motion-v4");
const pad = (n) => String(n).padStart(2, '0');
/**
 * **V4 time field** — the same props as {@link TimePicker}, a different design
 * line.
 *
 * ## Two columns, because that is what a time picker is
 *
 * §31 again: hours on the left, minutes on the right, scroll and tap. Every
 * platform's time picker is some version of this, and inventing a dial or a
 * text mask here would only mean the user has to learn our one. What changes
 * is the size of the things being tapped and how obviously the current time is
 * marked.
 *
 * ## The changes
 *
 * 1. **Rows you can hit.** The base row is `sm` vertical padding around a
 *    line of text — roughly 30px, well under the 44px floor, in a list where
 *    the neighbouring row is a different minute. Every row here is
 *    `tapTarget()` tall. That is the single change that makes the control stop
 *    feeling like a lottery.
 * 2. **A field that belongs in the form.** `InputV4`'s treatment: `2xl`
 *    minimum height, `md` radius, and the brand halo with its space reserved,
 *    so opening the picker never nudges the layout (§36.11). The field stays
 *    ringed while its popover is open.
 * 3. **A selection that survives dark mode.** The active hour and minute are
 *    filled `primary` with `onPrimary` ink — the pair the compiler
 *    contrast-checks — rather than a tinted row that dissolves on a dark page.
 * 4. **A confirm button that says what it does.** `Done` is `primary`, at the
 *    same `tapTarget()` height as everything else. §16 asks for
 *    action-specific labels, and for a picker whose two columns are already
 *    live, "Done" is genuinely what the button does.
 *
 * ## The overlay
 *
 * `elevation.sheet` through `popoverSkin`, glass only when the seed asked for
 * `depth: 'glass'`, and a scrim that is black from `elevation.sheet.color`
 * rather than `colors.onSurface` — which inverts with the scheme and veils a
 * dark page in white, as the base picker does today. Under "Reduce Motion" the
 * panel is simply there (§36.10).
 */
function TimePickerV4({ value, onChange, minuteStep = 5, placeholder = 'Select a time', invalid = false, disabled = false, accessibilityLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
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
    const target = (0, picker_v4_1.tapTarget)(theme);
    const press = (0, picker_v4_1.pressFill)(theme);
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
    const column = (label, items, active, onPick) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.mutedText,
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '600',
                    textAlign: 'center',
                    paddingBottom: tokens.spacing.xs,
                }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: { maxHeight: target * 5 }, showsVerticalScrollIndicator: false, children: items.map((n) => {
                    const isActive = n === active;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label} ${n}`, accessibilityState: { selected: isActive }, onPress: () => onPick(n), style: ({ pressed }) => ({
                            height: target,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.md,
                            backgroundColor: isActive ? colors.primary : pressed ? press : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: isActive ? colors.onPrimary : colors.onSurface,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.base,
                                fontWeight: isActive ? '700' : '400',
                            }, children: pad(n) }) }, n));
                }) })] }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [(0, picker_v4_1.ringWrap)(theme, { focused: open, invalid }), style], children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled, expanded: open }, accessibilityLabel: accessibilityLabel, disabled: disabled, onPress: () => setOpen(true), style: (0, picker_v4_1.fieldSkin)(theme, { focused: open, invalid, disabled }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flex: 1,
                                color: value ? colors.onSurface : colors.mutedText,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.base,
                            }, children: value ? `${pad(current.h)}:${pad(current.m)}` : placeholder }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { color: colors.mutedText, fontSize: tokens.typography.scale.base }, children: "\u25BE" })] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "none", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: tokens.spacing.lg,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Close", onPress: () => setOpen(false), style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: (0, picker_v4_1.scrimColor)(theme),
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityViewIsModal: true, accessibilityLabel: "Choose a time", style: [
                                (0, picker_v4_1.popoverSkin)(theme, 'sheet'),
                                {
                                    width: target * 5,
                                    padding: tokens.spacing.md,
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
                            ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [column('Hour', hours, current.h, (h) => onChange?.({ h, m: current.m })), column('Min', minutes, current.m, (m) => onChange?.({ h: current.h, m }))] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Done", onPress: () => setOpen(false), style: ({ pressed }) => ({
                                        marginTop: tokens.spacing.md,
                                        height: target,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: tokens.radius.md,
                                        backgroundColor: pressed
                                            ? (0, state_v4_1.pressOver)(theme, colors.primary, colors.onPrimary)
                                            : colors.primary,
                                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: colors.onPrimary,
                                            fontFamily: tokens.typography.fontBody,
                                            fontSize: tokens.typography.scale.base,
                                            fontWeight: '600',
                                        }, children: "Done" }) })] })] }) })] }));
}
//# sourceMappingURL=TimePickerV4.js.map