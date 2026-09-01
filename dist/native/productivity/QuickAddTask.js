"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickAddTask = QuickAddTask;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** A single soft-primary quick-pick chip. Active = filled soft-primary; idle = outlined. */
function Chip({ chip, onPress }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const active = chip.active ?? false;
    const fg = active ? colors.primaryText : colors.mutedText;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: active }, accessibilityLabel: chip.label, onPress: onPress, disabled: !onPress, style: ({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            minHeight: 32,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.full,
            backgroundColor: active ? (0, color_1.withAlpha)(colors.primary, 0.14) : colors.surface,
            borderWidth: active ? 0 : 1,
            borderColor: colors.border,
            opacity: pressed ? 0.7 : 1,
        }), children: [chip.glyph ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: chip.glyph, size: "sm", color: active ? 'primaryText' : 'mutedText' })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: chip.label })] }));
}
/**
 * QuickAddTask — **V4** "flow" quick-add composer (native twin of the web
 * component). A calm, rounded, elevated card: a leading ⊕ glyph seated in a
 * **soft-primary disc**, a big legible controlled {@link TextInput}, a row of
 * soft-primary quick-pick chips (priority / due / project), and one **primary**
 * {@link Button} (≥44px, disabled while empty or `adding`). Controlled — the
 * caller owns `value` and is handed the next text via `onChangeText`; `onAdd`
 * fires on the button or keyboard submit with the trimmed value. Presentational
 * only. Token-only colors via `useXenitionTheme()` — no literals.
 */
function QuickAddTask({ value, onChangeText, placeholder = 'Add a task…', onAdd, adding = false, label = 'Add a task', addLabel = 'Add', glyph = '⊕', priority, onPriority, dueLabel, onDue, projectLabel, onProject, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const trimmed = value.trim();
    const canAdd = trimmed.length > 0 && !adding;
    const hasChips = Boolean(priority || dueLabel || projectLabel);
    const submit = () => {
        if (canAdd)
            onAdd?.(trimmed);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", color: "primaryText" }) }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: label, value: value, placeholder: placeholder, placeholderTextColor: colors.muted, editable: !adding, onChangeText: onChangeText, onSubmitEditing: submit, returnKeyType: "done", style: {
                            flex: 1,
                            padding: 0,
                            color: colors.onCard,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '500',
                            fontFamily: tokens.typography.fontBody,
                            opacity: adding ? 0.5 : 1,
                        } }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onPress: submit, disabled: !canAdd, loading: adding, accessibilityLabel: addLabel, style: { minHeight: 44, minWidth: 44 }, children: addLabel })] }), hasChips ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingLeft: 44 + tokens.spacing.md,
                }, children: [priority ? (0, jsx_runtime_1.jsx)(Chip, { chip: priority, onPress: onPriority }) : null, dueLabel ? (0, jsx_runtime_1.jsx)(Chip, { chip: dueLabel, onPress: onDue }) : null, projectLabel ? (0, jsx_runtime_1.jsx)(Chip, { chip: projectLabel, onPress: onProject }) : null] })) : null] }));
}
//# sourceMappingURL=QuickAddTask.js.map