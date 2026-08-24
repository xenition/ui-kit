import * as React from 'react';
import type { CompanyCardProps } from './CompanyCard';
/** Drop-in alternate: identical props to {@link CompanyCardProps}. */
export type CompanyCardV2Props = CompanyCardProps;
/**
 * CompanyCard — design V2 (web). A profile-style card: a tinted banner strip, a
 * large rounded logo straddling it inside a surface ring, then the name, meta, a
 * headcount / open-roles badge row, and a full-width follow `Button`. Same props
 * as {@link CompanyCardProps} (drop-in). Token-pure — the banner and ring are
 * token tints, depth is the shared shadow scale, with a subtle hover lift.
 */
export declare const CompanyCardV2: React.ForwardRefExoticComponent<CompanyCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CompanyCardV2.d.ts.map