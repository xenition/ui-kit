import * as React from 'react';
export type GlassIntensity = 'soft' | 'regular' | 'strong';
export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * How opaque the panel reads: `soft` (45% surface) melts into backgrounds,
     * `regular` (65%, default) is the workhorse card, `strong` (82%) sits over
     * busy art like particle fields or auroras.
     */
    intensity?: GlassIntensity;
    /** Draw the translucent token border (default true). */
    bordered?: boolean;
}
/**
 * Translucent blurred surface — the "glass card/panel" treatment the SaaS
 * template hand-rolled. Token-pure (`color-mix` over `surface` + `border`),
 * theme-agnostic, and static (no motion to reduce). Compose it under
 * `ProductMock`, over `AuroraBackground`, or as a floating chrome bar.
 */
export declare const GlassPanel: React.ForwardRefExoticComponent<GlassPanelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GlassPanel.d.ts.map