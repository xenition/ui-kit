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
exports.RankingQuestion = RankingQuestion;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A ranking / ordering question — items shown in their current rank with a rank
 * number and up/down controls that reorder the list. Emits the full next id
 * order on every move; the move buttons disable at the ends and are labelled
 * ("Move X up") so the action is never icon-only for screen readers. Resolves a
 * complete order even when `value` is partial or stale. Empty items render a
 * muted empty state. No literal colors.
 */
function RankingQuestion({ items, value, onChange, accessibilityLabel = 'Ranking', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const byId = React.useMemo(() => new Map(items.map((it) => [it.id, it])), [items]);
    // Build a complete, valid order: known-valid ids from `value`, then any
    // items not yet referenced (keeps the control usable if `value` is partial).
    const orderedIds = React.useMemo(() => {
        const seen = new Set();
        const out = [];
        for (const id of value) {
            if (byId.has(id) && !seen.has(id)) {
                seen.add(id);
                out.push(id);
            }
        }
        for (const it of items) {
            if (!seen.has(it.id))
                out.push(it.id);
        }
        return out;
    }, [value, items, byId]);
    const move = (index, dir) => {
        const target = index + dir;
        if (target < 0 || target >= orderedIds.length)
            return;
        const next = orderedIds.slice();
        const a = next[index];
        const b = next[target];
        if (a === undefined || b === undefined)
            return;
        next[index] = b;
        next[target] = a;
        onChange(next);
    };
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "Nothing to rank." }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: accessibilityLabel, style: [{ gap: tokens.spacing.sm }, style], children: orderedIds.map((id, index) => {
            const item = byId.get(id);
            if (!item)
                return null;
            const isFirst = index === 0;
            const isLast = index === orderedIds.length - 1;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Rank ${index + 1}: ${item.label}`, style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    opacity: disabled ? 0.5 : 1,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 26,
                            height: 26,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.primary,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: index + 1 }) }), item.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: item.icon, size: "base", color: "onSurface" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: item.label }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Move ${item.label} up`, accessibilityState: { disabled: disabled || isFirst }, disabled: disabled || isFirst, onPress: () => move(index, -1), hitSlop: 6, style: { opacity: isFirst ? 0.3 : 1, padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u25B2", size: "sm", color: "onSurface" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Move ${item.label} down`, accessibilityState: { disabled: disabled || isLast }, disabled: disabled || isLast, onPress: () => move(index, 1), hitSlop: 6, style: { opacity: isLast ? 0.3 : 1, padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u25BC", size: "sm", color: "onSurface" }) })] }, id));
        }) }));
}
//# sourceMappingURL=RankingQuestion.js.map