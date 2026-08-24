"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableOfContents = TableOfContents;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/** Per-nesting-level indent (guards against undefined `level`). */
function indentFor(level, unit) {
    const depth = Math.max(0, (level ?? 1) - 1);
    return depth * unit;
}
/**
 * An in-article table of contents — the jump-list of headings for a long read.
 * Data-driven via `items` (each a `{ id, label, level }` heading); indents by
 * nesting `level` and highlights the `activeId` in the accent color. Tapping a
 * row fires `onSelect(id)` so the reader can scroll to that anchor. Renders an
 * `emptyLabel` when there are no headings. All colors from `SemanticColors`;
 * no literal hex.
 */
function TableOfContents({ items, activeId, onSelect, title = 'Contents', emptyLabel = 'No sections', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "menu", style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                gap: tokens.spacing.xs,
            },
            style,
        ], children: [title != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 0.6,
                    textTransform: 'uppercase',
                    marginBottom: tokens.spacing.xs,
                }, children: title })) : null, items.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })) : (items.map((item) => {
                const active = item.id === activeId;
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityLabel: item.label, accessibilityState: { selected: active }, disabled: !onSelect, onPress: onSelect ? () => onSelect(item.id) : undefined, style: ({ pressed }) => ({
                        paddingVertical: tokens.spacing.xs,
                        paddingLeft: indentFor(item.level, tokens.spacing.md),
                        opacity: pressed ? 0.6 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: active ? colors.accent : colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: active ? '700' : '400',
                        }, children: item.label }) }, item.id));
            }))] }));
}
//# sourceMappingURL=TableOfContents.js.map