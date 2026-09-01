import * as React from 'react';
import type { ShotListItemProps } from './ShotListItem';
/** Drop-in for {@link ShotListItemProps} — same props, the V4 "studio" design. */
export type ShotListItemV4Props = ShotListItemProps;
/**
 * ShotListItem — **V4** "studio" design (web parity of the native V4). A
 * checklist row on a clean, elevated studio surface: an elevated `shadow-md`
 * row, a check affordance, the shot title (struck when `done`), a muted notes
 * line, and the `priority` shown three ways — a leading glyph, a token color,
 * and a labelled `Badge` — so it never rides on color alone: `must` (★, danger),
 * `nice` (☆, primary), `optional` (○, muted). The whole row is a
 * keyboard-operable `checkbox` when `onToggle` is provided; its captured state
 * is announced via `aria-checked` and a ✓ glyph. Identical props/behavior to
 * {@link ShotListItemProps}. All colors from `--xen-*` token classes.
 */
export declare const ShotListItemV4: React.ForwardRefExoticComponent<ShotListItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShotListItemV4.d.ts.map