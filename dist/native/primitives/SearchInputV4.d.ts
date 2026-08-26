import * as React from 'react';
import type { SearchInputProps } from './SearchInput';
export type { SearchInputProps as SearchInputV4Props };
/**
 * **V4 search field** — the same props as {@link SearchInput}, a different
 * design line.
 *
 * ## It looks like the other fields, and that is the point
 *
 * The base is a pill: `radius.full`, `sm` padding. A pill is a perfectly good
 * search affordance on a toolbar — but a search field is most often a field in
 * a form, sitting under a label and above two `InputV4`s, and there it reads as
 * a foreign object. §16 asks for forms that are minimal, and a form built from
 * three different field shapes is not minimal however few questions it asks.
 *
 * So V4 takes `InputV4`'s treatment exactly: the same `2xl` minimum height, the
 * same `md` radius, and the same brand halo whose space is reserved whether or
 * not it is showing, so focusing never nudges the layout (§36.11). The leading
 * ⌕ is what says "search" — the shape does not have to.
 *
 * ## The clear button is the fix nobody sees
 *
 * The base's ✕ is a bare glyph with 8px of slop: about 24px of target, sitting
 * inside a field, next to the text you are trying to select. Miss it and you
 * put the caret somewhere instead. Here it keeps the same drawn size — a 48px
 * ✕ inside a 48px field would be absurd — but `hitSlopTo` opens its touch area
 * out to the same `tapTarget()` every other V4 control is built on. Small mark,
 * large target, and the layout never notices.
 *
 * It is also announced as "Clear search" and only exists when there is
 * something to clear, so the row does not carry a dead affordance.
 */
export declare function SearchInputV4({ value, onChangeText, onClear, placeholder, invalid, disabled, accessibilityLabel, containerStyle, onFocus, onBlur, ...rest }: SearchInputProps): React.ReactElement;
//# sourceMappingURL=SearchInputV4.d.ts.map