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
exports.DateRangePickerV4 = DateRangePickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const date_v4_1 = require("../../primitives/internal/date-v4");
const picker_v4_1 = require("./internal/picker-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const motion_v4_1 = require("./internal/motion-v4");
/**
 * **V4 date range** — the same props as {@link DateRangePicker}, a different
 * design line.
 *
 * ## One range, one calendar
 *
 * The base composes two independent `DatePicker`s and keeps them from crossing.
 * That is correct and it is not a range: the user picks a date, closes a
 * calendar, opens a second calendar, and has to hold the first date in their
 * head while doing it — §32's "recognition over recall", failed twice over.
 * Worse, at no point do they ever see the span they are choosing.
 *
 * V4 is the pattern every booking flow has settled on, which is exactly why
 * §31 points at it: **one field with two segments, one calendar, tap start then
 * tap end.** The span fills in as you go, so the thing being chosen is the
 * thing on screen. A caption under the grid says which end the next tap sets,
 * so the mode is never a guess (§37 — make system status visible).
 *
 * ## The span has to survive dark mode
 *
 * The two ends are filled `primary` discs with `onPrimary` ink — the pair the
 * compiler contrast-checks. The days between them get `rangeFill`, which is the
 * brand composited ONCE against `colors.surface` into an opaque colour.
 *
 * That last part is the whole reason the helper exists. `ramps.primary[50]` —
 * the obvious "lighter primary" — carries the light orientation in BOTH
 * schemes, so on a dark page the band is near-white and the range reads as a
 * hole punched through the calendar. A translucent primary is scheme-correct
 * but composites against whatever ground it lands on, and this band lands on
 * the panel, on glass, and over a scrimmed page. Compositing once, against the
 * panel's own surface, is the only version that is right in all three.
 *
 * The band is drawn as a full-bleed layer behind the day, half-width on the two
 * ends, so the span is one continuous shape rather than seven separate chips.
 *
 * ## Everything else
 *
 * The field wears `InputV4`'s treatment and halo, day cells are at
 * `tapTarget()`, the scrim is black from the elevation token rather than
 * `colors.onSurface`, and the panel takes `elevation.sheet` — glass only when
 * the seed asked for it. Under "Reduce Motion" the panel is simply there.
 */
function DateRangePickerV4({ value = { start: null, end: null }, onChange, min, max, startLabel = 'Start', endLabel = 'End', locale, invalid = false, disabled = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [open, setOpen] = React.useState(false);
    const [editing, setEditing] = React.useState('start');
    const startDate = (0, date_v4_1.toDate)(value.start);
    const endDate = (0, date_v4_1.toDate)(value.end);
    const [viewDate, setViewDate] = React.useState(() => (0, date_v4_1.startOfMonth)(startDate ?? new Date()));
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
    const shortDate = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' });
    const target = (0, picker_v4_1.tapTarget)(theme);
    const disc = target - tokens.spacing.xs;
    const band = (0, picker_v4_1.rangeFill)(theme);
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
    const openAt = (which) => {
        setEditing(which);
        setViewDate((0, date_v4_1.startOfMonth)((which === 'end' ? endDate : startDate) ?? new Date()));
        setOpen(true);
    };
    /**
     * Tap-to-tap range building.
     *
     * Starting over is always allowed and never an error: a tap before the
     * current start, or a tap when the range is already complete, begins a new
     * range rather than refusing (§24 — make experimentation safe). The only
     * thing that can never happen is a crossed range.
     */
    const pick = (key) => {
        if (editing === 'start' || !value.start || value.end || key < value.start) {
            onChange?.({ start: key, end: null });
            setEditing('end');
            return;
        }
        onChange?.({ start: value.start, end: key });
        setEditing('start');
        setOpen(false);
    };
    const segment = (label, date, which, placeholder) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { disabled, expanded: open && editing === which }, disabled: disabled, onPress: () => openAt(which), style: { flex: 1, minHeight: target, justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.mutedText,
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '600',
                }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: date ? colors.onSurface : colors.mutedText,
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale.base,
                }, children: date ? shortDate.format(date) : placeholder })] }));
    const chevron = (label, glyph, delta) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: () => shiftMonth(delta), style: ({ pressed }) => ({
            width: target,
            height: target,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? press : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl }, children: glyph }) }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [(0, picker_v4_1.ringWrap)(theme, { focused: open, invalid }), style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, picker_v4_1.fieldSkin)(theme, { focused: open, invalid, disabled }), children: [segment(startLabel, startDate, 'start', 'Add date'), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { color: colors.mutedText, fontSize: tokens.typography.scale.base }, children: "\u2192" }), segment(endLabel, endDate, 'end', 'Add date')] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "none", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
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
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityViewIsModal: true, accessibilityLabel: `Choose a date range — ${monthLabel}`, style: [
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
                                            }, children: monthLabel }), chevron('Next month', '›', 1)] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: labels.map((label) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
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
                                        const blocked = (0, date_v4_1.outOfRange)(key, min, max);
                                        const pos = (0, date_v4_1.rangePosition)(key, value.start, value.end);
                                        const capped = pos === 'start' || pos === 'end' || pos === 'only';
                                        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: longDate.format(date), accessibilityState: { selected: pos !== 'none', disabled: blocked }, disabled: blocked, onPress: () => pick(key), style: {
                                                width: target,
                                                height: target,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }, children: ({ pressed }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [pos === 'middle' || pos === 'start' || pos === 'end' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: {
                                                            position: 'absolute',
                                                            top: tokens.spacing.xs / 2,
                                                            bottom: tokens.spacing.xs / 2,
                                                            left: pos === 'start' ? '50%' : 0,
                                                            right: pos === 'end' ? '50%' : 0,
                                                            backgroundColor: band,
                                                        } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                            width: disc,
                                                            height: disc,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: tokens.radius.full,
                                                            backgroundColor: capped
                                                                ? colors.primary
                                                                : pressed && !blocked
                                                                    ? press
                                                                    : 'transparent',
                                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                                color: capped
                                                                    ? colors.onPrimary
                                                                    : !inMonth || blocked
                                                                        ? colors.mutedText
                                                                        : colors.onSurface,
                                                                fontFamily: tokens.typography.fontBody,
                                                                fontSize: tokens.typography.scale.base,
                                                                fontWeight: capped ? '700' : '400',
                                                            }, children: date.getDate() }) })] })) }, key));
                                    }) }, wi))), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", style: {
                                        color: colors.mutedText,
                                        fontFamily: tokens.typography.fontBody,
                                        fontSize: tokens.typography.scale.sm,
                                        paddingTop: tokens.spacing.xs,
                                    }, children: editing === 'start' || !value.start
                                        ? `Choose the ${startLabel.toLowerCase()} date`
                                        : `Choose the ${endLabel.toLowerCase()} date` })] })] }) })] }));
}
//# sourceMappingURL=DateRangePickerV4.js.map