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
exports.PriceCalendarV4 = PriceCalendarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/**
 * PriceCalendar — **V4** "journey" design. The boarding-pass take on a fare
 * grid: clean `surface` day cells with muted price ink, where the cheapest
 * available day wears a small brand-gradient disc (`journeyDisc`) with
 * near-white price ink — the signature V4 touch. A currently selected day is
 * ringed in token `primary`. Same props/behavior as {@link PriceCalendarProps}:
 * each cell announces its date, price and cheapest flag via
 * `accessibilityLabel` (never color-alone), unavailable days (no `cents`) are
 * disabled, and selection is controlled via `selectedDate`. Token-only colors
 * via `useXenitionTheme()`.
 */
function PriceCalendarV4({ days, columns = 7, selectedDate, currency = 'USD', formatMoney: format = primitives_1.formatMoney, onSelectDay, style, }) {
    const { tokens } = (0, primitives_1.useXenitionTheme)();
    const cheapest = React.useMemo(() => {
        let min = Infinity;
        let key = null;
        for (const d of days) {
            if (typeof d.cents === 'number' && d.cents < min) {
                min = d.cents;
                key = d.date;
            }
        }
        return key;
    }, [days]);
    const cols = Math.max(1, columns);
    const widthPct = `${100 / cols}%`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', flexWrap: 'wrap' }, style], children: days.map((day, i) => ((0, jsx_runtime_1.jsx)(DayCell, { day: day, width: widthPct, isSelected: day.date === selectedDate, isCheapest: day.date === cheapest, currency: currency, format: format, onSelectDay: onSelectDay }, day.date || `day-${i}`))) }));
}
/**
 * One fare cell. The cheapest available day renders its price on a gradient disc
 * with near-white ink; a selected day is ringed in `primary`. Its own
 * `usePressScale` gives the pressed day a subtle dip, and all a11y is preserved.
 */
function DayCell({ day, width, isSelected, isCheapest, currency, format, onSelectDay, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const press = (0, motion_1.usePressScale)();
    const available = typeof day.cents === 'number';
    const priceText = available ? format(day.cents, currency) : '—';
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { width, padding: 2, transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${day.date}${available ? `, ${format(day.cents, currency)}` : ', unavailable'}${isCheapest ? ', cheapest' : ''}`, accessibilityState: { selected: isSelected, disabled: !available }, disabled: !available, onPress: available ? () => onSelectDay?.(day) : undefined, onPressIn: available ? press.onPressIn : undefined, onPressOut: available ? press.onPressOut : undefined, style: ({ pressed }) => ({
                borderWidth: 1,
                borderColor: isSelected ? colors.primary : colors.border,
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xs,
                alignItems: 'center',
                gap: 2,
                opacity: available ? (pressed ? 0.85 : 1) : 0.5,
            }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: day.label }), isCheapest ? ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                        borderRadius: tokens.radius.full,
                        paddingHorizontal: tokens.spacing.sm,
                        paddingVertical: 1,
                        overflow: 'hidden',
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: priceText }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: priceText }))] }) }));
}
//# sourceMappingURL=PriceCalendarV4.js.map