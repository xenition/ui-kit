import * as React from 'react';
import type { ClientIntakeRowProps } from './ClientIntakeRow';
/** Drop-in for {@link ClientIntakeRowProps} — same props, the V4 "chambers" design. */
export type ClientIntakeRowV4Props = ClientIntakeRowProps;
/**
 * ClientIntakeRow — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a prospective-client intake: an elevated
 * rounded card with a soft shadow, an avatar + name + source line, a labelled
 * glyph + word intake-stage pill (never color alone), a soft-primary chip strip
 * carrying practice area + conflict-check, and an optional summary. When
 * `actionable` and still open, an accept/decline row of real `<button>`s is shown
 * (Accept disabled on a hard conflict). When `onClick` is set the row is a
 * keyboard-activable `role="button"`. Reuses the base `variant`
 * (`default` / `compact`). All colors from `--xen-*` token classes (no literals).
 */
export declare const ClientIntakeRowV4: React.ForwardRefExoticComponent<ClientIntakeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ClientIntakeRowV4.d.ts.map