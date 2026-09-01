import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ReminderCardProps {
    label: string;
    time: string;
    enabled?: boolean;
    onToggle?: (enabled: boolean) => void;
    glyph?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * ReminderCard — a single daily reminder on a clean card: a small gradient clock
 * badge (the one spot of color), the reminder label and its time, and a `Switch`
 * to arm or silence it. The card itself stays calm (surface + border); the
 * badge's gradient and near-white ink both derive from the brand ramp. On/off
 * is carried by the switch's own state, not by color. Token-only colors.
 */
export declare function ReminderCard({ label, time, enabled, onToggle, glyph, style, }: ReminderCardProps): React.ReactElement;
//# sourceMappingURL=ReminderCard.d.ts.map