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
exports.MonthViewV2 = MonthViewV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const format_1 = require("./format");
const MAX_DOTS = 3;
/**
 * MonthView, redesigned (v2): a **large, elevated month grid**. The card floats
 * on a drop shadow (no border) and mounts with a gentle fade-in; each day is a
 * roomy square carrying its number plus a row of tone dots (up to three, then a
 * "+n"). Selected days fill; today gets a ring **and** a bold weight (never
 * color-alone). Same props, token-pure.
 */
function MonthViewV2({ month, events = [], selected, today, weekStartsOn = 0, density = 'full', onSelectDate, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const cells = React.useMemo(() => (0, format_1.monthGrid)(month, weekStartsOn), [month, weekStartsOn]);
    const headers = (0, format_1.weekdayHeader)(format_1.WEEKDAYS_SHORT, weekStartsOn);
    const eventsFor = (date) => events.filter((e) => (0, format_1.sameDay)(e.start, date));
    const maxDots = density === 'compact' ? 1 : MAX_DOTS;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityRole: "none", style: [
            {
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                backgroundColor: colors.surface,
                opacity: enter.opacity,
                transform: enter.transform,
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', marginBottom: tokens.spacing.xs }, children: headers.map((w, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: w }) }, i))) }), Array.from({ length: cells.length / 7 }).map((_, row) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: cells.slice(row * 7, row * 7 + 7).map((date, col) => {
                    if (date == null) {
                        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, aspectRatio: 1, padding: 2 } }, col);
                    }
                    const dayEvents = eventsFor(date);
                    const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                    const isToday = today != null && (0, format_1.sameDay)(today, date);
                    const dots = dayEvents.slice(0, maxDots);
                    const overflow = dayEvents.length - dots.length;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${date.getDate()}${isToday ? ', today' : ''}` +
                            (dayEvents.length ? `, ${dayEvents.length} event${dayEvents.length === 1 ? '' : 's'}` : ''), accessibilityState: { selected: isSelected }, onPress: () => onSelectDate?.(date), style: ({ pressed }) => ({ flex: 1, aspectRatio: 1, padding: 2, opacity: pressed ? 0.7 : 1 }), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flex: 1,
                                borderRadius: tokens.radius.md,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: tokens.spacing.xs,
                                gap: tokens.spacing.xs,
                                backgroundColor: isSelected ? colors.primary : 'transparent',
                                borderWidth: isToday && !isSelected ? 1.5 : 0,
                                borderColor: colors.primary,
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: isSelected ? colors.onPrimary : colors.onSurface,
                                        fontSize: tokens.typography.scale.base,
                                        fontWeight: isSelected || isToday ? '800' : '500',
                                    }, children: date.getDate() }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 2, minHeight: tokens.spacing.xs }, children: [dots.map((e, i) => {
                                            const { base } = (0, format_1.resolveTone)(colors, e.tone);
                                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                    width: tokens.spacing.xs,
                                                    height: tokens.spacing.xs,
                                                    borderRadius: tokens.radius.full,
                                                    backgroundColor: isSelected ? colors.onPrimary : base,
                                                } }, i));
                                        }), overflow > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                color: isSelected ? colors.onPrimary : colors.muted,
                                                fontSize: tokens.typography.scale.xs,
                                                fontWeight: '700',
                                            }, children: `+${overflow}` })) : null] })] }) }, col));
                }) }, row)))] }));
}
//# sourceMappingURL=MonthViewV2.js.map