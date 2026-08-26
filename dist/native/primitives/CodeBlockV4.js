"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockV4 = CodeBlockV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const v4_data_1 = require("../../primitives/internal/v4-data");
const state_v4_1 = require("./internal/state-v4");
/** Line height as a ratio of the size — a proportion, not a picked number. */
const CODE_LEADING = 1.5;
/**
 * **V4 code block** — same props as {@link CodeBlock}, a different design line.
 *
 * Code is the one content in this kit that is read character by character, so
 * the V4 answer is the opposite of decoration: a calmer surface and one more
 * piece of structure.
 *
 * Three changes:
 *
 * 1. **A calm, recessed ground.** The base painted the code on `surface` — the
 *    same colour as the page — so a block sat on a page it could not be
 *    distinguished from except by its border. V4 sinks the body by the same 4%
 *    neutral step the V4 tables band with, mixed from the two scheme-resolved
 *    slots so it darkens a light page and lightens a dark one. One recessed
 *    amount for the whole data-display line, and the block reads as quoted
 *    rather than as more page.
 * 2. **A gutter with an edge.** The header keeps its rule and the gutter gains
 *    one. A line number the reader is counting to needs something to stop at;
 *    with only a margin the numbers read as a first column of code. That is
 *    the second and last rule on the surface — everything else is spacing
 *    (§9).
 * 3. **The header is chrome, the body is content.** The header stays on
 *    `surface` while the body sinks, so the two layers are told apart by
 *    ground rather than by another border. The copy control also takes a real
 *    `xl` target and tints on press instead of doing nothing visible.
 *
 * **No gradient, anywhere near this.** §35.11 keeps gradients for a hero and
 * one primary action; a brand sweep behind code is decoration laid over
 * something read one glyph at a time. **No syntax colours either** — the base
 * highlights nothing, and inventing a palette here would be a second colour
 * system living outside the seed.
 *
 * `fontFamily: 'monospace'` is a font family, not a colour. Monospace figures
 * are tabular by construction, so the gutter needs no numeral setting of its
 * own.
 */
function CodeBlockV4({ code, language, lineNumbers = true, onCopy, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const lines = code.replace(/\n$/, '').split('\n');
    const showHeader = language != null || onCopy != null;
    const ground = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, v4_data_1.ZEBRA_MIX);
    const rule = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, v4_data_1.RULE_MIX);
    const pressedBg = (0, state_v4_1.pressFill)(theme);
    const size = tokens.typography.scale.sm;
    const codeText = {
        fontFamily: 'monospace',
        fontSize: size,
        lineHeight: size * CODE_LEADING,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            style,
        ], children: [showHeader ? (
            // Chrome, not content: it stays on `surface` while the body sinks.
            (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                    borderBottomWidth: 1,
                    borderColor: rule,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.mutedText,
                            fontFamily: tokens.typography.fontBody,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '600',
                        }, children: language ?? '' }), onCopy != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Copy code", onPress: () => onCopy(code), style: ({ pressed }) => ({
                            minHeight: tokens.spacing.xl,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: pressed ? pressedBg : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.primaryText,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '600',
                            }, children: "Copy" }) })) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: { backgroundColor: ground }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', padding: tokens.spacing.md, backgroundColor: ground }, children: [lineNumbers ? (
                        // The gutter's one rule: a number the reader is counting to needs
                        // an edge to stop at.
                        (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                marginRight: tokens.spacing.md,
                                paddingRight: tokens.spacing.md,
                                borderRightWidth: 1,
                                borderColor: rule,
                                alignItems: 'flex-end',
                            }, children: lines.map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { ...codeText, color: colors.mutedText }, children: i + 1 }, i))) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { children: lines.map((line, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { ...codeText, color: colors.onSurface }, children: line.length > 0 ? line : ' ' }, i))) })] }) })] }));
}
//# sourceMappingURL=CodeBlockV4.js.map