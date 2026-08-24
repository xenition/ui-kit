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
exports.BookingCalendarV3 = BookingCalendarV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const datetime_1 = require("../../booking/datetime");
const color_1 = require("../primitives/internal/color");
/** Number of days rendered in the horizontal strip. */
const STRIP_DAYS = 14;
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
 * BookingCalendar — design variant **V3**: a **compact horizontal date strip**
 * (a swipeable week scroller). Instead of a six-row month grid, V3 lays a
 * two-week run of day pills in a single scrolling row — each pill stacks the
 * short weekday over the day number with an availability dot beneath, and the
 * strip starts at the top of the week containing `selectedDate`. The selected
 * pill fills with the primary token; today gets a token ring. Ideal for tight
 * mobile flows where a full calendar is too heavy. Same
 * `slots`/`availability`/`selectedDate`/`onSelectDate`/`timezone`/
 * `weekStartsOn`/`locale` contract as {@link BookingCalendarProps} (`view` is
 * accepted for drop-in parity but the strip layout is always linear).
 * Token-only.
 */
function BookingCalendarV3({ slots, availability, selectedDate, onSelectDate, timezone, weekStartsOn = 0, locale, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const availabilityMap = React.useMemo(() => buildAvailability(slots, availability, timezone), [slots, availability, timezone]);
    const anchor = selectedDate ?? new Date();
    const start = (0, datetime_1.weekRow)(anchor, weekStartsOn)[0] ?? anchor;
    const days = React.useMemo(() => Array.from({ length: STRIP_DAYS }, (_, i) => (0, datetime_1.addDays)(start, i)), 
    // `start` is derived from anchor day; key on its civil day so the strip is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [(0, datetime_1.toDayKey)(start)]);
    const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const longDate = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const firstDay = days[0] ?? anchor;
    const lastDay = days[days.length - 1] ?? anchor;
    const rangeLabel = `${new Intl.DateTimeFormat(locale, { month: 'long' }).format(firstDay)} ${firstDay.getFullYear()}`;
    const selectedKey = selectedDate ? (0, datetime_1.toDayKey)(selectedDate) : null;
    const todayKey = (0, datetime_1.toDayKey)(new Date());
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                paddingVertical: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    paddingHorizontal: tokens.spacing.md,
                }, children: rangeLabel }), (0, jsx_runtime_1.jsx)(react_native_1.FlatList, { horizontal: true, data: days, showsHorizontalScrollIndicator: false, keyExtractor: (d) => (0, datetime_1.toDayKey)(d), accessibilityLabel: `Choose a date between ${longDate.format(firstDay)} and ${longDate.format(lastDay)}`, contentContainerStyle: { gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }, renderItem: ({ item: date }) => {
                    const key = (0, datetime_1.toDayKey)(date);
                    const count = availabilityMap.get(key) ?? 0;
                    const hasAvail = count > 0;
                    const isSelected = selectedKey === key;
                    const isToday = !isSelected && key === todayKey;
                    const ariaSuffix = hasAvail ? ', available' : ', no availability';
                    const fg = isSelected ? colors.onPrimary : colors.onSurface;
                    const dotColor = isSelected ? colors.onPrimary : colors.primary;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: longDate.format(date) + ariaSuffix, accessibilityState: { selected: isSelected }, onPress: () => onSelectDate?.(date), style: ({ pressed }) => ({
                            width: 56,
                            alignItems: 'center',
                            gap: 2,
                            paddingVertical: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            borderWidth: isToday ? 1.5 : 0,
                            borderColor: isToday ? colors.primary : 'transparent',
                            backgroundColor: isSelected
                                ? colors.primary
                                : pressed
                                    ? (0, color_1.withAlpha)(colors.primary, 0.1)
                                    : tokens.ramps.neutral[100],
                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: isSelected ? colors.onPrimary : colors.muted,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '600',
                                    letterSpacing: 0.4,
                                }, children: weekdayFmt.format(date).toUpperCase() }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: date.getDate() }), hasAvail ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-calendar-v3-dot", pointerEvents: "none", style: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: dotColor } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { width: 5, height: 5 } }))] }));
                } })] }));
}
//# sourceMappingURL=BookingCalendarV3.js.map