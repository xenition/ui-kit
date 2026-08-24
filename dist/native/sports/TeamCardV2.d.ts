import * as React from 'react';
import type { TeamCardProps } from './TeamCard';
/** Drop-in replacement for {@link TeamCardProps} — identical shape. */
export type TeamCardV2Props = TeamCardProps;
/**
 * TeamCard, design variant 2 — a **crest hero card**. A large crest sits in a
 * tinted disc above the centered team name and league, an optional rank badge,
 * a three-up W / D / L record (built from the `Statistic` primitive), and a
 * centered recent-form strip whose results read by letter + a11y label, never
 * color alone. Same props as `TeamCard`; token-pure (elevation via `shadow`,
 * tint via `withAlpha`), reduced-motion aware.
 */
export declare function TeamCardV2({ name, crest, league, won, drawn, lost, rank, form, selected, loading, onPress, style, }: TeamCardV2Props): React.ReactElement;
//# sourceMappingURL=TeamCardV2.d.ts.map