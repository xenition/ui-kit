import * as React from 'react';
import type { TeamGridProps } from './TeamGrid';
/** Drop-in for {@link TeamGridProps} — same props, the V4 "showcase" design. */
export type TeamGridV4Props = TeamGridProps;
/**
 * TeamGrid — **V4** "showcase" design (native mirror of the web V4). A wrapping
 * grid of elevated member cards on the page ground (NOT a gradient surface):
 * each card an initials-fallback `avatar`, a bold `name`, a muted `role`, and
 * an optional `bio`. Cards wrap via flex `basis` rather than CSS grid
 * breakpoints (`columns` sets the row width, default 2 for phones). As on the
 * native base `TeamGrid`, the web `socials` link row is dropped — the native
 * base `TeamMember` type exposes no `socials` (no `href` navigation surface on
 * these cards) — so every field the native base carries (`name`, `role`,
 * `avatar`, `bio`) is honored. Same props/behavior as {@link TeamGridProps};
 * token-only colors, no literals.
 */
export declare function TeamGridV4({ members, columns, style, }: TeamGridV4Props): React.ReactElement;
//# sourceMappingURL=TeamGridV4.d.ts.map