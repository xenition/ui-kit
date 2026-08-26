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
exports.DatePickerV4 = DatePickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const date_v4_1 = require("../../primitives/internal/date-v4");
const picker_v4_1 = require("./internal/picker-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const motion_v4_1 = require("./internal/motion-v4");
/**
 * **V4 date field** — the same props as {@link DatePicker}, a different design
 * line.
 *
 * ## The field belongs in the form
 *
 * The base trigger is `radius.sm` with `sm/md` padding — visibly a different
 * control from the `InputV4` sitting above it in the same form. This one takes
 * `InputV4`'s treatment exactly: the same `2xl` minimum height (which is also
 * the tap-target floor, so a field is never smaller than the smallest thing you
 * are allowed to touch), the same `md` radius, and the same brand halo, whose
 * space is reserved whether or not it is showing so opening the picker never
 * nudges the layout (§36.11). While the calendar is open the field stays
 * ringed, because the popover belongs to it and should look like it does.
 *
 * ## The calendar is a calendar
 *
 * §31: a month grid, seven columns, chevrons to page. The changes are all
 * about the hand rather than the metaphor:
 *
 *   - **Day cells at `tapTarget()`.** The base gives its day a 44px box inside
 *     a 44px column, so a cell edge and a target edge are the same line and
 *     there is no slack for a thumb. Here the target is `spacing['2xl']` and
 *     the visible disc sits inside it.
 *   - **A selection that survives dark mode.** A filled `primary` disc with
 *     `onPrimary` ink, both resolved for the active scheme. `ramps.primary[50]`
 *     would keep the light orientation in both and paint a near-white hole in a
 *     dark grid.
 *   - **Today, marked.** A `primary` ring on today's cell, so "where am I" is
 *     answerable before you have selected anything (§32 — recognition over
 *     recall).
 *   - **Blocked days that say so.** A day outside `min`/`max` is muted, struck
 *     from the tab order and reported disabled, rather than merely faded.
 *
 * ## The overlay
 *
 * `elevation.sheet` and — only when the seed asked for `depth: 'glass'` — the
 * glass pair, both through `popoverSkin`. The scrim is `elevation.sheet.color`
 * at a fixed alpha: **never `colors.onSurface`**, which inverts with the scheme
 * and paints a white veil over a dark page, which is what the base picker does
 * today. A shadow colour does not invert, because a shadow does not.
 *
 * The panel fades and lifts in over `PICKER_MOTION.popover`, and under the OS
 * "Reduce Motion" setting it is simply there (§36.10).
 */
function DatePickerV4({ value, onChange, min, max, placeholder = 'Select a date', invalid = false, disabled = false, locale, accessibilityLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [open, setOpen] = React.useState(false);
    const selected = (0, date_v4_1.toDate)(value);
    const selectedKey = selected ? (0, date_v4_1.toKey)(selected) : null;
    const [viewDate, setViewDate] = React.useState(() => (0, date_v4_1.startOfMonth)(selected ?? new Date()));
    const shiftMonth = (months) => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + months, 1));
    const weeks = (0, date_v4_1.monthGrid)(viewDate);
    const labels = React.useMemo(() => (0, date_v4_1.weekdayLabels)(locale), [locale]);
    const monthLabel = new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
    }).format(viewDate);
    const longDate = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const todayKey = (0, date_v4_1.toKey)(new Date());
    const target = (0, picker_v4_1.tapTarget)(theme);
    const disc = target - tokens.spacing.xs;
    const press = (0, picker_v4_1.pressFill)(theme);
    // Fades and lifts the panel; the value is read straight into the style so a
    // reduced-motion user simply gets the panel, with no timing function at all.
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
    const chevron = (label, glyph, delta) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: () => shiftMonth(delta), style: ({ pressed }) => ({
            width: target,
            height: target,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? press : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl }, children: glyph }) }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [(0, picker_v4_1.ringWrap)(theme, { focused: open, invalid }), style], children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled, expanded: open }, accessibilityLabel: accessibilityLabel, disabled: disabled, onPress: () => {
                        setViewDate((0, date_v4_1.startOfMonth)(selected ?? new Date()));
                        setOpen(true);
                    }, style: (0, picker_v4_1.fieldSkin)(theme, { focused: open, invalid, disabled }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flex: 1,
                                color: selected ? colors.onSurface : colors.mutedText,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.base,
                            }, children: selected ? longDate.format(selected) : placeholder }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { color: colors.mutedText, fontSize: tokens.typography.scale.base }, children: "\u25BE" })] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "none", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
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
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityViewIsModal: true, accessibilityLabel: `Choose a date — ${monthLabel}`, style: [
                                (0, picker_v4_1.popoverSkin)(theme, 'sheet'),
                                {
                                    padding: tokens.spacing.md,
                                    gap: tokens.spacing.xs,
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
                            ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }, children: [chevron('Previous month', '‹', -1), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                color: colors.onSurface,
                                                fontFamily: tokens.typography.fontHeading,
                                                fontSize: tokens.typography.scale.lg,
                                                fontWeight: '600',
                                            }, children: monthLabel }), chevron('Next month', '›', 1)] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: labels.map((label) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                    width: target,
                                                    alignItems: 'center',
                                                    paddingVertical: tokens.spacing.xs,
                                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                        color: colors.mutedText,
                                                        fontFamily: tokens.typography.fontBody,
                                                        fontSize: tokens.typography.scale.xs,
                                                        fontWeight: '600',
                                                    }, children: label }) }, label))) }), weeks.map((row, wi) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: row.map((date) => {
                                                const key = (0, date_v4_1.toKey)(date);
                                                const inMonth = date.getMonth() === viewDate.getMonth();
                                                const isSelected = selectedKey === key;
                                                const isToday = key === todayKey;
                                                const blocked = (0, date_v4_1.outOfRange)(key, min, max);
                                                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: longDate.format(date), accessibilityState: { selected: isSelected, disabled: blocked }, disabled: blocked, onPress: () => {
                                                        onChange?.(key);
                                                        setOpen(false);
                                                    }, style: {
                                                        width: target,
                                                        height: target,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }, children: ({ pressed }) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                            width: disc,
                                                            height: disc,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: tokens.radius.full,
                                                            backgroundColor: isSelected
                                                                ? colors.primary
                                                                : pressed && !blocked
                                                                    ? press
                                                                    : 'transparent',
                                                            borderWidth: isToday && !isSelected ? 1 : 0,
                                                            borderColor: colors.primary,
                                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                                color: isSelected
                                                                    ? colors.onPrimary
                                                                    : !inMonth || blocked
                                                                        ? colors.mutedText
                                                                        : colors.onSurface,
                                                                fontFamily: tokens.typography.fontBody,
                                                                fontSize: tokens.typography.scale.base,
                                                                fontWeight: isSelected || isToday ? '700' : '400',
                                                            }, children: date.getDate() }) })) }, key));
                                            }) }, wi)))] })] })] }) })] }));
}
//# sourceMappingURL=DatePickerV4.js.map