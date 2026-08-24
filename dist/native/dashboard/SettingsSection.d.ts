import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SettingsSectionProps {
    /** Optional group heading rendered above the grouped rows. */
    title?: string;
    /** Optional footnote rendered under the group. */
    footnote?: string;
    /** {@link SettingsRow}s (or any rows) — hairline dividers are drawn between. */
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Groups {@link SettingsRow}s into a titled, bordered card with hairline
 * dividers between rows — the iOS-style grouped-list section. Token-only.
 */
export declare function SettingsSection({ title, footnote, children, style, }: SettingsSectionProps): React.ReactElement;
//# sourceMappingURL=SettingsSection.d.ts.map