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
exports.DatePicker = DatePicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const WEEKDAY_KEYS = [
    '2023-01-01', // Sun
    '2023-01-02',
    '2023-01-03',
    '2023-01-04',
    '2023-01-05',
    '2023-01-06',
    '2023-01-07', // Sat
];
/** Parse an ISO `YYYY-MM-DD` (or pass a `Date`) into a local-midnight `Date`. */
function toDate(input) {
    if (!input)
        return null;
    if (input instanceof Date)
        return Number.isNaN(input.getTime()) ? null : input;
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(input);
    if (!m) {
        const d = new Date(input);
        return Number.isNaN(d.getTime()) ? null : d;
    }
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}
/** Civil `YYYY-MM-DD` for a local `Date`. */
function toKey(d) {
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    return `${y}-${mo}-${da}`;
}
function startOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}
/** 6×7 grid of dates covering the month `viewDate` sits in (Sunday-first). */
function monthGrid(viewDate) {
    const first = startOfMonth(viewDate);
    const gridStart = new Date(first);
    gridStart.setDate(first.getDate() - first.getDay());
    const weeks = [];
    const cursor = new Date(gridStart);
    for (let w = 0; w < 6; w += 1) {
        const row = [];
        for (let i = 0; i < 7; i += 1) {
            row.push(new Date(cursor));
            cursor.setDate(cursor.getDate() + 1);
        }
        weeks.push(row);
    }
    return weeks;
}
/**
 * Zero-asset date field — the native mirror of the web `DatePicker`. RN has no
 * `<input type="date">`, so this is a token-bound `Pressable` showing the
 * formatted date that opens a `Modal` with a dependency-free month grid (plain
 * `Date` math; no external date lib) and prev/next month chevrons. Same
 * `value`/`min`/`max`/`invalid`/`disabled` contract; the web `onChange(string)`
 * is preserved (fires the picked day as ISO `YYYY-MM-DD`). Adds a `placeholder`.
 * Days outside `min`/`max` are muted and disabled. No literal colors.
 */
function DatePicker({ value, onChange, min, max, placeholder = 'Select a date', invalid = false, disabled = false, locale, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(false);
    const selected = toDate(value);
    const minDate = toDate(min ?? null);
    const maxDate = toDate(max ?? null);
    const selectedKey = selected ? toKey(selected) : null;
    const [viewDate, setViewDate] = React.useState(() => startOfMonth(selected ?? new Date()));
    const shiftMonth = (months) => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + months, 1));
    const weeks = monthGrid(viewDate);
    const weekdayLabels = React.useMemo(() => {
        const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
        return WEEKDAY_KEYS.map((k) => fmt.format(new Date(`${k}T12:00:00`)));
    }, [locale]);
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
    const outOfRange = (d) => {
        const k = toKey(d);
        if (minDate && k < toKey(minDate))
            return true;
        if (maxDate && k > toKey(maxDate))
            return true;
        return false;
    };
    const chevron = (label, delta) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: () => shiftMonth(delta), style: ({ pressed }) => ({
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.sm,
            opacity: pressed ? 0.6 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg }, children: delta < 0 ? '‹' : '›' }) }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled, expanded: open }, accessibilityLabel: accessibilityLabel, disabled: disabled, onPress: () => {
                    setViewDate(startOfMonth(selected ?? new Date()));
                    setOpen(true);
                }, style: ({ pressed }) => [
                    {
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: colors.surface,
                        borderWidth: 1,
                        borderColor: invalid ? colors.danger : colors.border,
                        borderRadius: tokens.radius.sm,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
                    },
                    style,
                ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: selected ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale.base,
                        }, children: selected ? longDate.format(selected) : placeholder }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "\u25BE" })] }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: () => setOpen(false), style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: tokens.ramps.neutral[950],
                                opacity: 0.5,
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.lg,
                                padding: tokens.spacing.md,
                                gap: tokens.spacing.sm,
                            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }, children: [chevron('Previous month', -1), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                color: colors.onSurface,
                                                fontSize: tokens.typography.scale.sm,
                                                fontWeight: '600',
                                            }, children: monthLabel }), chevron('Next month', 1)] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Choose a date — ${monthLabel}`, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: weekdayLabels.map((label) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, alignItems: 'center', paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                        color: colors.muted,
                                                        fontSize: tokens.typography.scale.xs,
                                                        fontWeight: '500',
                                                    }, children: label }) }, label))) }), weeks.map((row, wi) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: row.map((date) => {
                                                const key = toKey(date);
                                                const inMonth = date.getMonth() === viewDate.getMonth();
                                                const isSelected = selectedKey === key;
                                                const blocked = outOfRange(date);
                                                const dayColor = isSelected
                                                    ? colors.onPrimary
                                                    : !inMonth || blocked
                                                        ? colors.muted
                                                        : colors.onSurface;
                                                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: longDate.format(date), accessibilityState: { selected: isSelected, disabled: blocked }, disabled: blocked, onPress: () => {
                                                            onChange?.(key);
                                                            setOpen(false);
                                                        }, style: ({ pressed }) => ({
                                                            minWidth: 44,
                                                            minHeight: 44,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: tokens.radius.md,
                                                            opacity: blocked ? 0.4 : 1,
                                                            backgroundColor: isSelected
                                                                ? colors.primary
                                                                : pressed && !blocked
                                                                    ? tokens.ramps.neutral[100]
                                                                    : 'transparent',
                                                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                                color: dayColor,
                                                                fontSize: tokens.typography.scale.sm,
                                                                fontWeight: isSelected ? '700' : '400',
                                                            }, children: date.getDate() }) }) }, key));
                                            }) }, wi)))] })] })] }) })] }));
}
//# sourceMappingURL=DatePicker.js.map