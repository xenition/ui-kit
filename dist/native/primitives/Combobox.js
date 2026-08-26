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
exports.Combobox = Combobox;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Searchable single-select (typeahead) — the native mirror of the web
 * `Combobox`. RN has no `<input>`-with-listbox, so this is a token-bound
 * `Pressable` trigger that opens a `Modal` holding a search `TextInput` (which
 * filters `options` by label) plus keyboard-free `Pressable` option rows. Same
 * `options`/`value`/`placeholder` contract as the web version; the web
 * `onChange` becomes the native `onValueChange`, and (like the native `Select`)
 * it adds `invalid`/`disabled`. No literal colors.
 */
function Combobox({ options, value, onValueChange, onChange, placeholder = 'Search…', invalid = false, disabled = false, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onValueChange ?? onChange;
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const selected = options.find((o) => o.value === value);
    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q)
            return options;
        return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, query]);
    const close = () => {
        setOpen(false);
        setQuery('');
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled, expanded: open }, accessibilityLabel: accessibilityLabel, disabled: disabled, onPress: () => setOpen(true), style: ({ pressed }) => [
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
                        }, children: selected ? selected.label : placeholder }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "\u25BE" })] }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: close, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: close, style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: tokens.ramps.neutral[950],
                                opacity: 0.5,
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                maxHeight: '70%',
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.lg,
                                overflow: 'hidden',
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { autoFocus: true, value: query, onChangeText: setQuery, placeholder: placeholder, placeholderTextColor: colors.muted, accessibilityLabel: "Filter options", style: {
                                            color: colors.onSurface,
                                            backgroundColor: colors.surface,
                                            borderWidth: 1,
                                            borderColor: colors.border,
                                            borderRadius: tokens.radius.sm,
                                            paddingVertical: tokens.spacing.sm,
                                            paddingHorizontal: tokens.spacing.md,
                                            fontSize: tokens.typography.scale.base,
                                        } }) }), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { keyboardShouldPersistTaps: "handled", children: filtered.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: colors.muted,
                                            fontSize: tokens.typography.scale.sm,
                                            paddingVertical: tokens.spacing.md,
                                            paddingHorizontal: tokens.spacing.lg,
                                        }, children: "No matches" })) : (filtered.map((opt) => {
                                        const active = opt.value === value;
                                        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityState: { selected: active }, onPress: () => {
                                                emit?.(opt.value);
                                                close();
                                            }, style: ({ pressed }) => ({
                                                paddingVertical: tokens.spacing.md,
                                                paddingHorizontal: tokens.spacing.lg,
                                                backgroundColor: pressed ? colors.border : 'transparent',
                                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                    color: active ? colors.primary : colors.onSurface,
                                                    fontSize: tokens.typography.scale.base,
                                                    fontWeight: active ? '600' : '400',
                                                }, children: opt.label }) }, opt.value));
                                    })) })] })] }) })] }));
}
//# sourceMappingURL=Combobox.js.map