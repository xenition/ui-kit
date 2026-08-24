import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SectionCardProps {
    /** Section heading. */
    title: string;
    /** Optional muted description under the title. */
    subtitle?: string;
    /** Trailing header slot, e.g. a "See all" link. */
    action?: React.ReactNode;
    /** Optional divider between the header and the body. */
    divided?: boolean;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * A titled card wrapper: a header row (title + optional subtitle + trailing
 * action) above a body slot, inside a bordered `surface` card. The standard
 * container for grouping dashboard content. Token-only.
 */
export declare function SectionCard({ title, subtitle, action, divided, children, style, }: SectionCardProps): React.ReactElement;
//# sourceMappingURL=SectionCard.d.ts.map