import * as React from 'react';
import type { CaseCardProps } from './CaseCard';
/** Same public contract as {@link CaseCard} — a drop-in alternate design. */
export type CaseCardV3Props = CaseCardProps;
/**
 * CaseCard, redesigned (v3): a **dense docket line**. The status pill leads, the
 * caption over a docket·client subtitle, and the priority pill trails — hairline-
 * bordered for a case list. The opposite of v2's card. Same props, token-only.
 */
export declare const CaseCardV3: React.ForwardRefExoticComponent<CaseCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CaseCardV3.d.ts.map