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
exports.SearchHeaderV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const SearchInputV4_1 = require("../primitives/SearchInputV4");
/**
 * `SearchHeader`, V4 — the search bar that tops a browse or list screen.
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
 *   and an `InputV4` in a form ring identically;
 * - the leading and clear marks, and the invisible `spacing['2xl']` hit area
 *   the clear control carries — a bare `✕` inside a field is the classic
 *   too-small target, and the base shipped one;
 * - the ground and the border colour.
 *
 * Three things V4 fixes in the header itself:
 *
 * 1. **The glyphs are gone from here.** The base painted `⌕` and `✕` as literal
 *    text characters with a `hover:text-on-surface` on the second — a hover
 *    that changes the content's colour rather than laying a state layer over
 *    the container. Both belong to the field, and the field draws them.
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
 *
 * The ref lands on the `<input>`, as it did on the base, so a screen can focus
 * the query on mount.
 */
exports.SearchHeaderV4 = React.forwardRef(function SearchHeaderV4({ value, onChangeText, placeholder = 'Search', onSubmit, actions, leading, onClear, disabled = false, divided = false, accessibilityLabel, 
// Kept for source compatibility with the base; see the note above.
clearable: _clearable = true, className, }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-search-header": "", "data-divided": divided ? '' : undefined, className: (0, cn_1.cn)('flex flex-row items-center gap-[var(--xen-space-sm)]', 
        // §4.4 — off by default. The hairline is opt-in, not the house style.
        divided && 'border-b border-border pb-[var(--xen-space-md)]', className), children: [leading != null ? (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: leading }) : null, (0, jsx_runtime_1.jsx)("div", { className: "min-w-0 grow", children: (0, jsx_runtime_1.jsx)(SearchInputV4_1.SearchInputV4, { ref: ref, value: value, onChangeText: onChangeText, onClear: onClear, placeholder: placeholder, disabled: disabled, accessibilityLabel: accessibilityLabel ?? placeholder, onKeyDown: (e) => {
                        if (e.key === 'Enter')
                            onSubmit?.();
                    } }) }), actions != null ? (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: actions }) : null] }));
});
//# sourceMappingURL=SearchHeaderV4.js.map