import * as React from 'react';
import type { ClientIntakeRowProps } from './ClientIntakeRow';
/** Drop-in for {@link ClientIntakeRowProps} — same props, the V4 "chambers" design. */
export type ClientIntakeRowV4Props = ClientIntakeRowProps;
/**
 * ClientIntakeRow — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, an avatar + name + source line, a
 * labelled glyph + word intake-stage pill (never color alone), a soft-primary
 * chip strip carrying practice area + conflict-check, and an optional summary.
 * When `actionable` and still open, an accept/decline row of buttons is shown
 * (Accept disabled on a hard conflict). Tappable when `onPress` is set. Reuses
 * the base `variant` (`default` / `compact`). Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function ClientIntakeRowV4({ name, practiceArea, status, conflict, source, summary, avatarUrl, variant, actionable, onAccept, onDecline, onPress, testID, style, }: ClientIntakeRowV4Props): React.ReactElement;
//# sourceMappingURL=ClientIntakeRowV4.d.ts.map