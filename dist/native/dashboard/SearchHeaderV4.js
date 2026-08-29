"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHeaderV4 = SearchHeaderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SearchInputV4_1 = require("../primitives/SearchInputV4");
/**
 * `SearchHeader`, V4 — the search bar that tops a browse or list screen. Native
 * twin of the web `SearchHeaderV4`, at prop parity.
 *
 * ## The field is `SearchInputV4`, not a second search field
 *
 * The base re-rolls a whole field inline: its own pill, its own border, its own
 * `⌕`, its own `✕`, its own paddings. The kit already has a V4 search field,
 * and a product with two of them will drift into two of them looking different.
 * So this component composes {@link SearchInputV4} (§10.5) and owns only what a
 * *header* owns: the row, the leading slot, the trailing actions, submission,
 * and the rule about the hairline.
 *
 * Everything about the field's shape therefore has exactly one home, in
 * `SearchInputV4` and `internal/picker-v4.ts`, and this file deliberately does
 * not restate it:
 *
 * - the **`spacing['2xl']` (48) control metric** and the shared focus halo that
 *   §5 asks this component for, straight off the field line, so a search bar
 *   and an `InputV4` in a form ring identically — and the halo's space is
 *   reserved whether or not it is showing, so focusing never nudges the row;
 * - the leading and clear marks, and the `hitSlop` that opens the clear
 *   control out to the full tap target — the base gave its `✕` 8px of slop,
 *   about 24px of target, inside a field, next to the text you are trying to
 *   select;
 * - the ground and the border colour.
 *
 * Three things V4 fixes in the header itself:
 *
 * 1. **The glyphs are gone from here.** The base painted `⌕` and `✕` as literal
 *    text characters. Both belong to the field, and the field draws them.
 * 2. **`muted` is not a text colour.** The base set the placeholder, the `⌕`
 *    and the `✕` in `colors.muted`, a decorative fill with no contrast promise.
 *    `SearchInputV4` uses `mutedText` throughout.
 * 3. **There is a leading slot.** A search screen almost always needs a way
 *    back, and without a slot for it callers hang it outside the component and
 *    the two stop lining up.
 *
 * ## ⚠️ No hairline, by default
 *
 * §4.4: **between free-standing blocks the structuring device is space, not a
 * rule** — "a hairline under every screen title is admin styling", and a search
 * bar sitting under one is the same block. {@link SearchHeaderV4Props.divided}
 * defaults to **`false`**, exactly as `PageHeaderV4`'s does, and puts a 1px
 * `colors.border` back for a bar that is genuinely pinned above a scrolling
 * list and needs the edge. The base drew no border either, so nothing moves for
 * an existing caller — this is the rule being stated, not a default changed.
 *
 * ## ⚠️ `clearable` is accepted and ignored
 *
 * The V4 search field **always** offers its clear control once there is
 * something to clear, and never when there is not — an affordance that only
 * exists while it can do something is not one the caller has to switch off, and
 * a search field you cannot empty in one tap is a search field you have to
 * backspace your way out of.
 *
 * That decision belongs to `SearchInputV4`, which this component composes
 * rather than re-rolls, so the prop is kept for source compatibility with the
 * base, typed as it was, and has no effect **on either twin**. Suppressing it
 * on one platform and not the other is the parity break (§1.3) this pass exists
 * to close, so it is not suppressed on either.
 *
 * **It renders no empty slots** (§4.5): with no `leading` and no `actions` the
 * bar is exactly the field. It never renders *nothing* — a search bar with an
 * empty query is a search bar waiting for one, which is its normal resting
 * state, not an empty state.
 */
function SearchHeaderV4({ value, onChangeText, placeholder = 'Search', onSubmit, actions, leading, onClear, disabled = false, divided = false, accessibilityLabel, 
// Kept for source compatibility with the base; see the note above.
clearable: _clearable = true, style, testID, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
            },
            // §4.4 — off by default. The hairline is opt-in, not the house style.
            divided
                ? {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    paddingBottom: tokens.spacing.md,
                }
                : null,
            style,
        ], children: [leading != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexShrink: 0 }, children: leading }) : null, (0, jsx_runtime_1.jsx)(SearchInputV4_1.SearchInputV4, { containerStyle: { flexGrow: 1, flexShrink: 1 }, value: value, onChangeText: onChangeText, onClear: onClear, disabled: disabled, placeholder: placeholder, accessibilityLabel: accessibilityLabel ?? placeholder, onSubmitEditing: onSubmit }), actions != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexShrink: 0 }, children: actions }) : null] }));
}
//# sourceMappingURL=SearchHeaderV4.js.map