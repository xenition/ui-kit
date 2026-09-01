import * as React from 'react';
import type { SpaceKey } from './_tokens';
/**
 * Where a V4 list separator starts.
 *
 * The `SpaceKey` values match the native base's leading inset, unchanged.
 * `'leading'` is the addition (BRIEF §4.4): the rule starts where the row's
 * *text* starts, clearing the row's 44 leading slot.
 */
export type ListSeparatorV4Inset = SpaceKey | 'leading';
export interface ListSeparatorV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Leading inset — a spacing token, or `'leading'` to clear a row's 44
     * leading slot (BRIEF §4.3/§4.4).
     *
     * Use `'leading'` when the rows either side carry an avatar or a tinted
     * badge; leave it unset for a flush rule when they do not. Unset is the
     * default, so a caller that ports straight over from the native base gets
     * the same rule it has today.
     */
    inset?: ListSeparatorV4Inset;
}
/**
 * **V4 list separator** — the web twin the row family needed. `ListSeparator`
 * was native-only; BRIEF §4.4 and §5 add this one so a settings list and a
 * people list can be built the same way on both platforms.
 *
 * It is a hairline: `1px` of `colors.border` and nothing else (§4.4). It is
 * **not** a second `Divider` — it exists so `SettingsSection`, `SectionCard
 * divided` and any list of `ListRow`s stop hand-rolling
 * `<div className="h-px bg-border" />`, which both twins do today and which is
 * how the leading inset went missing in the first place.
 *
 * `inset="leading"` starts the rule at `44 + spacing.md`, clearing the row's
 * leading slot so the line aligns with the titles above and below it. Rows
 * with no leading slot take the flush rule (no `inset`).
 *
 * Decorative by construction: the rows either side already carry the list's
 * structure, so the rule is `aria-hidden` rather than a second `separator`
 * announced between every pair of items. That matches the native base, which
 * renders `accessible={false}`. When a rule genuinely *is* the boundary
 * between two regions, that is `DividerV4` and its `<hr>`.
 */
export declare const ListSeparatorV4: React.ForwardRefExoticComponent<ListSeparatorV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ListSeparatorV4.d.ts.map