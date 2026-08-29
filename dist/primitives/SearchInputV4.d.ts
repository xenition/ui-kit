import * as React from 'react';
import type { SearchInputProps } from './SearchInput';
export type { SearchInputProps as SearchInputV4Props };
/**
 * **V4 search field** — the web twin of `SearchInputV4`, the same props as
 * {@link SearchInput}, a different design line.
 *
 * ## It looks like the other fields, and that is the point
 *
 * The base is a pill: `rounded-[var(--xen-radius-full)]`, `py-sm`. A pill is a
 * perfectly good search affordance on a toolbar — but a search field is most
 * often a field in a form, sitting under a label and above two `InputV4`s, and
 * there it reads as a foreign object. §16 asks for forms that are minimal, and
 * a form built from three different field shapes is not minimal however few
 * questions it asks.
 *
 * So V4 takes `InputV4`'s treatment exactly: the same `--xen-space-2xl` minimum
 * height, the same `md` radius, and the same `box-shadow` halo — armed here on
 * `:focus-within`, since the ring belongs to the row and the caret is in the
 * `<input>` inside it. The leading ⌕ is what says "search"; the shape does not
 * have to.
 *
 * ## The clear button is the fix nobody sees
 *
 * The base's ✕ is a bare glyph with no padding at all — a ~16px target inside a
 * field, next to the text you are trying to select. Miss it and you put the
 * caret somewhere instead. Here it keeps its drawn size (a 48px ✕ inside a 48px
 * field would be absurd) and gains an invisible `--xen-space-2xl` target
 * through `data-xen-v4-hit`, a centred pseudo-element that is out of flow and
 * costs no layout. It is the web's `hitSlop`.
 *
 * It is announced as "Clear search" and only exists when there is something to
 * clear, so the row never carries a dead affordance.
 */
export declare const SearchInputV4: React.ForwardRefExoticComponent<SearchInputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=SearchInputV4.d.ts.map