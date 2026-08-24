import * as React from 'react';
export type BannerTone = 'info' | 'success' | 'warn' | 'danger';
export interface BannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    tone?: BannerTone;
    /** Leading icon node. */
    icon?: React.ReactNode;
    /** Optional trailing action button label. */
    actionLabel?: string;
    onAction?: () => void;
    /** Renders a dismiss (×) control that calls this. */
    onClose?: () => void;
}
/**
 * Full-width banner — a solid, edge-to-edge notice keyed to a semantic tone:
 * the background is the tone token and all content uses the paired `on-*`
 * token. Distinct from `Alert` (surface card + left rule) by its solid,
 * full-bleed fill. Optional trailing action + dismiss. `danger` announces via
 * the `alert` role; other tones via `status`. No literal colors.
 */
export declare const Banner: React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Banner.d.ts.map