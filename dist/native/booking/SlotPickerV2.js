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
exports.SlotPickerV2 = SlotPickerV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const datetime_1 = require("../../booking/datetime");
const color_1 = require("../primitives/internal/color");
const startOf = (s) => s == null ? null : typeof s === 'string' ? s : s.startsAt;
const PERIOD_ORDER = ['morning', 'afternoon', 'evening'];
const PERIOD_LABEL = {
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
};
/** Hour-of-day (0–23) for an ISO instant in the given IANA zone, or -1. */
function hourInTz(iso, tz) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime()))
        return -1;
    const s = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hour12: false }).format(d);
    const n = Number.parseInt(s, 10);
    return Number.isFinite(n) ? n % 24 : -1;
}
function periodOf(hour) {
    if (hour >= 17)
        return 'evening';
    if (hour >= 12)
        return 'afternoon';
    return 'morning'; // includes the -1 (unparseable) fallback
}
/**
 * SlotPicker — design variant **V2**: bookable times **grouped into Morning /
 * Afternoon / Evening**, each section a wrap-flowed set of time chips. Where V1
 * is one flat FlatList grid, V2 buckets slots by their local hour (in
 * `timeZone`) under labelled section headers, so a long day of availability
 * scans at a glance. A full slot (`spotsLeft === 0`) is disabled and shows the
 * `fullLabel`; low capacity surfaces a "{n} left" hint; the selected chip fills
 * with the primary token. Same
 * `slots`/`onPick`/`selected`/`formatTime`/`timeZone`/`lowSpotsThreshold`/
 * `fullLabel` contract as {@link SlotPickerProps} (`columns`/`scrollEnabled` are
 * accepted for drop-in parity; the wrap layout is fluid). Token-only.
 */
function SlotPickerV2({ slots, onPick, selected, formatTime, timeZone, lowSpotsThreshold = 3, fullLabel = 'Full', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const format = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, timeZone));
    const selectedStart = startOf(selected);
    const groups = React.useMemo(() => {
        const map = { morning: [], afternoon: [], evening: [] };
        for (const slot of slots ?? []) {
            map[periodOf(hourInTz(slot.startsAt, timeZone))].push(slot);
        }
        return map;
    }, [slots, timeZone]);
    const hasAny = PERIOD_ORDER.some((p) => groups[p].length > 0);
    if (!hasAny) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ padding: tokens.spacing.md }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No times available." }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: PERIOD_ORDER.map((period) => {
            const items = groups[period];
            if (items.length === 0)
                return null;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '700',
                            letterSpacing: 0.6,
                        }, children: PERIOD_LABEL[period].toUpperCase() }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: items.map((slot) => {
                            const full = slot.spotsLeft <= 0;
                            const isSelected = selectedStart === slot.startsAt;
                            const low = !full && slot.spotsLeft <= lowSpotsThreshold;
                            const hint = full ? fullLabel : low ? `${slot.spotsLeft} left` : `${slot.spotsLeft} open`;
                            const timeLabel = format(slot.startsAt);
                            const fg = isSelected ? colors.onPrimary : colors.onSurface;
                            const hintColor = isSelected ? colors.onPrimary : colors.muted;
                            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${timeLabel}, ${hint}`, accessibilityState: { selected: isSelected, disabled: full }, disabled: full, onPress: () => onPick?.(slot), style: ({ pressed }) => ({
                                    alignItems: 'center',
                                    gap: 2,
                                    minWidth: 88,
                                    borderRadius: tokens.radius.full,
                                    borderWidth: 1,
                                    borderColor: isSelected ? colors.primary : colors.border,
                                    backgroundColor: isSelected
                                        ? colors.primary
                                        : pressed && !full
                                            ? (0, color_1.withAlpha)(colors.primary, 0.1)
                                            : colors.surface,
                                    paddingVertical: tokens.spacing.sm,
                                    paddingHorizontal: tokens.spacing.md,
                                    opacity: full ? 0.5 : 1,
                                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: timeLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: hintColor, fontSize: tokens.typography.scale.xs }, children: hint })] }, slot.startsAt));
                        }) })] }, period));
        }) }));
}
//# sourceMappingURL=SlotPickerV2.js.map