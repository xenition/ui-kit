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
exports.BookingCalendarV2 = BookingCalendarV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const datetime_1 = require("../../booking/datetime");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
const WEEKDAY_KEYS = [
    '2023-01-01', // Sun
    '2023-01-02',
    '2023-01-03',
    '2023-01-04',
    '2023-01-05',
    '2023-01-06',
    '2023-01-07', // Sat
];
function weekdayLabels(weekStartsOn, locale) {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const labels = WEEKDAY_KEYS.map((k) => fmt.format(new Date(`${k}T12:00:00`)));
    return [...labels.slice(weekStartsOn), ...labels.slice(0, weekStartsOn)];
}
function buildAvailability(slots, availability, timezone) {
    const map = new Map();
    if (availability) {
        for (const a of availability)
            map.set(a.date, a.count);
        return map;
    }
    for (const slot of slots ?? []) {
        if (slot.spotsLeft <= 0)
            continue;
        const key = (0, datetime_1.dayKeyInTz)(slot.startsAt, timezone);
        map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
}
/**
 * BookingCalendar — design variant **V2**: a **large, elevated month grid**.
 * Where V1 is a compact bordered grid of 36px cells, V2 floats on a shadowed,
 * borderless card with generous 48px day tiles, an oversized month title, and a
 * bold dot beneath every day that has openings. The selected day fills with the
 * primary token (a shape change, not color alone) and today's tile carries a
 * token ring — so state never rests on hue. Same
 * `slots`/`availability`/`selectedDate`/`onSelectDate`/`timezone`/`view`/
 * `weekStartsOn`/`locale` contract as {@link BookingCalendarProps}. Token-only.
 */
function BookingCalendarV2({ slots, availability, selectedDate, onSelectDate, timezone, view = 'month', weekStartsOn = 0, locale, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 10 });
    const availabilityMap = React.useMemo(() => buildAvailability(slots, availability, timezone), [slots, availability, timezone]);
    const anchor = selectedDate ?? new Date();
    const [viewDate, setViewDate] = React.useState(() => (0, datetime_1.startOfMonth)(anchor));
    const shiftView = (months) => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + months, 1));
    const weeks = view === 'week'
        ? [(0, datetime_1.weekRow)(selectedDate ?? viewDate, weekStartsOn)]
        : (0, datetime_1.monthMatrix)(viewDate, weekStartsOn);
    const labels = weekdayLabels(weekStartsOn, locale);
    const monthLabel = new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
    }).format(view === 'week' ? (weeks[0]?.[0] ?? viewDate) : viewDate);
    const longDate = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const selectedKey = selectedDate ? (0, datetime_1.toDayKey)(selectedDate) : null;
    const todayKey = (0, datetime_1.toDayKey)(new Date());
    const chevron = (label, delta) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: () => shiftView(delta), style: ({ pressed }) => ({
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? (0, color_1.withAlpha)(colors.primary, 0.12) : (0, color_1.withAlpha)(colors.primary, 0.06),
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '600' }, children: delta < 0 ? '‹' : '›' }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            { opacity: enter.opacity, transform: enter.transform },
            {
                alignSelf: 'flex-start',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 0,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [chevron('Previous month', -1), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.xl,
                            fontWeight: '700',
                        }, children: monthLabel }), chevron('Next month', 1)] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Choose a date — ${monthLabel}`, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', marginBottom: tokens.spacing.xs }, children: labels.map((label) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.muted,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '700',
                                    letterSpacing: 0.5,
                                }, children: label.toUpperCase() }) }, label))) }), weeks.map((row, wi) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: row.map((date) => {
                            const key = (0, datetime_1.toDayKey)(date);
                            const inMonth = view === 'week' || date.getMonth() === viewDate.getMonth();
                            const count = availabilityMap.get(key) ?? 0;
                            const hasAvail = count > 0;
                            const isSelected = selectedKey === key;
                            const isToday = !isSelected && key === todayKey;
                            const disabled = !inMonth;
                            const ariaSuffix = hasAvail ? ', available' : ', no availability';
                            const dayColor = isSelected
                                ? colors.onPrimary
                                : disabled
                                    ? colors.muted
                                    : colors.onSurface;
                            const dotColor = isSelected ? colors.onPrimary : colors.primary;
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', padding: 3 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: longDate.format(date) + ariaSuffix, accessibilityState: { selected: isSelected, disabled }, disabled: disabled, onPress: () => onSelectDate?.(date), style: ({ pressed }) => ({
                                        width: 48,
                                        height: 52,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: tokens.radius.md,
                                        borderWidth: isToday ? 1.5 : 0,
                                        borderColor: isToday ? colors.primary : 'transparent',
                                        backgroundColor: isSelected
                                            ? colors.primary
                                            : pressed && !disabled
                                                ? (0, color_1.withAlpha)(colors.primary, 0.1)
                                                : 'transparent',
                                    }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                color: dayColor,
                                                fontSize: tokens.typography.scale.base,
                                                fontWeight: hasAvail && !isSelected ? '700' : '500',
                                            }, children: date.getDate() }), hasAvail ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-calendar-v2-dot", pointerEvents: "none", style: {
                                                marginTop: 3,
                                                width: 6,
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: dotColor,
                                            } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { marginTop: 3, width: 6, height: 6 } }))] }) }, key));
                        }) }, wi)))] })] }));
}
//# sourceMappingURL=BookingCalendarV2.js.map