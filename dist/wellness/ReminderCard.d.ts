import * as React from 'react';
export interface ReminderCardProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    time: string;
    enabled?: boolean;
    onToggle?: (enabled: boolean) => void;
    glyph?: string;
}
/**
 * ReminderCard — a single daily reminder on a clean card: a small gradient clock
 * badge (the one spot of color), the reminder label and its time, and a `Switch`
 * to arm or silence it. The card itself stays calm (surface + border); on/off is
 * carried by the switch's own state, not by color. Token-only colors.
 */
export declare const ReminderCard: React.ForwardRefExoticComponent<ReminderCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReminderCard.d.ts.map