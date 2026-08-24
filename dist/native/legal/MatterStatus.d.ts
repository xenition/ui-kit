import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MatterStage } from './internal';
export type MatterStatusVariant = 'default' | 'compact';
export interface MatterStatusProps {
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
    /** Tap handler. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Stage tracker for a legal matter: a segmented progress meter across the
 * intake → active → discovery → trial → settlement → closed workflow, with the
 * current stage as a glyph + word pill (never color alone). Segments up to and
 * including the current stage fill with the primary token; the rest use the
 * border token. All colors are theme tokens — no literals.
 */
export declare function MatterStatus({ title, stage, progressPct, opened, attorney, variant, onPress, testID, style, }: MatterStatusProps): React.ReactElement;
//# sourceMappingURL=MatterStatus.d.ts.map