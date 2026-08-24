import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type BannerTone = 'info' | 'success' | 'warn' | 'danger';
export interface BannerProps {
    tone?: BannerTone;
    /** Leading icon node. */
    icon?: React.ReactNode;
    children?: React.ReactNode;
    /** Optional trailing action button label. */
    actionLabel?: string;
    onAction?: () => void;
    /** Renders a dismiss (✕) control that calls this. */
    onClose?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Full-width inline banner — a solid, edge-to-edge notice keyed to a semantic
 * tone: the background is the tone token (`info`→primary, `success`→success,
 * `warn`→warn, `danger`→danger) and all content uses the paired `onX` token, so
 * contrast is compiler-guaranteed and every color traces to a token. Distinct
 * from `Alert` (surface card + left rule) by its solid, full-bleed fill.
 * Optional trailing action + dismiss. `danger` announces via the `alert` role.
 */
export declare function Banner({ tone, icon, children, actionLabel, onAction, onClose, style, }: BannerProps): React.ReactElement;
//# sourceMappingURL=Banner.d.ts.map