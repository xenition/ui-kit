import * as React from 'react';
import { type MatterStage } from './internal';
export type MatterStatusVariant = 'default' | 'compact';
export interface MatterStatusProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Matter title / caption. */
    title?: string;
    /** Current workflow stage — drives the meter fill + pill. */
    stage: MatterStage;
    /** Optional 0–100 progress within the current stage (default derived from stage). */
    progressPct?: number;
    /** Pre-formatted opened / age label. */
    opened?: string;
    /** Responsible attorney. */
    attorney?: string;
    /** Density. */
    variant?: MatterStatusVariant;
    /** Click handler. */
    onClick?: () => void;
    testID?: string;
}
/**
 * Stage tracker for a legal matter: a segmented progress meter across the
 * intake → active → discovery → trial → settlement → closed workflow, with the
 * current stage as a glyph + word pill (never color alone). Segments up to and
 * including the current stage fill with the stage tone token; the rest use the
 * border token. Exposes an ARIA `progressbar`. All colors are `--xen-*` token
 * classes — no literals.
 */
export declare const MatterStatus: React.ForwardRefExoticComponent<MatterStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatterStatus.d.ts.map