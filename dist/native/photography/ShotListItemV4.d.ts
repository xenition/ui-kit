import * as React from 'react';
import type { ShotListItemProps } from './ShotListItem';
/** Drop-in for {@link ShotListItemProps} — same props, the V4 "studio" design. */
export type ShotListItemV4Props = ShotListItemProps;
/**
 * ShotListItem — **V4** "studio" design. A checklist row on a clean, elevated
 * studio surface: an elevated card row (soft shadow, hairline border), a check
 * affordance, the shot title (struck when `done`), a muted notes line, and the
 * `priority` shown three ways — a leading glyph, a token color, and a labelled
 * `Badge` — so it never rides on color alone: `must` (★, danger), `nice`
 * (☆, primary), `optional` (○, muted). The whole row is a `checkbox` when
 * `onToggle` is provided; its captured state is announced via the accessibility
 * `checked` state and a ✓ glyph. Identical props/behavior to
 * {@link ShotListItemProps}. Token-only colors via `useXenitionTheme()`.
 */
export declare function ShotListItemV4({ title, notes, done, priority, onToggle, style, }: ShotListItemV4Props): React.ReactElement;
//# sourceMappingURL=ShotListItemV4.d.ts.map