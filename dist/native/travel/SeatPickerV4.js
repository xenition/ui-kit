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
exports.SeatPickerV4 = SeatPickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/** Glyph reinforces status so it is never conveyed by color alone. */
const STATUS_GLYPH = {
    available: '',
    occupied: '✕',
    selected: '✓',
};
/** Legend entries mirror the seat states below. */
const LEGEND = [
    { status: 'available', label: 'Available' },
    { status: 'selected', label: 'Selected' },
    { status: 'occupied', label: 'Taken' },
];
/**
 * SeatPicker — **V4** "journey" design. A refined cabin seat map for the
 * boarding-pass line: a grid of pressable seats where the chosen seat is filled
 * with the brand journey gradient (`journeyDisc`) and near-white glyph (the
 * signature V4 touch), available seats sit as clean `surface` tiles, and
 * occupied seats read muted and disabled. A legend row explains the states.
 * Same props/behavior as {@link SeatPickerProps}: each seat announces its label
 * and status via `accessibilityLabel`/`accessibilityState` and carries a glyph
 * (`✓` selected, `✕` occupied), so state never depends on color alone. Occupied
 * seats never fire `onSelect`. Selection is controlled via `selectedIds`.
 * Token-only colors via `useXenitionTheme()`.
 */
function SeatPickerV4({ rows, selectedIds = [], rowLabels, onSelect, maxSelectable, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const selected = React.useMemo(() => new Set(selectedIds), [selectedIds]);
    const statusOf = (seat) => {
        if (seat.occupied)
            return 'occupied';
        return selected.has(seat.id) ? 'selected' : 'available';
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: [{ gap: tokens.spacing.sm, alignSelf: 'flex-start' }, style], children: [rows.map((seats, r) => {
                const rowLabel = rowLabels && r < rowLabels.length ? rowLabels[r] : String(r + 1);
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 20, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.xs }, children: rowLabel }), seats.map((seat, c) => ((0, jsx_runtime_1.jsx)(SeatButton, { seat: seat, status: statusOf(seat), onSelect: onSelect }, seat.id || `seat-${r}-${c}`)))] }, `row-${r}`));
            }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.md }, children: LEGEND.map(({ status, label }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(LegendSwatch, { status: status }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label })] }, status))) }), typeof maxSelectable === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `Selected ${selected.size} of ${maxSelectable}` })) : null] }));
}
/** A small non-interactive swatch echoing a seat state for the legend. */
function LegendSwatch({ status }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const base = {
        width: 16,
        height: 16,
        borderRadius: tokens.radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    };
    if (status === 'selected') {
        return ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: { ...base, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: 9 }, children: STATUS_GLYPH.selected }) }));
    }
    const bg = status === 'occupied' ? colors.muted : colors.surface;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { ...base, backgroundColor: bg, borderWidth: 1, borderColor: colors.border, opacity: status === 'occupied' ? 0.6 : 1 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: 9 }, children: STATUS_GLYPH[status] }) }));
}
/**
 * A single seat. Selected seats render on the journey gradient with near-white
 * ink; available seats are clean `surface` tiles; occupied seats stay muted and
 * disabled (no press feedback). Its own `usePressScale` gives a live seat a
 * subtle tap scale, and all a11y — label, selected/disabled state, status glyph
 * — is preserved.
 */
function SeatButton({ seat, status, onSelect }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const press = (0, motion_1.usePressScale)();
    const label = seat.label ?? seat.id;
    const disabled = status === 'occupied';
    const glyph = STATUS_GLYPH[status];
    const selected = status === 'selected';
    const inner = ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
            color: selected ? (0, journey_1.journeyInk)(r) : status === 'occupied' ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '600',
        }, children: glyph || label }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Seat ${label}, ${status === 'selected' ? 'selected' : status}`, accessibilityState: { selected, disabled }, disabled: disabled, onPress: disabled ? undefined : () => onSelect?.(seat), onPressIn: disabled ? undefined : press.onPressIn, onPressOut: disabled ? undefined : press.onPressOut, style: ({ pressed }) => ({ opacity: disabled ? 0.6 : pressed ? 0.85 : 1 }), children: selected ? ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                    width: 36,
                    height: 36,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: r.primary[600],
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: inner })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 36,
                    height: 36,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: status === 'occupied' ? colors.muted : colors.surface,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: inner })) }) }));
}
//# sourceMappingURL=SeatPickerV4.js.map