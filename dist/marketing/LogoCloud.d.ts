import * as React from 'react';
export interface LogoCloudProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Small line above the logos ("Trusted by…"). */
    label?: React.ReactNode;
}
/**
 * Row of partner/customer logos, dimmed and desaturated until hovered.
 * Children are arbitrary logo slots (img/svg/text); each is wrapped so the
 * dim/restore treatment is uniform.
 */
export declare const LogoCloud: React.ForwardRefExoticComponent<LogoCloudProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LogoCloud.d.ts.map