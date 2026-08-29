"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionV4 = SectionV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const TextV4_1 = require("../primitives/TextV4");
const theme_1 = require("../theme");
/**
 * **V4 section** — the native twin of the web `SectionV4`, the base `Section`'s
 * props plus one, a different design line.
 *
 * ## What V4 changes
 *
 * 1. **The header is on the type ramp, and it is the same ramp on both twins.**
 *    The base hand-rolls a `<Text style={{ fontSize, fontWeight }}>` here and
 *    sets `text-lg font-semibold` on web — the same intent, expressed twice,
 *    free to drift. V4 sets both through `TextV4`: title `size="xl"
 *    weight="bold"`, subtitle `size="base" tone="mutedText"`. Louder and with
 *    more air than the base, because §3 asks for one loud thing per block and a
 *    section heading is it.
 * 2. **`mutedText`, not `muted`.** The base subtitle paints `colors.muted`,
 *    which is a *fill* and carries no contrast promise against the page.
 *    `mutedText` is the same quietness walked until it clears AA. This is the
 *    exact bug the shadcn pass closed elsewhere in the kit and the one the
 *    native rows still carry.
 * 3. **`action` exists.** See the prop.
 *
 * What V4 does **not** do is own the space *between* sections. §4.1 puts that at
 * `spacing.xl` (32) and it stays the caller's decision — a `Column gap="xl"`
 * around the sections — because a component that pushed its own siblings apart
 * would double up wherever a caller already had a rhythm.
 *
 * The header collapses entirely when there is no `title`, no `subtitle` and no
 * `action`: §4.5 asks that every component survive its empty case, and an empty
 * header row would leave a `gap` where two lines would be. With no children
 * either, this renders an empty `View` and paints nothing.
 *
 * ### Platform divergence
 *
 * None. The web twin's `<h2>`/`<p>` are that platform's semantics for a heading
 * and its supporting line; here the same thing is said with
 * `accessibilityRole="header"`. Same props, same defaults, same type ramp.
 */
function SectionV4({ title, subtitle, spacing = 'md', action, style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const hasText = Boolean(title || subtitle);
    const hasHeader = hasText || Boolean(action);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing[spacing] }, style], ...rest, children: [hasHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.md,
                }, children: [hasText ? (
                    // `flex: 1` is geometric: the text column takes the free space so a
                    // long title wraps instead of shoving the action off the end.
                    (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "xl", weight: "bold", tone: "onSurface", children: title })) : null, subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", children: subtitle })) : null] })) : null, action ? (
                    // `flexShrink: 0` so a "See all" never compresses to fit a long
                    // title.
                    (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexShrink: 0 }, children: action })) : null] })) : null, children] }));
}
//# sourceMappingURL=SectionV4.js.map