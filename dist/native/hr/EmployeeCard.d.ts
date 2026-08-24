import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type EmployeeStatus, type EmploymentType } from './internal';
export type EmployeeCardVariant = 'default' | 'compact' | 'detailed';
export interface EmployeeContactAction {
    key: string;
    glyph: string;
    label: string;
    onPress: () => void;
}
export interface EmployeeCardProps {
    /** Full name. */
    name: string;
    /** Job title / role. */
    title?: string;
    /** Department or team. */
    department?: string;
    /** Avatar image URL (initials fallback otherwise). */
    avatarUrl?: string;
    /** Employment arrangement — shown as a glyph + word chip. */
    employmentType?: EmploymentType;
    /** Lifecycle state — shown as a glyph + word chip, never color alone. */
    status?: EmployeeStatus;
    /** Location / office (detailed variant). */
    location?: string;
    /** Pre-formatted hire/start date (detailed variant). */
    startDate?: string;
    /** Quick contact affordances (call / email / message). */
    actions?: EmployeeContactAction[];
    /** Visual density / emphasis. */
    variant?: EmployeeCardVariant;
    /** Render a placeholder skeleton instead of content. */
    loading?: boolean;
    /** Tap handler for the whole card. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Profile card for a single employee: avatar, name, title, department, and
 * employment-type / status chips (each a glyph + word so state never rests on
 * color alone). `compact` trims to a single row for lists; `detailed` adds
 * location and start date. Quick contact `actions` render as token-tinted
 * buttons. Renders a `loading` skeleton on demand. All colors are theme tokens
 * — no literals.
 */
export declare function EmployeeCard({ name, title, department, avatarUrl, employmentType, status, location, startDate, actions, variant, loading, onPress, testID, style, }: EmployeeCardProps): React.ReactElement;
//# sourceMappingURL=EmployeeCard.d.ts.map