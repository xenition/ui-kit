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
exports.PriceCalendar = PriceCalendar;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A cheapest-day fare grid — each cell shows a day label and its price, and the
 * lowest-priced available day is flagged (badge glyph + announcement, never
 * color-alone). Unavailable days (no `cents`) are disabled. Selection is
 * controlled via `selectedDate`. Token-only colors.
 */
function PriceCalendar({ days, columns = 7, selectedDate, currency = 'USD', formatMoney: format = primitives_1.formatMoney, onSelectDay, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
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
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', flexWrap: 'wrap' }, style], children: days.map((day, i) => {
            const available = typeof day.cents === 'number';
            const isSelected = day.date === selectedDate;
            const isCheapest = day.date === cheapest;
            const border = isSelected ? colors.primary : colors.border;
            const bg = isSelected ? colors.primary : colors.surface;
            const fg = isSelected ? colors.onPrimary : colors.onSurface;
            const priceColor = isSelected ? colors.onPrimary : isCheapest ? colors.success : colors.muted;
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: widthPct, padding: 2 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${day.date}${available ? `, ${format(day.cents, currency)}` : ', unavailable'}${isCheapest ? ', cheapest' : ''}`, accessibilityState: { selected: isSelected, disabled: !available }, disabled: !available, onPress: available ? () => onSelectDay?.(day) : undefined, style: ({ pressed }) => ({
                        borderWidth: 1,
                        borderColor: border,
                        backgroundColor: bg,
                        borderRadius: tokens.radius.sm,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.xs,
                        alignItems: 'center',
                        gap: 2,
                        opacity: available ? (pressed ? 0.85 : 1) : 0.5,
                    }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: isCheapest ? `★ ${day.label}` : day.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: priceColor, fontSize: tokens.typography.scale.xs }, children: available ? format(day.cents, currency) : '—' })] }) }, day.date || `day-${i}`));
        }) }));
}
//# sourceMappingURL=PriceCalendar.js.map