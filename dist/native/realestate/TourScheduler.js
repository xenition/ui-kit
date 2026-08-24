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
exports.TourScheduler = TourScheduler;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * Tour request scheduler — a grid (or list) of selectable time slots plus a
 * confirm button. Works controlled (`selectedId`) or uncontrolled; the confirm
 * button stays disabled until an available slot is chosen, then fires
 * `onSchedule` with it. Presentational: slots in, callbacks out, nothing
 * fetches. Empty `slots` degrades to the shared `EmptyState`. Selection is
 * conveyed via `accessibilityState.selected`, not color alone. Token-only.
 */
function TourScheduler({ title = 'Schedule a tour', dateLabel, slots, selectedId, onSelectSlot, onSchedule, confirmLabel = 'Schedule tour', variant = 'grid', loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const [internal, setInternal] = React.useState(undefined);
    const active = selectedId ?? internal;
    const container = (children) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), dateLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: dateLabel })) : null] }), children] }));
    if (slots.length === 0) {
        return container((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: "No tour times available", description: "Check back soon or request a custom time." }));
    }
    const selectedSlot = slots.find((s) => s.id === active);
    const handleSelect = (slot) => {
        if (slot.available === false)
            return;
        setInternal(slot.id);
        onSelectSlot?.(slot);
    };
    return container((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: variant === 'grid' ? 'row' : 'column',
                    flexWrap: variant === 'grid' ? 'wrap' : 'nowrap',
                    gap: tokens.spacing.sm,
                }, children: slots.map((slot) => {
                    const disabled = slot.available === false;
                    const isSelected = slot.id === active;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${slot.label}${disabled ? ', unavailable' : isSelected ? ', selected' : ''}`, accessibilityState: { selected: isSelected, disabled }, disabled: disabled, onPress: () => handleSelect(slot), style: {
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            borderWidth: 1,
                            borderColor: isSelected ? colors.primary : colors.border,
                            backgroundColor: isSelected ? colors.primary : colors.surface,
                            opacity: disabled ? 0.4 : 1,
                            alignItems: 'center',
                            minWidth: variant === 'grid' ? 88 : undefined,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: isSelected ? colors.onPrimary : colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '600',
                            }, children: slot.label }) }, slot.id));
                }) }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: !selectedSlot, loading: loading, onPress: () => {
                    if (selectedSlot)
                        onSchedule?.(selectedSlot);
                }, children: confirmLabel })] }));
}
//# sourceMappingURL=TourScheduler.js.map