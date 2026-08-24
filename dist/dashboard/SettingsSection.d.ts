import * as React from 'react';
export interface SettingsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Optional group heading rendered above the grouped rows. */
    title?: string;
    /** Optional footnote rendered under the group. */
    footnote?: string;
    /** {@link SettingsRow}s (or any rows) — hairline dividers are drawn between. */
    children: React.ReactNode;
}
/**
 * Groups {@link SettingsRow}s into a titled, bordered card with hairline
 * dividers between rows — the grouped-list section. Token-only.
 */
export declare const SettingsSection: React.ForwardRefExoticComponent<SettingsSectionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SettingsSection.d.ts.map