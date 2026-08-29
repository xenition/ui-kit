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
exports.TagInputV4 = TagInputV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const picker_v4_1 = require("./internal/picker-v4");
const state_v4_1 = require("./internal/state-v4");
/**
 * **V4 tag input** — the same props as {@link TagInput}, a different design
 * line.
 *
 * ## The duplicate was the bug
 *
 * Type a tag you already have and the base clears the field and does nothing
 * else. From the outside that is indistinguishable from the app dropping your
 * input: you typed something, it vanished, and no tag appeared. §38 is explicit
 * that an error state has to help you recover, and the recovery here is simply
 * being told what happened.
 *
 * So V4 **keeps what you typed** and says `“React” is already added` under the
 * field, announced politely. Nothing is lost, the reason is on screen, and the
 * message clears itself the moment you change the text. `dedupe={false}` still
 * turns the whole rule off.
 *
 * ## The remove ✕ was the other one
 *
 * A chip's ✕ is necessarily small — it lives inside a 32px chip — and the base
 * gives it 6px of slop, so about a 24px target, sitting next to other chips'
 * ✕s. `hitSlopTo` opens it out to the same `tapTarget()` the rest of the line
 * uses without growing the chip by a pixel: the touch area extends past the
 * view, which is exactly what `hitSlop` is for.
 *
 * ## The rest
 *
 * The wrapper wears `InputV4`'s treatment — `2xl` minimum height, `md` radius,
 * the brand halo with its space reserved — and wraps to as many rows as the
 * tags need. Chips are `accent`/`onAccent`, a pair the compiler
 * contrast-checks, at `sm` rather than `xs`: a tag is a thing you have to be
 * able to read, not a decoration.
 */
function TagInputV4({ value = [], onChange, placeholder = 'Add a tag…', dedupe = true, invalid = false, disabled = false, accessibilityLabel = 'Add a tag', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [draft, setDraft] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    // What went wrong last time, in words. Cleared by the next keystroke.
    const [notice, setNotice] = React.useState(null);
    const add = () => {
        const t = draft.trim();
        if (!t)
            return;
        if (dedupe && value.some((v) => v.toLowerCase() === t.toLowerCase())) {
            // The draft is NOT cleared: losing what someone typed to tell them
            // nothing is the failure §38 is about.
            setNotice(`“${t}” is already added`);
            return;
        }
        onChange?.([...value, t]);
        setDraft('');
        setNotice(null);
    };
    const removeAt = (index) => {
        onChange?.(value.filter((_, i) => i !== index));
        setNotice(null);
    };
    const onKeyPress = (e) => {
        if (e.nativeEvent.key === 'Backspace' && draft.length === 0 && value.length > 0) {
            removeAt(value.length - 1);
        }
    };
    const chipHeight = tokens.spacing.xl;
    const removeGlyph = tokens.spacing.md;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, picker_v4_1.ringWrap)(theme, { focused, invalid }), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                        (0, picker_v4_1.fieldSkin)(theme, { focused, invalid, disabled }),
                        {
                            // The field grows down as tags accumulate rather than scrolling
                            // them out of sight.
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                            gap: tokens.spacing.xs,
                            paddingVertical: tokens.spacing.xs,
                        },
                    ], children: [value.map((tag, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                height: chipHeight,
                                backgroundColor: colors.accent,
                                borderRadius: tokens.radius.full,
                                paddingHorizontal: tokens.spacing.sm,
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onAccent,
                                        fontFamily: tokens.typography.fontBody,
                                        fontSize: tokens.typography.scale.sm,
                                    }, children: tag }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove ${tag}`, disabled: disabled, onPress: () => removeAt(i), 
                                    // The glyph stays chip-sized; only the touch area reaches the
                                    // floor, so the chip does not grow to accommodate it.
                                    hitSlop: (0, picker_v4_1.hitSlopTo)(theme, removeGlyph), style: ({ pressed }) => ({
                                        width: removeGlyph,
                                        height: removeGlyph,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: tokens.radius.full,
                                        // The chip's ink, not the page's: the layer has to stay
                                        // visible on the accent fill the chip is wearing.
                                        backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme, colors.onAccent) : 'transparent',
                                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onAccent, fontSize: tokens.typography.scale.xs }, children: "\u2715" }) })] }, `${tag}-${i}`))), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityLabel: accessibilityLabel, accessibilityState: { disabled }, value: draft, onChangeText: (t) => {
                                setDraft(t);
                                setNotice(null);
                            }, onSubmitEditing: add, onKeyPress: onKeyPress, onFocus: () => setFocused(true), onBlur: () => setFocused(false), blurOnSubmit: false, placeholder: value.length === 0 ? placeholder : '', placeholderTextColor: colors.mutedText, returnKeyType: "done", style: {
                                flexGrow: 1,
                                minWidth: tokens.spacing['2xl'],
                                height: chipHeight,
                                color: colors.onSurface,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.base,
                                padding: 0,
                            } })] }) }), notice !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", style: {
                    color: colors.mutedText,
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale.sm,
                }, children: notice })) : null] }));
}
//# sourceMappingURL=TagInputV4.js.map