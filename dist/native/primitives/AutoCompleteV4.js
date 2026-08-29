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
exports.AutoCompleteV4 = AutoCompleteV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const picker_v4_1 = require("./internal/picker-v4");
/**
 * Split a label around the first case-insensitive occurrence of `query`.
 * Returns `[before, match, after]`, with `match` empty when there is no hit.
 */
function splitMatch(label, query) {
    const q = query.trim();
    if (!q)
        return [label, '', ''];
    const at = label.toLowerCase().indexOf(q.toLowerCase());
    if (at < 0)
        return [label, '', ''];
    return [label.slice(0, at), label.slice(at, at + q.length), label.slice(at + q.length)];
}
/**
 * **V4 autocomplete** — the same props as {@link AutoComplete}, a different
 * design line.
 *
 * ## Three things that make a suggestion list feel confident
 *
 * 1. **Rows at `tapTarget()`.** The base row is `md` vertical padding around a
 *    line of text: comfortably tappable in isolation, and the row above it is a
 *    different search result. In a list where every neighbour is a wrong
 *    answer, the floor matters more than anywhere else in the kit.
 * 2. **The match, marked.** The part of each label that matched what you typed
 *    is bolded. That is not decoration: it is the answer to "why is this in the
 *    list", and it lets the eye confirm a row without reading it (§33 —
 *    optimise for scanning). §32 asks for recognition over recall, and a
 *    highlighted substring is recognition made visible.
 * 3. **A list that says when it is empty.** The base hides itself when nothing
 *    matches, which is indistinguishable from being broken. V4 keeps the panel
 *    and says so, quoting the query back (§37 — make system status visible;
 *    §15 — an empty state should tell the user where they are).
 *
 * ## The field and the panel
 *
 * The field is `InputV4`'s: `2xl` minimum height, `md` radius, and the brand
 * halo with its space reserved so focusing never nudges the page (§36.11). The
 * panel below it floats on `elevation.card` with its hairline kept, and takes
 * glass only when the seed asked for `depth: 'glass'` — `flatten()` neutralises
 * gradients and elevation and stops there, so elevation needs no depth check
 * and glass does.
 *
 * A pressed row is filled with `pressFill`, an opaque mix against the panel's
 * own surface rather than `colors.border`, so the feedback is a wash rather
 * than a slab.
 */
function AutoCompleteV4({ options, value = '', onChange, onSelect, placeholder = 'Type to search…', maxResults = 6, invalid = false, disabled = false, accessibilityLabel = 'Autocomplete', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [focused, setFocused] = React.useState(false);
    const query = value.trim();
    const matches = React.useMemo(() => {
        if (!query)
            return [];
        const q = query.toLowerCase();
        return options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, maxResults);
    }, [options, query, maxResults]);
    // The panel opens as soon as there is something to say — including that
    // there is nothing to say.
    const showPanel = focused && query.length > 0;
    const target = (0, picker_v4_1.tapTarget)(theme);
    const press = (0, picker_v4_1.pressFill)(theme);
    const choose = (opt) => {
        onChange?.(opt.label);
        onSelect?.(opt);
        setFocused(false);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ width: '100%' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, picker_v4_1.ringWrap)(theme, { focused, invalid }), children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, picker_v4_1.fieldSkin)(theme, { focused, invalid, disabled }), children: (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityLabel: accessibilityLabel, accessibilityState: { disabled, expanded: showPanel }, value: value, onChangeText: onChange, onFocus: () => setFocused(true), onBlur: () => setFocused(false), placeholder: placeholder, placeholderTextColor: colors.mutedText, autoCorrect: false, style: {
                            flex: 1,
                            color: colors.onSurface,
                            fontFamily: tokens.typography.fontBody,
                            fontSize: tokens.typography.scale.base,
                            padding: 0,
                        } }) }) }), showPanel ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Suggestions", style: [
                    (0, picker_v4_1.popoverSkin)(theme, 'card'),
                    { marginTop: tokens.spacing.xs, overflow: 'hidden' },
                ], children: matches.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", style: {
                        color: colors.mutedText,
                        fontFamily: tokens.typography.fontBody,
                        fontSize: tokens.typography.scale.sm,
                        paddingVertical: tokens.spacing.md,
                        paddingHorizontal: tokens.spacing.md,
                    }, children: `No matches for “${query}”` })) : ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { keyboardShouldPersistTaps: "handled", style: { maxHeight: target * 5 }, children: matches.map((opt) => {
                        const [before, hit, after] = splitMatch(opt.label, query);
                        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityLabel: opt.label, onPress: () => choose(opt), style: ({ pressed }) => ({
                                minHeight: target,
                                justifyContent: 'center',
                                paddingHorizontal: tokens.spacing.md,
                                backgroundColor: pressed ? press : 'transparent',
                            }), children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: colors.onSurface,
                                    fontFamily: tokens.typography.fontBody,
                                    fontSize: tokens.typography.scale.base,
                                }, children: [before, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontWeight: '700' }, children: hit }), after] }) }, opt.value));
                    }) })) })) : null] }));
}
//# sourceMappingURL=AutoCompleteV4.js.map