import * as React from 'react';
import type { TeamGridProps } from './TeamGrid';
/** Drop-in for {@link TeamGridProps} — same props, the V4 "showcase" design. */
export type TeamGridV4Props = TeamGridProps;
/**
 * TeamGrid — **V4** "showcase" design (web parity of the native V4). A
 * responsive grid of elevated member cards on the page ground (NOT a gradient
 * surface): each card an initials-fallback `avatar`, a bold `name`, a muted
 * `role`, optional `bio`, and a row of soft-primary social chips (each a
 * `≥44px` tap target that brightens on hover). Every `member` field (`name`,
 * `role`, `avatar`, `bio`, `socials`) honored. `columns` drives the breakpoint
 * grid. Same props/behavior as {@link TeamGridProps}; token-only colors, no
 * literals.
 */
export declare const TeamGridV4: React.ForwardRefExoticComponent<TeamGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TeamGridV4.d.ts.map