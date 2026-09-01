import * as React from 'react';
import type { EscalationBannerProps } from './EscalationBanner';
/** Drop-in for {@link EscalationBannerProps} — same props, the V4 "calm console" design. */
export type EscalationBannerV4Props = EscalationBannerProps;
/**
 * EscalationBanner — **V4** "calm console" design (web parity of the native V4).
 * A prominent-but-calm banner: an elevated rounded card with a left severity-
 * accent bar (the signature at-a-glance cue), a leading glyph in a soft-tint
 * chip, and a role word ("Warning"/"Critical") — severity is encoded by glyph
 * **and** color (never color alone), mapping `critical`→danger, `warning`→warn,
 * `info`→primary. Exposes an "Escalate" primary action (`onEscalate`; disabled
 * while `escalating`) and an "Acknowledge" dismiss (`onAcknowledge`); both
 * actions are ≥44px tall. Same props/behavior as {@link EscalationBannerProps};
 * all colors from `--xen-*` token classes (no literal hex).
 */
export declare const EscalationBannerV4: React.ForwardRefExoticComponent<EscalationBannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EscalationBannerV4.d.ts.map