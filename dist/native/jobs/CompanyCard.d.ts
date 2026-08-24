import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { Company } from './types';
export interface CompanyCardProps {
    /** The company to render. */
    company: Company;
    /** Follow state; when set (or `onToggleFollow` given) a follow button shows. */
    following?: boolean;
    /** Fired when the follow toggle is pressed. */
    onToggleFollow?: (company: Company) => void;
    /** Fired when the card body is pressed (open company page). */
    onPress?: (company: Company) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * An employer summary card — logo (`Avatar`), name, industry / location, a
 * headcount `Badge`, an open-roles count, and an optional follow `Button`.
 * Data + callbacks only; the follow button flips between primary "Follow" and
 * secondary "Following" while keeping an explicit accessible label. Tokens only.
 */
export declare function CompanyCard({ company, following, onToggleFollow, onPress, style, }: CompanyCardProps): React.ReactElement;
//# sourceMappingURL=CompanyCard.d.ts.map