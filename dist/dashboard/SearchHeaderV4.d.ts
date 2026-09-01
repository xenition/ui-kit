import * as React from 'react';
import type { SearchHeaderProps } from './SearchHeader';
export interface SearchHeaderV4Props extends SearchHeaderProps {
    /**
     * @deprecated Accepted for source compatibility with the base and **ignored**.
     *
     * `SearchInputV4` offers its clear control exactly when there is something to
     * clear, so there is nothing for a caller to switch off. Honouring `false`
     * would mean suppressing the primitive's own affordance, which is reachable
     * on web and not on native — a parity break this pass exists to close.
     *
     * Passing `false` has no effect. Remove it.
     */
    clearable?: boolean;
    /**
     * Leading slot, before the field — a back arrow, a cancel link, an avatar.
     * Absent by default, so the field still starts at the page gutter.
     */
    leading?: React.ReactNode;
    /** Fires when the field's clear affordance is used. */
    onClear?: () => void;
    /** Freezes the field. The `actions` slot's own disabled state is its own. */
    disabled?: boolean;
    /**
     * Draw a hairline under the bar. **Default `false`.** See the note on the
     * component.
     */
    divided?: boolean;
    /**
     * Accessible name for the field. Defaults to `placeholder`, which is what
     * the base used, so a bar labelled "Search recipes" is announced as such.
     */
    accessibilityLabel?: string;
}
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
export declare const SearchHeaderV4: React.ForwardRefExoticComponent<SearchHeaderV4Props & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=SearchHeaderV4.d.ts.map