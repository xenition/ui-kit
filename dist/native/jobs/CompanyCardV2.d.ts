import * as React from 'react';
import type { CompanyCardProps } from './CompanyCard';
/** Drop-in alternate: identical props to {@link CompanyCardProps}. */
export type CompanyCardV2Props = CompanyCardProps;
/**
 * CompanyCard — design V2. A profile-style card: a tinted banner strip, a large
 * rounded logo straddling it inside a surface ring, then the name, meta, a
 * headcount/open-roles badge row, and a full-width follow `Button`. Same props
 * as {@link CompanyCardProps} (drop-in). Token-pure — the banner and ring are
 * `withAlpha`/token fills, depth is the shared elevation scale.
 */
export declare function CompanyCardV2({ company, following, onToggleFollow, onPress, style, }: CompanyCardV2Props): React.ReactElement;
//# sourceMappingURL=CompanyCardV2.d.ts.map